// Developed by Shripad Dhanshetti

/*
  ExcelUploader.jsx  —  Developed for CodeCluster
  ─────────────────────────────────────────────────
  Drag-and-drop / click-to-upload zone for .xlsx / .xls files.
  Calls onFilePicked(file) when a valid file is chosen.
  Styling follows the project design system exactly.
*/

import { useState, useRef } from "react";
import { FaFileExcel, FaUpload, FaTimes, FaCheckCircle } from "react-icons/fa";

export default function ExcelUploader({ onFilePicked, currentFile, onClear }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const VALID_TYPES = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
  ];

  function validateAndEmit(file) {
    if (!file) return;
    if (
      !VALID_TYPES.includes(file.type) &&
      !file.name.match(/\.(xlsx|xls)$/i)
    ) {
      alert("Please upload a valid .xlsx or .xls file.");
      return;
    }
    onFilePicked(file);
  }

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const onDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };
  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    validateAndEmit(e.dataTransfer.files[0]);
  };

  // ── Click handler ──────────────────────────────────────────────────────────
  const onInputChange = (e) => validateAndEmit(e.target.files[0]);

  // Byte -> human-readable size
  function fmtSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return (
    <div className="w-full">
      {currentFile ? (
        /* File selected */
        <div className="flex items-center justify-between p-4 bg-(--code-bg) border border-green-500/40 rounded-2xl gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-green-600/10 text-green-500 text-xl">
              <FaFileExcel />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-(--text-h) truncate">
                {currentFile.name}
              </p>
              <p className="text-xs text-(--text) mt-0.5">
                {fmtSize(currentFile.size)}
              </p>
            </div>
            <FaCheckCircle className="shrink-0 text-green-500 text-lg ml-1" />
          </div>
          <button
            onClick={onClear}
            title="Remove file"
            className="shrink-0 p-2 rounded-lg text-(--text) hover:text-red-500 hover:bg-red-500/10 transition-all duration-150 cursor-pointer"
          >
            <FaTimes />
          </button>
        </div>
      ) : (
        /* ── Drop zone ─────────────────────────────────────────────── */
        <label
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`
                        flex flex-col items-center justify-center gap-3
                        w-full min-h-[180px] px-6 py-8
                        border-2 border-dashed rounded-2xl cursor-pointer
                        transition-all duration-200
                        ${
                          dragging
                            ? "border-indigo-500 bg-indigo-500/8 scale-[1.01]"
                            : "border-(--border) hover:border-indigo-400 hover:bg-(--accent-bg)"
                        }
                    `}
        >
          <span
            className={`
                        flex items-center justify-center w-14 h-14 rounded-2xl text-2xl
                        transition-all duration-200
                        ${
                          dragging
                            ? "bg-indigo-600/15 text-indigo-400"
                            : "bg-(--code-bg) text-indigo-400"
                        }
                    `}
          >
            <FaFileExcel />
          </span>

          <div className="text-center">
            <p className="text-sm font-semibold text-(--text-h)">
              {dragging ? "Drop your file here" : "Drag & drop your Excel file"}
            </p>
            <p className="text-xs text-(--text) mt-1">
              or{" "}
              <span className="text-indigo-500 font-medium">
                click to browse
              </span>{" "}
              — .xlsx or .xls
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={onInputChange}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </label>
      )}
    </div>
  );
}
