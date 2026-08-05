// ─── Auth Utilities ────────────────────────────────────────────────────────────
const baseUrl = "http://localhost:8080";

export function isValidToken() {
  return !!localStorage.getItem("jwt");
}

export function signOut() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("userType");
  window.location.href = "/home";
}


// function to call signIn api
export async function signIn(preferredId, password) {
  try {
    const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        preferredId,
        password,
      }),
    });

    if (!response.ok) {
      alert("Invalid username or password");
      return false;
    }

    const data = await response.json();

    localStorage.setItem("jwt", `${data.tokenType} ${data.accessToken}`);

    // JWT Claims
    localStorage.setItem("userType", getUserTypeFromJwt(data.accessToken));
    localStorage.setItem(
      "instituteId",
      getInstituteIdFromJwt(data.accessToken)
    );
    localStorage.setItem(
      "instituteRole",
      getInstituteRoleFromJwt(data.accessToken)
    );

    // User Details
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("name", data.user.name);
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("role", data.user.role);
    localStorage.setItem("joinedAt",data.user.createdAt);
    return true;
  } catch (error) {
    console.error("Login failed:", error);
    alert(error.message);
    return false;
  }
}
/// parseJwt

function parseJwt(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    console.error("Invalid JWT", e);
    return null;
  }
}
// usertype from jwt
function getUserTypeFromJwt(token) {
  const payload = parseJwt(token);
  return payload?.userRole || "";
}
// get insituteId from jwt
function getInstituteIdFromJwt(token) {
  const payload = parseJwt(token);
  return payload?.instituteId || "";
}
// get institute role from jwt
function getInstituteRoleFromJwt(token) {
  const payload = parseJwt(token);
  return payload?.instituteRole || "";
}


// ─── Mock API Helpers ──────────────────────────────────────────────────────────
// Replace the body of each function with a real fetch() call when the backend is ready.
// Pattern: each function returns a Promise<data> so callers can use async/await or .then()

/**
 * Fetch the logged-in user's profile.
 * Replace with: fetch("/api/user/profile", { headers: authHeaders() })
 */
export function fetchUserProfile() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        role: localStorage.getItem("instituteRole"), // "admin" | "faculty" | "student"
        avatarUrl: "https://media.istockphoto.com/id/1487995045/photo/3d-minimal-identity-verification-success-user-authentication-success-avatar-icon-with.webp?a=1&b=1&s=612x612&w=0&k=20&c=fB6jMGrr5YlOBDyY7RJYl6UyGXws1IC54Izenh-D0Nc=",
        institution: localStorage.getItem("instituteName").substring(0,9),
        joinedDate: localStorage.getItem("joinedAt"),
      });
    }, 400);
  });
}

/**
 * Fetch all batches for the institution.
 * Replace with: fetch("/api/batches")
 */
export function fetchBatches() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "b_01", name: "Batch A – 2024", studentCount: 42, isActive: true, startDate: "2024-06-01" },
        { id: "b_02", name: "Batch B – 2024", studentCount: 38, isActive: true, startDate: "2024-07-01" },
        { id: "b_03", name: "Batch C – 2023", studentCount: 45, isActive: false, startDate: "2023-06-01" },
      ]);
    }, 400);
  });
}

/**
 * Fetch all students.
 * Replace with: fetch("/api/students")
 */
export function fetchStudents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "s_01", name: "Ananya Sharma", email: "ananya@codecluster.com", batch: "Batch A – 2024", status: "active" },
        { id: "s_02", name: "Rahul Verma",   email: "rahul@codecluster.com",  batch: "Batch A – 2024", status: "active" },
        { id: "s_03", name: "Priya Nair",    email: "priya@codecluster.com",  batch: "Batch B – 2024", status: "inactive" },
        { id: "s_04", name: "Arjun Das",     email: "arjun@codecluster.com",  batch: "Batch C – 2023", status: "active" },
      ]);
    }, 400);
  });
}

/**
 * Add a new student (stub).
 * Replace with: fetch("/api/students", { method: "POST", body: JSON.stringify(data) })
 */
