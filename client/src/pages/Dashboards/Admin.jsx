/*
    Developed By Sudarshan Gondalwad

    This Admin component which includes all the options related to admin dashboard ..
    This compnent is designed in such a way that in future if needed we can also add new options by just 
        adding them into the given list "SIDEBAR_GROUPS".
    As of now all the relavant functions are mentioned in the same file but some of reusable components may be moved to another file 
        keeping this file always funtional.
    
*/
import { useState, useEffect, useCallback } from "react";
import {
    FaBuilding, FaLayerGroup,
    FaUserGraduate, FaUserPlus, FaFileImport, FaUserMinus,
    FaChalkboardTeacher, FaUserTie, FaUserSlash,
    FaClipboardList, FaCalendarPlus, FaGavel, FaClock,
    FaDatabase, FaCheckSquare, FaAlignLeft, FaCode,
    FaChartBar, FaRobot,
    FaTrophy,
    FaQuestionCircle,
    FaTrash, FaPlus, FaSearch, FaTimes, FaCheck,
    FaSpinner,
} from "react-icons/fa";
import DashboardLayout from "../components/DashboardLayout";
import {
    fetchUserProfile,
    fetchBatches,
    fetchStudents,
    addStudent,
    removeStudent,
    fetchFaculty,
    addFaculty,
    removeFaculty,
    fetchAssessments,
    fetchQuestions,
    fetchResults,
    publishContest,
} from "../../jsFunctions";

// ─── Sidebar configuration ─────────────────────────────────────────────────────
// Add a new item here and it will automatically appear in the sidebar + be handled below.
const SIDEBAR_GROUPS = [
    {
        groupLabel: "Institute Management",
        items: [
            { key: "batches", label: "Batches", icon: <FaLayerGroup /> },
        ],
    },
    {
        groupLabel: "Student Management",
        items: [
            { key: "add-student", label: "Add Student", icon: <FaUserPlus /> },
            { key: "bulk-import", label: "Bulk Import Students", icon: <FaFileImport /> },
            { key: "remove-student", label: "Remove Student", icon: <FaUserMinus /> },
        ],
    },
    {
        groupLabel: "Faculty Management",
        items: [
            { key: "add-faculty", label: "Add Faculty", icon: <FaUserTie /> },
            { key: "remove-faculty", label: "Remove Faculty", icon: <FaUserSlash /> },
        ],
    },
    {
        groupLabel: "Assessment Management",
        items: [
            { key: "create-assess", label: "Create Assessment", icon: <FaClipboardList /> },
            { key: "schedule-assess", label: "Schedule Assessment", icon: <FaCalendarPlus /> },
            { key: "common-rules", label: "Common Rules", icon: <FaGavel /> },
            { key: "upcoming-assess", label: "Upcoming Assessments", icon: <FaClock /> },
        ],
    },
    {
        groupLabel: "Question Bank",
        items: [
            { key: "mcqs", label: "MCQs", icon: <FaCheckSquare /> },
            { key: "descriptive", label: "Descriptive Questions", icon: <FaAlignLeft /> },
            { key: "coding", label: "Coding Questions", icon: <FaCode /> },
        ],
    },
    {
        groupLabel: "Evaluation & Results",
        items: [
            { key: "results", label: "Results", icon: <FaChartBar /> },
            { key: "ai-evaluation", label: "AI Evaluation", icon: <FaRobot /> },
        ],
    },
    {
        groupLabel: "Contest Management",
        items: [
            { key: "publish-contest", label: "Publish Contest", icon: <FaTrophy /> },
        ],
    },
    {
        groupLabel: "Support",
        items: [
            { key: "help", label: "Help", icon: <FaQuestionCircle /> },
        ],
    },
];

// ─── Helper: derive page title from active key ─────────────────────────────────
function getTitleFromKey(key) {
    for (const group of SIDEBAR_GROUPS) {
        const found = group.items.find((i) => i.key === key);
        if (found) return found.label;
    }
    return "Dashboard";
}

// ─── Shared UI atoms ───────────────────────────────────────────────────────────

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

