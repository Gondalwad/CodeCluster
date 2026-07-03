// Developed by Shripad Dhanshetti

/*
  UploadQuestions.jsx  —  Developed for CodeCluster
  ─────────────────────────────────────────────────────────────────────────────
  Standalone Excel -> JSON converter page.

  Features:
    • Drag-and-drop / click-to-upload .xlsx / .xls files
    • Multi-sheet support — tab switcher per sheet
    • Live searchable JSON table preview
    • Copy full JSON to clipboard
    • Download JSON file per sheet or all sheets
    • Raw JSON view toggle
    • Row count & column count stats
    • Matches CodeCluster design system exactly (same CSS vars, Tailwind classes)
*/

import { useState, useCallback } from "react";
import {
    FaFileExcel,
    FaDownload,
    FaCopy,
    FaCheck,
    FaSearch,
    FaCode,
    FaTable,
    FaSpinner,
    FaLayerGroup,
    FaDatabase,
    FaTrash,
    FaTimes,
} from "react-icons/fa";
import ExcelUploader from "./ExcelUploader.jsx";
import { ExcelToJson, downloadJson } from "./ExcelToJson.js";

// ─── Shared UI atoms (mirrors Admin/User dashboards) ──────────────────────────

function Card({ children, className = "" }) {
    return (
        <div className={`bg-(--bg) border border-(--border) rounded-2xl p-5 md:p-6 shadow-sm ${className}`}>
            {children}
        </div>
    );
}

function SectionHeading({ title, subtitle }) {
    return (
        <div className="mb-6">
            <h2 className="text-xl font-bold text-(--text-h)">{title}</h2>
            {subtitle && <p className="text-sm text-(--text) mt-0.5">{subtitle}</p>}
        </div>
    );
}

function EmptyState({ icon: Icon, message, sub }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-(--text) gap-3">
            <Icon className="text-5xl text-indigo-300 opacity-60" />
            <p className="text-sm font-medium text-(--text-h)">{message}</p>
            {sub && <p className="text-xs text-(--text)">{sub}</p>}
        </div>
    );
}

function StatPill({ label, value, color = "indigo" }) {
    const colors = {
        indigo: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300",
        green: "bg-green-50  dark:bg-green-950/30  text-green-700  dark:text-green-300",
        amber: "bg-amber-50  dark:bg-amber-950/30  text-amber-700  dark:text-amber-300",
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${colors[color]}`}>
            {label}: <strong>{value}</strong>
        </span>
    );
}

// ─── Copy-to-clipboard button with transient check icon ───────────────────────

function CopyButton({ text, label = "Copy JSON", className = "" }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 cursor-pointer
                ${copied
                    ? "bg-green-600/10 border-green-500/30 text-green-600 dark:text-green-400"
                    : "bg-(--code-bg) border-(--border) text-(--text-h) hover:border-indigo-400 hover:text-indigo-500"
                } ${className}`}
        >
            {copied ? <FaCheck className="text-[11px]" /> : <FaCopy className="text-[11px]" />}
            {copied ? "Copied!" : label}
        </button>
    );
}

// ─── JSON Table view ──────────────────────────────────────────────────────────