export function addStudent(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, student: { id: "s_new", ...data } }), 500);
  });
}

/**
 * Remove a student by ID.
 * Replace with: fetch(`/api/students/${id}`, { method: "DELETE" })
 */
export function removeStudent(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 400);
  });
}

/**
 * Fetch all faculty members.
 * Replace with: fetch("/api/faculty")
 */
export function fetchFaculty() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "f_01", name: "Dr. Meera Iyer",   email: "meera@codecluster.com",  department: "Computer Science", load: 3 },
        { id: "f_02", name: "Prof. Suresh Rao",  email: "suresh@codecluster.com", department: "Mathematics",      load: 4 },
        { id: "f_03", name: "Ms. Kavitha Menon", email: "kavitha@codecluster.com",department: "Data Science",     load: 2 },
      ]);
    }, 400);
  });
}

/**
 * Add a new faculty member (stub).
 * Replace with: fetch("/api/faculty", { method: "POST", body: JSON.stringify(data) })
 */
export function addFaculty(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, faculty: { id: "f_new", ...data } }), 500);
  });
}

/**
 * Remove a faculty member by ID.
 * Replace with: fetch(`/api/faculty/${id}`, { method: "DELETE" })
 */
export function removeFaculty(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 400);
  });
}

/**
 * Fetch assessments.
 * Replace with: fetch("/api/assessments")
 */
export function fetchAssessments() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "a_01", title: "Mid-Term Exam",          category: "Descriptive", scheduledAt: "2024-09-15", status: "upcoming" },
        { id: "a_02", title: "Python Fundamentals MCQ", category: "MCQ",         scheduledAt: "2024-09-20", status: "upcoming" },
        { id: "a_03", title: "DSA Coding Challenge",   category: "Coding",      scheduledAt: "2024-09-25", status: "draft"    },
        { id: "a_04", title: "Unit Test – SQL",        category: "MCQ",         scheduledAt: "2024-08-10", status: "completed" },
      ]);
    }, 400);
  });
}

/**
 * Fetch all questions from the Question Bank.
 * Replace with: fetch("/api/questions")
 */
export function fetchQuestions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        mcq: [
          { id: "q_m1", text: "Which data structure uses LIFO?", topic: "DSA", difficulty: "easy" },
          { id: "q_m2", text: "What is the time complexity of binary search?", topic: "Algorithms", difficulty: "medium" },
        ],
        descriptive: [
          { id: "q_d1", text: "Explain the concept of polymorphism in OOP.", topic: "OOP", difficulty: "medium" },
          { id: "q_d2", text: "What are the ACID properties of databases?", topic: "DBMS", difficulty: "hard" },
        ],
        coding: [
          { id: "q_c1", title: "Reverse a Linked List", topic: "DSA",       difficulty: "medium", languages: ["Python", "Java", "C++"] },
          { id: "q_c2", title: "Two Sum Problem",       topic: "Algorithms", difficulty: "easy",   languages: ["Python", "JavaScript"] },
        ],
      });
    }, 400);
  });
}

/**
 * Fetch evaluation results.
 * Replace with: fetch("/api/results")
 */
export function fetchResults() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "r_01", studentName: "Ananya Sharma", assessment: "Mid-Term Exam",           score: 88, grade: "A",  aiEvaluated: true  },
        { id: "r_02", studentName: "Rahul Verma",   assessment: "Mid-Term Exam",           score: 74, grade: "B",  aiEvaluated: true  },
        { id: "r_03", studentName: "Priya Nair",    assessment: "Python Fundamentals MCQ", score: 91, grade: "A+", aiEvaluated: false },
        { id: "r_04", studentName: "Arjun Das",     assessment: "DSA Coding Challenge",    score: 65, grade: "C",  aiEvaluated: true  },
      ]);
    }, 400);
  });
}

/**
 * Publish a contest.
 * Replace with: fetch("/api/contests", { method: "POST", body: JSON.stringify(data) })
 */
export function publishContest(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, contestId: "c_new" }), 500);
  });
}