function StatusBadge({ status }) {
    const map = {
        active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        inactive: "bg-gray-100  text-gray-600  dark:bg-gray-800 dark:text-gray-400",
        upcoming: "bg-blue-100  text-blue-700  dark:bg-blue-900/30 dark:text-blue-400",
        draft: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        completed: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
        easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        hard: "bg-red-100   text-red-700   dark:bg-red-900/30 dark:text-red-400",
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
            {status}
        </span>
    );
}

function FieldInput({ label, type = "text", value, onChange, placeholder, readOnly }) {
    return (
        <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-(--text) mb-1.5">
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                readOnly={readOnly}
                className={`w-full bg-(--code-bg) border border-(--border) rounded-xl px-4 py-2.5 text-sm text-(--text-h) placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-150 ${readOnly ? "opacity-60 cursor-not-allowed" : ""}`}
            />
        </div>
    );
}

function ActionButton({ onClick, loading, children, variant = "primary", className = "" }) {
    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20",
        danger: "bg-red-600 hover:bg-red-500 text-white shadow-sm shadow-red-500/20",
        secondary: "bg-[var(--code-bg)] hover:bg-[var(--border)] text-[var(--text-h)] border border-[var(--border)]",
    };
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
        >
            {loading ? <FaSpinner className="animate-spin" /> : null}
            {children}
        </button>
    );
}

function LoadingState() {
    return (
        <div className="flex items-center justify-center py-16 text-(--text)">
            <FaSpinner className="animate-spin text-2xl text-indigo-500 mr-3" />
            <span className="text-sm">Loading…</span>
        </div>
    );
}

function EmptyState({ message }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-(--text)">
            <FaDatabase className="text-4xl text-indigo-300 mb-3" />
            <p className="text-sm">{message}</p>
        </div>
    );
}

function Toast({ message, type, onClose }) {
    const colors = {
        success: "bg-green-600",
        error: "bg-red-600",
        info: "bg-indigo-600",
    };
    useEffect(() => {
        const t = setTimeout(onClose, 3000);
        return () => clearTimeout(t);
    }, [onClose]);
    return (
        <div className={`fixed bottom-6 right-6 z-9999 flex items-center gap-3 ${colors[type] ?? colors.info} text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-lg shadow-black/20 animate-slide-up`}>
            {type === "success" ? <FaCheck /> : type === "error" ? <FaTimes /> : null}
            {message}
        </div>
    );
}

// ─── Section components ────────────────────────────────────────────────────────