function JsonTable({ rows }) {
    if (!rows || rows.length === 0) return null;
    const headers = Object.keys(rows[0]);

    return (
        <div className="overflow-auto rounded-xl border border-(--border)">
            <table className="w-full text-xs min-w-max">
                <thead className="sticky top-0 z-10">
                    <tr className="bg-(--code-bg) border-b border-(--border)">
                        <th className="px-3 py-2.5 text-left text-(--text) font-semibold uppercase tracking-wider w-10">#</th>
                        {headers.map((h) => (
                            <th key={h} className="px-3 py-2.5 text-left text-(--text) font-semibold uppercase tracking-wider whitespace-nowrap">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-(--border)">
                    {rows.map((row, i) => (
                        <tr key={i} className="hover:bg-(--code-bg) transition-colors duration-75">
                            <td className="px-3 py-2.5 text-(--text) font-mono opacity-50">{i + 1}</td>
                            {headers.map((h) => (
                                <td key={h} className="px-3 py-2.5 text-(--text-h) max-w-[240px] truncate" title={String(row[h])}>
                                    {row[h] === "" || row[h] === undefined
                                        ? <span className="text-(--text) opacity-30 italic">—</span>
                                        : String(row[h])
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ─── Raw JSON view ────────────────────────────────────────────────────────────

function JsonRaw({ data }) {
    const text = JSON.stringify(data, null, 2);
    return (
        <div className="relative">
            <pre className="overflow-auto max-h-[480px] bg-(--code-bg) border border-(--border) rounded-xl p-4 text-xs font-mono text-(--text-h) leading-relaxed">
                {text}
            </pre>
            <div className="absolute top-3 right-3">
                <CopyButton text={text} />
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UploadQuestions() {
    const [file, setFile] = useState(null);
    const [parsed, setParsed] = useState(null);   // { sheetNames, sheets }
    const [activeSheet, setActiveSheet] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState("table"); // "table" | "raw"
    const [search, setSearch] = useState("");

    // ── Parse on file pick ─────────────────────────────────────────────────────
    const handleFilePicked = useCallback(async (f) => {
        setFile(f);
        setParsed(null);
        setActiveSheet(null);
        setError(null);
        setSearch("");
        setLoading(true);

        try {
            const result = await ExcelToJson(f);
            setParsed(result);
            setActiveSheet(result.sheetNames[0]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // ── Clear everything ───────────────────────────────────────────────────────
    const handleClear = () => {
        setFile(null);
        setParsed(null);
        setActiveSheet(null);
        setError(null);
        setSearch("");
    };

    // ── Derive current sheet rows (with optional search) ──────────────────────
    const rawRows = parsed?.sheets?.[activeSheet] ?? [];
    const headers = rawRows.length > 0 ? Object.keys(rawRows[0]) : [];

    const filteredRows = search.trim()
        ? rawRows.filter((row) =>
            Object.values(row).some((v) =>
                String(v).toLowerCase().includes(search.trim().toLowerCase())
            )
        )
        : rawRows;

    // ── Download helpers ───────────────────────────────────────────────────────
    const downloadCurrentSheet = () => {
        const baseName = file?.name.replace(/\.(xlsx|xls)$/i, "") ?? "sheet";
        downloadJson(rawRows, `${baseName}_${activeSheet}`);
    };

    const downloadAllSheets = () => {
        const baseName = file?.name.replace(/\.(xlsx|xls)$/i, "") ?? "workbook";
        downloadJson(parsed.sheets, baseName);
    };

    return (
        <div className="min-h-screen bg-(--bg) p-4 md:p-8 lg:p-10">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* ── Page header ─────────────────────────────────────────── */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="flex items-center justify-center w-10 h-10 rounded-2xl bg-indigo-600/10 text-indigo-500 text-xl">
                                <FaFileExcel />
                            </span>
                            <h1 className="text-2xl md:text-3xl font-bold text-(--text-h)">Upload your questions</h1>
                        </div>
                        <p className="text-sm text-(--text) max-w-lg">
                            Upload an <code className="bg-(--code-bg) border border-(--border) px-1.5 py-0.5 rounded text-xs font-mono">.xlsx</code> or{" "}
                            <code className="bg-(--code-bg) border border-(--border) px-1.5 py-0.5 rounded text-xs font-mono">.xls</code> file to instantly
                            preview and download its contents as JSON. All sheets are parsed automatically.
                        </p>
                    </div>
                </div>

                {/* ── Upload card ──────────────────────────────────────────── */}
                <Card>
                    <SectionHeading
                        title="Upload File"
                        subtitle="Drag & drop or click to browse. Only .xlsx and .xls files are accepted."
                    />
                    <ExcelUploader
                        onFilePicked={handleFilePicked}
                        currentFile={file}
                        onClear={handleClear}
                    />

                    {/* Loading */}
                    {loading && (
                        <div className="flex items-center gap-3 mt-5 text-(--text)">
                            <FaSpinner className="animate-spin text-indigo-500 text-lg" />
                            <span className="text-sm">Parsing file…</span>
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="flex items-start gap-3 mt-5 p-4 bg-red-500/8 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400">
                            <FaTimes className="mt-0.5 shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}
                </Card>

                {/* ── Results area ─────────────────────────────────────────── */}
                {parsed && (
                    <div className="space-y-5">

                        {/* ── Sheet tabs + stats ───────────────────────────── */}
                        <div className="flex flex-wrap items-center justify-between gap-4">

                            {/* Sheet tabs */}
                            <div className="flex items-center gap-1 bg-(--code-bg) border border-(--border) rounded-xl p-1 flex-wrap">
                                <span className="px-2 text-xs text-(--text) flex items-center gap-1.5">
                                    <FaLayerGroup className="opacity-60" /> Sheets:
                                </span>
                                {parsed.sheetNames.map((name) => (
                                    <button
                                        key={name}
                                        onClick={() => { setActiveSheet(name); setSearch(""); }}
                                        className={`
                                            px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer
                                            ${activeSheet === name
                                                ? "bg-indigo-600 text-white shadow-sm"
                                                : "text-(--text) hover:text-(--text-h) hover:bg-(--border)"
                                            }
                                        `}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <CopyButton
                                    text={JSON.stringify(rawRows, null, 2)}
                                    label={`Copy "${activeSheet}"`}
                                />
                                <button
                                    onClick={downloadCurrentSheet}
                                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20 transition-all duration-150 cursor-pointer"
                                >
                                    <FaDownload className="text-[11px]" /> Download sheet
                                </button>
                                {parsed.sheetNames.length > 1 && (
                                    <button
                                        onClick={downloadAllSheets}
                                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-(--code-bg) border border-(--border) text-(--text-h) hover:border-indigo-400 transition-all duration-150 cursor-pointer"
                                    >
                                        <FaDownload className="text-[11px]" /> All sheets
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* ── Stats row ────────────────────────────────────── */}
                        <div className="flex flex-wrap gap-2">
                            <StatPill label="Rows" value={rawRows.length} color="indigo" />
                            <StatPill label="Columns" value={headers.length} color="green" />
                            {search && (
                                <StatPill label="Filtered" value={filteredRows.length} color="amber" />
                            )}
                        </div>

                        {/* ── Preview card ─────────────────────────────────── */}
                        <Card className="overflow-hidden !p-0">

                            {/* Card toolbar */}
                            <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-(--border) flex-wrap">
                                <p className="text-sm font-semibold text-(--text-h)">
                                    Preview — <span className="text-indigo-500">{activeSheet}</span>
                                </p>

                                <div className="flex items-center gap-2 flex-wrap">
                                    {/* Search */}
                                    <div className="relative">
                                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text) text-[10px] pointer-events-none" />
                                        <input
                                            type="text"
                                            placeholder="Search rows…"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="pl-8 pr-3 py-1.5 bg-(--bg) border border-(--border) rounded-lg text-xs text-(--text-h) placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all w-44"
                                        />
                                    </div>

                                    {/* View toggle */}
                                    <div className="flex items-center bg-(--code-bg) border border-(--border) rounded-lg p-0.5">
                                        <button
                                            onClick={() => setViewMode("table")}
                                            title="Table view"
                                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer
                                                ${viewMode === "table"
                                                    ? "bg-indigo-600 text-white shadow-sm"
                                                    : "text-(--text) hover:text-(--text-h)"
                                                }`}
                                        >
                                            <FaTable /> Table
                                        </button>
                                        <button
                                            onClick={() => setViewMode("raw")}
                                            title="Raw JSON view"
                                            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer
                                                ${viewMode === "raw"
                                                    ? "bg-indigo-600 text-white shadow-sm"
                                                    : "text-(--text) hover:text-(--text-h)"
                                                }`}
                                        >
                                            <FaCode /> Raw
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Card body */}
                            <div className="p-5">
                                {rawRows.length === 0 ? (
                                    <EmptyState
                                        icon={FaDatabase}
                                        message="This sheet is empty."
                                        sub="No rows were found in the selected sheet."
                                    />
                                ) : viewMode === "table" ? (
                                    filteredRows.length === 0 ? (
                                        <EmptyState
                                            icon={FaSearch}
                                            message="No rows match your search."
                                            sub={`Try a different keyword.`}
                                        />
                                    ) : (
                                        <JsonTable rows={filteredRows} />
                                    )
                                ) : (
                                    <JsonRaw data={rawRows} />
                                )}
                            </div>
                        </Card>

                        {/* ── Reset button ─────────────────────────────────── */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleClear}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-(--code-bg) border border-(--border) text-(--text) hover:border-red-400 hover:text-red-500 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
                            >
                                <FaTrash className="text-xs" /> Clear & upload another
                            </button>
                        </div>
                    </div>
                )}

                {/* ── Empty idle state ─────────────────────────────────────── */}
                {!parsed && !loading && !error && (
                    <Card>
                        <EmptyState
                            icon={FaFileExcel}
                            message="No file uploaded yet."
                            sub="Upload an Excel file above to get started."
                        />
                    </Card>
                )}

            </div>
        </div>
    );
}