function Batches() {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => { fetchBatches().then(setBatches).finally(() => setLoading(false)); }, []);
    return (
        <div>
            <SectionHeading title="Batches" subtitle="All institute batches and their current status." />
            <Card>
                {loading ? <LoadingState /> : batches.length === 0 ? <EmptyState message="No batches found." /> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-(--border)">
                                    {["Batch Name", "Students", "Start Date", "Status"].map((h) => (
                                        <th key={h} className="pb-3 text-left text-xs uppercase tracking-wider text-(--text) font-semibold pr-6 last:pr-0">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-(--border)">
                                {batches.map((b) => (
                                    <tr key={b.id} className="hover:bg-(--code-bg) transition-colors duration-100">
                                        <td className="py-3.5 pr-6 font-medium text-(--text-h)">{b.name}</td>
                                        <td className="py-3.5 pr-6 text-(--text)">{b.studentCount}</td>
                                        <td className="py-3.5 pr-6 text-(--text)">{b.startDate}</td>
                                        <td className="py-3.5"><StatusBadge status={b.isActive ? "active" : "inactive"} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}

function AddStudent({ showToast }) {
    const [form, setForm] = useState({ name: "", email: "", batch: "" });
    const [loading, setLoading] = useState(false);
    const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
    const handleSubmit = () => {
        if (!form.name || !form.email || !form.batch) return showToast("Please fill all fields.", "error");
        setLoading(true);
        addStudent(form)
            .then(() => { setForm({ name: "", email: "", batch: "" }); showToast("Student added successfully!", "success"); })
            .finally(() => setLoading(false));
    };
    return (
        <div>
            <SectionHeading title="Add Student" subtitle="Enrol a new student into a batch." />
            <Card className="max-w-xl">
                <div className="space-y-4">
                    <FieldInput label="Full Name" value={form.name} onChange={set("name")} placeholder="e.g. Ananya Sharma" />
                    <FieldInput label="Email" type="email" value={form.email} onChange={set("email")} placeholder="student@example.com" />
                    <FieldInput label="Batch Name" value={form.batch} onChange={set("batch")} placeholder="e.g. Batch A – 2024" />
                    <ActionButton onClick={handleSubmit} loading={loading}>
                        <FaPlus className="text-xs" /> Add Student
                    </ActionButton>
                </div>
            </Card>
        </div>
    );
}

function BulkImportStudents({ showToast }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleImport = () => {
        if (!file) return showToast("Please select a CSV file.", "error");
        setLoading(true);
        // Replace with actual upload API call
        setTimeout(() => { setFile(null); setLoading(false); showToast("Students imported successfully!", "success"); }, 800);
    };
    return (
        <div>
            <SectionHeading title="Bulk Import Students" subtitle="Upload a CSV file to add multiple students at once." />
            <Card className="max-w-xl">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-(--text) mb-1.5">CSV File</label>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-(--border) rounded-2xl cursor-pointer hover:border-indigo-400 hover:bg-(--accent-bg) transition-all duration-200">
                            <FaFileImport className="text-2xl text-indigo-400 mb-2" />
                            <span className="text-sm text-(--text)">{file ? file.name : "Click to upload CSV"}</span>
                            <input type="file" accept=".csv" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                    </div>
                    <p className="text-xs text-(--text)">Expected columns: <code className="bg-(--code-bg) px-1.5 py-0.5 rounded font-mono">name, email, batch</code></p>
                    <ActionButton onClick={handleImport} loading={loading}>
                        <FaFileImport className="text-xs" /> Import Students
                    </ActionButton>
                </div>
            </Card>
        </div>
    );
}

function RemoveStudent({ showToast }) {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [removing, setRemoving] = useState(null);
    useEffect(() => { fetchStudents().then(setStudents).finally(() => setLoading(false)); }, []);
    const filtered = students.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.email.toLowerCase().includes(query.toLowerCase())
    );
    const handleRemove = (id) => {
        setRemoving(id);
        removeStudent(id)
            .then(() => { setStudents((p) => p.filter((s) => s.id !== id)); showToast("Student removed.", "success"); })
            .finally(() => setRemoving(null));
    };
    return (
        <div>
            <SectionHeading title="Remove Student" subtitle="Search and remove a student from the institute." />
            <Card>
                <div className="relative mb-4">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text) text-xs" />
                    <input
                        type="text"
                        placeholder="Search by name or email…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-(--code-bg) border border-(--border) rounded-xl text-sm text-(--text-h) placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                </div>
                {loading ? <LoadingState /> : filtered.length === 0 ? <EmptyState message="No students match your search." /> : (
                    <div className="space-y-2">
                        {filtered.map((s) => (
                            <div key={s.id} className="flex items-center justify-between p-3.5 bg-(--code-bg) rounded-xl border border-(--border) hover:border-red-300 transition-colors duration-150">
                                <div>
                                    <p className="text-sm font-semibold text-(--text-h)">{s.name}</p>
                                    <p className="text-xs text-(--text)">{s.email} · {s.batch}</p>
                                </div>
                                <ActionButton variant="danger" onClick={() => handleRemove(s.id)} loading={removing === s.id}>
                                    <FaTrash className="text-xs" />
                                </ActionButton>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}

function AddFaculty({ showToast }) {
    const [form, setForm] = useState({ name: "", email: "", department: "" });
    const [loading, setLoading] = useState(false);
    const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
    const handleSubmit = () => {
        if (!form.name || !form.email || !form.department) return showToast("Please fill all fields.", "error");
        setLoading(true);
        addFaculty(form)
            .then(() => { setForm({ name: "", email: "", department: "" }); showToast("Faculty added successfully!", "success"); })
            .finally(() => setLoading(false));
    };
    return (
        <div>
            <SectionHeading title="Add Faculty" subtitle="Register a new faculty member." />
            <Card className="max-w-xl">
                <div className="space-y-4">
                    <FieldInput label="Full Name" value={form.name} onChange={set("name")} placeholder="e.g. Dr. Meera Iyer" />
                    <FieldInput label="Email" type="email" value={form.email} onChange={set("email")} placeholder="faculty@example.com" />
                    <FieldInput label="Department" value={form.department} onChange={set("department")} placeholder="e.g. Computer Science" />
                    <ActionButton onClick={handleSubmit} loading={loading}>
                        <FaPlus className="text-xs" /> Add Faculty
                    </ActionButton>
                </div>
            </Card>
        </div>
    );
}

function RemoveFaculty({ showToast }) {
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [removing, setRemoving] = useState(null);
    useEffect(() => { fetchFaculty().then(setFaculty).finally(() => setLoading(false)); }, []);
    const filtered = faculty.filter((f) =>
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.department.toLowerCase().includes(query.toLowerCase())
    );
    const handleRemove = (id) => {
        setRemoving(id);
        removeFaculty(id)
            .then(() => { setFaculty((p) => p.filter((f) => f.id !== id)); showToast("Faculty removed.", "success"); })
            .finally(() => setRemoving(null));
    };
    return (
        <div>
            <SectionHeading title="Remove Faculty" subtitle="Search and remove a faculty member." />
            <Card>
                <div className="relative mb-4">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text) text-xs" />
                    <input type="text" placeholder="Search by name or department…" value={query} onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-(--code-bg) border border-(--border) rounded-xl text-sm text-(--text-h) placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                </div>
                {loading ? <LoadingState /> : filtered.length === 0 ? <EmptyState message="No faculty match your search." /> : (
                    <div className="space-y-2">
                        {filtered.map((f) => (
                            <div key={f.id} className="flex items-center justify-between p-3.5 bg-(--code-bg) rounded-xl border border-(--border) hover:border-red-300 transition-colors duration-150">
                                <div>
                                    <p className="text-sm font-semibold text-(--text-h)">{f.name}</p>
                                    <p className="text-xs text-(--text)">{f.email} · {f.department}</p>
                                </div>
                                <ActionButton variant="danger" onClick={() => handleRemove(f.id)} loading={removing === f.id}>
                                    <FaTrash className="text-xs" />
                                </ActionButton>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}

function CreateAssessment({ showToast }) {
    const [form, setForm] = useState({ title: "", category: "MCQ", duration: "", totalMarks: "" });
    const [loading, setLoading] = useState(false);
    const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
    const handleSubmit = () => {
        if (!form.title || !form.duration || !form.totalMarks) return showToast("Please fill all fields.", "error");
        setLoading(true);
        // Replace with actual API call
        setTimeout(() => { setForm({ title: "", category: "MCQ", duration: "", totalMarks: "" }); setLoading(false); showToast("Assessment created!", "success"); }, 600);
    };
    return (
        <div>
            <SectionHeading title="Create Assessment" subtitle="Set up a new assessment for your batches." />
            <Card className="max-w-xl">
                <div className="space-y-4">
                    <FieldInput label="Assessment Title" value={form.title} onChange={set("title")} placeholder="e.g. Mid-Term Exam" />
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-(--text) mb-1.5">Category</label>
                        <select value={form.category} onChange={set("category")}
                            className="w-full bg-(--code-bg) border border-(--border) rounded-xl px-4 py-2.5 text-sm text-(--text-h) outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer">
                            {["MCQ", "Descriptive", "Coding"].map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FieldInput label="Duration (mins)" type="number" value={form.duration} onChange={set("duration")} placeholder="60" />
                        <FieldInput label="Total Marks" type="number" value={form.totalMarks} onChange={set("totalMarks")} placeholder="100" />
                    </div>
                    <ActionButton onClick={handleSubmit} loading={loading}>
                        <FaPlus className="text-xs" /> Create Assessment
                    </ActionButton>
                </div>
            </Card>
        </div>
    );
}

function ScheduleAssessment({ showToast }) {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState("");
    const [date, setDate] = useState("");
    const [batch, setBatch] = useState("");
    const [saving, setSaving] = useState(false);
    useEffect(() => { fetchAssessments().then(setAssessments).finally(() => setLoading(false)); }, []);
    const handleSave = () => {
        if (!selected || !date || !batch) return showToast("Fill all fields.", "error");
        setSaving(true);
        setTimeout(() => { setSaving(false); showToast("Assessment scheduled!", "success"); }, 600);
    };
    return (
        <div>
            <SectionHeading title="Schedule Assessment" subtitle="Assign a date and batch to an existing assessment." />
            <Card className="max-w-xl">
                {loading ? <LoadingState /> : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-(--text) mb-1.5">Assessment</label>
                            <select value={selected} onChange={(e) => setSelected(e.target.value)}
                                className="w-full bg-(--code-bg) border border-(--border) rounded-xl px-4 py-2.5 text-sm text-(--text-h) outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer">
                                <option value="">Select assessment…</option>
                                {assessments.map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
                            </select>
                        </div>
                        <FieldInput label="Date & Time" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
                        <FieldInput label="Batch" value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="e.g. Batch A – 2024" />
                        <ActionButton onClick={handleSave} loading={saving}>
                            <FaCalendarPlus className="text-xs" /> Schedule
                        </ActionButton>
                    </div>
                )}
            </Card>
        </div>
    );
}

function CommonRules({ showToast }) {
    const [rules, setRules] = useState({ noTabSwitch: true, randomize: true, timeLimit: true, antiPaste: false });
    const toggle = (k) => setRules((p) => ({ ...p, [k]: !p[k] }));
    const RULES = [
        { key: "noTabSwitch", label: "Disable tab switching", desc: "Assessment auto-submits if user leaves the tab." },
        { key: "randomize", label: "Randomize question order", desc: "Different order for each participant." },
        { key: "timeLimit", label: "Strict time enforcement", desc: "Auto-submit when timer expires." },
        { key: "antiPaste", label: "Block copy-paste in answers", desc: "Prevents pasting into answer fields." },
    ];
    return (
        <div>
            <SectionHeading title="Common Rules" subtitle="Global rules applied to all assessments by default." />
            <Card className="max-w-xl">
                <div className="space-y-3">
                    {RULES.map((r) => (
                        <div key={r.key} onClick={() => toggle(r.key)}
                            className="flex items-start gap-4 p-4 rounded-xl border border-(--border) hover:border-indigo-400 cursor-pointer transition-all duration-150 hover:bg-(--accent-bg)">
                            <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors duration-150 ${rules[r.key] ? "bg-indigo-600 border-indigo-600" : "border-(--border)"}`}>
                                {rules[r.key] && <FaCheck className="text-white text-[10px]" />}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-(--text-h)">{r.label}</p>
                                <p className="text-xs text-(--text) mt-0.5">{r.desc}</p>
                            </div>
                        </div>
                    ))}
                    <ActionButton onClick={() => showToast("Rules saved!", "success")}>Save Rules</ActionButton>
                </div>
            </Card>
        </div>
    );
}

function UpcomingAssessments() {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchAssessments()
            .then((data) => setAssessments(data.filter((a) => a.status !== "completed")))
            .finally(() => setLoading(false));
    }, []);
    return (
        <div>
            <SectionHeading title="Upcoming Assessments" subtitle="Assessments scheduled or in draft." />
            <Card>
                {loading ? <LoadingState /> : assessments.length === 0 ? <EmptyState message="No upcoming assessments." /> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-(--border)">
                                    {["Title", "Category", "Scheduled At", "Status"].map((h) => (
                                        <th key={h} className="pb-3 text-left text-xs uppercase tracking-wider text-(--text) font-semibold pr-6">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-(--border)">
                                {assessments.map((a) => (
                                    <tr key={a.id} className="hover:bg-(--code-bg) transition-colors duration-100">
                                        <td className="py-3.5 pr-6 font-medium text-(--text-h)">{a.title}</td>
                                        <td className="py-3.5 pr-6 text-(--text)">{a.category}</td>
                                        <td className="py-3.5 pr-6 text-(--text)">{a.scheduledAt}</td>
                                        <td className="py-3.5"><StatusBadge status={a.status} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}

function QuestionBankSection({ type, showToast }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchQuestions().then((q) => setData(q[type] ?? [])).finally(() => setLoading(false));
    }, [type]);

    const titles = { mcq: "MCQs", descriptive: "Descriptive Questions", coding: "Coding Questions" };
    const subtitles = {
        mcq: "Multiple choice questions available in the bank.",
        descriptive: "Long-form and paragraph answer questions.",
        coding: "Programming challenges with multiple language support.",
    };

    return (
        <div>
            <SectionHeading title={titles[type]} subtitle={subtitles[type]} />
            <Card>
                {loading ? <LoadingState /> : data.length === 0 ? <EmptyState message="No questions found." /> : (
                    <div className="space-y-3">
                        {data.map((q) => (
                            <div key={q.id} className="p-4 bg-(--code-bg) rounded-xl border border-(--border) flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-(--text-h)">{q.text ?? q.title}</p>
                                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                        <span className="text-xs text-(--text) bg-(--border) px-2 py-0.5 rounded-md">{q.topic}</span>
                                        <StatusBadge status={q.difficulty} />
                                        {q.languages && (
                                            <span className="text-xs text-(--text)">{q.languages.join(", ")}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}

function Results() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => { fetchResults().then(setResults).finally(() => setLoading(false)); }, []);
    return (
        <div>
            <SectionHeading title="Results" subtitle="Graded assessment results for all students." />
            <Card>
                {loading ? <LoadingState /> : results.length === 0 ? <EmptyState message="No results available." /> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-(--border)">
                                    {["Student", "Assessment", "Score", "Grade", "AI Evaluated"].map((h) => (
                                        <th key={h} className="pb-3 text-left text-xs uppercase tracking-wider text-(--text) font-semibold pr-6">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-(--border)">
                                {results.map((r) => (
                                    <tr key={r.id} className="hover:bg-(--code-bg) transition-colors duration-100">
                                        <td className="py-3.5 pr-6 font-medium text-(--text-h)">{r.studentName}</td>
                                        <td className="py-3.5 pr-6 text-(--text)">{r.assessment}</td>
                                        <td className="py-3.5 pr-6">
                                            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{r.score}</span>
                                        </td>
                                        <td className="py-3.5 pr-6">
                                            <span className="font-semibold text-(--text-h)">{r.grade}</span>
                                        </td>
                                        <td className="py-3.5">
                                            {r.aiEvaluated
                                                ? <span className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 font-medium"><FaRobot /> AI</span>
                                                : <span className="text-xs text-(--text)">Manual</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>
        </div>
    );
}

function AiEvaluation({ showToast }) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [evaluating, setEvaluating] = useState(null);
    useEffect(() => { fetchResults().then((r) => setResults(r.filter((x) => !x.aiEvaluated))).finally(() => setLoading(false)); }, []);
    const runEval = (id) => {
        setEvaluating(id);
        setTimeout(() => {
            setResults((p) => p.filter((r) => r.id !== id));
            setEvaluating(null);
            showToast("AI evaluation complete!", "success");
        }, 1200);
    };
    return (
        <div>
            <SectionHeading title="AI Evaluation" subtitle="Pending descriptive answers awaiting AI grading." />
            <Card>
                {loading ? <LoadingState /> : results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                        <FaRobot className="text-4xl text-indigo-400 mb-3" />
                        <p className="text-sm text-(--text)">All submissions have been evaluated.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {results.map((r) => (
                            <div key={r.id} className="flex items-center justify-between p-4 bg-(--code-bg) rounded-xl border border-(--border)">
                                <div>
                                    <p className="text-sm font-semibold text-(--text-h)">{r.studentName}</p>
                                    <p className="text-xs text-(--text)">{r.assessment}</p>
                                </div>
                                <ActionButton onClick={() => runEval(r.id)} loading={evaluating === r.id} variant="primary">
                                    <FaRobot className="text-xs" /> Evaluate
                                </ActionButton>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}

function PublishContest({ showToast }) {
    const [form, setForm] = useState({ title: "", description: "", startDate: "", endDate: "", batch: "" });
    const [loading, setLoading] = useState(false);
    const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));
    const handlePublish = () => {
        if (!form.title || !form.startDate || !form.endDate) return showToast("Fill required fields.", "error");
        setLoading(true);
        publishContest(form)
            .then(() => { setForm({ title: "", description: "", startDate: "", endDate: "", batch: "" }); showToast("Contest published!", "success"); })
            .finally(() => setLoading(false));
    };
    return (
        <div>
            <SectionHeading title="Publish Contest" subtitle="Create and launch a new coding or assessment contest." />
            <Card className="max-w-xl">
                <div className="space-y-4">
                    <FieldInput label="Contest Title" value={form.title} onChange={set("title")} placeholder="e.g. CodeCluster Hackathon 2024" />
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-(--text) mb-1.5">Description</label>
                        <textarea value={form.description} onChange={set("description")} placeholder="Briefly describe the contest…" rows={3}
                            className="w-full bg-(--code-bg) border border-(--border) rounded-xl px-4 py-2.5 text-sm text-(--text-h) placeholder:text-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FieldInput label="Start Date" type="datetime-local" value={form.startDate} onChange={set("startDate")} />
                        <FieldInput label="End Date" type="datetime-local" value={form.endDate} onChange={set("endDate")} />
                    </div>
                    <FieldInput label="Target Batch (optional)" value={form.batch} onChange={set("batch")} placeholder="Leave blank for all batches" />
                    <ActionButton onClick={handlePublish} loading={loading}>
                        <FaTrophy className="text-xs" /> Publish Contest
                    </ActionButton>
                </div>
            </Card>
        </div>
    );
}

function Help() {
    const faqs = [
        { q: "How do I add a new batch?", a: "Navigate to Institute Management → Batches and use the create button (coming soon)." },
        { q: "Can I undo a student removal?", a: "No. Removal is permanent from the front-end. Contact your backend admin to restore." },
        { q: "How does AI evaluation work?", a: "Descriptive answers are sent to the AI engine which scores them based on rubrics you define in Common Rules." },
        { q: "Can I export results to CSV?", a: "Export functionality will be available after backend integration." },
        { q: "Who can access the Admin dashboard?", a: "Only users with the role 'admin' are allowed. Role-based routing will be enforced once the backend is live." },
    ];
    return (
        <div>
            <SectionHeading title="Help & FAQ" subtitle="Common questions about using the Admin Dashboard." />
            <div className="space-y-3 max-w-2xl">
                {faqs.map((f, i) => (
                    <Card key={i}>
                        <p className="text-sm font-semibold text-(--text-h) mb-1">{f.q}</p>
                        <p className="text-sm text-(--text)">{f.a}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}

// ─── Section router ────────────────────────────────────────────────────────────
function SectionRouter({ activeKey, showToast }) {
    switch (activeKey) {
        case "batches": return <Batches />;
        case "add-student": return <AddStudent showToast={showToast} />;
        case "bulk-import": return <BulkImportStudents showToast={showToast} />;
        case "remove-student": return <RemoveStudent showToast={showToast} />;
        case "add-faculty": return <AddFaculty showToast={showToast} />;
        case "remove-faculty": return <RemoveFaculty showToast={showToast} />;
        case "create-assess": return <CreateAssessment showToast={showToast} />;
        case "schedule-assess": return <ScheduleAssessment showToast={showToast} />;
        case "common-rules": return <CommonRules showToast={showToast} />;
        case "upcoming-assess": return <UpcomingAssessments />;
        case "mcqs": return <QuestionBankSection type="mcq" showToast={showToast} />;
        case "descriptive": return <QuestionBankSection type="descriptive" showToast={showToast} />;
        case "coding": return <QuestionBankSection type="coding" showToast={showToast} />;
        case "results": return <Results />;
        case "ai-evaluation": return <AiEvaluation showToast={showToast} />;
        case "publish-contest": return <PublishContest showToast={showToast} />;
        case "help": return <Help />;
        default: return <Batches />;
    }
}

// ─── Admin root ────────────────────────────────────────────────────────────────
export default function Admin() {
    if (!localStorage.getItem("jwt")) {
        return window.location.href="/Home";
    }
    
    const [activeKey, setActiveKey] = useState("batches");
    const [userProfile, setUserProfile] = useState({});
    const [toast, setToast] = useState(null);  // { message, type }

    // Fetch user profile on mount
    useEffect(() => { fetchUserProfile().then(setUserProfile); }, []);

    const showToast = useCallback((message, type = "info") => {
        setToast({ message, type });
    }, []);

    return (
        <>
            <DashboardLayout
                sidebarGroups={SIDEBAR_GROUPS}
                userProfile={userProfile}
                activeKey={activeKey}
                onSelect={setActiveKey}
                pageTitle={getTitleFromKey(activeKey)}
            >
                <SectionRouter activeKey={activeKey} showToast={showToast} />
            </DashboardLayout>

            {toast && (
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            )}
        </>
    );
}