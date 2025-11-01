
import { defaultAssignments } from "../data/assignments";


const STORAGE_KEY = "assignments";

export const getAllAssignments = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAssignments));
        return JSON.parse(JSON.stringify(defaultAssignments));
    }
    try {
        return JSON.parse(raw);
    } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAssignments));
        return JSON.parse(JSON.stringify(defaultAssignments));
    }
};

export const saveAllAssignments = (arr) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
};


export const getAssignmentsForStudent = (studentEmail) => {
    const all = getAllAssignments();

    return all.map((a) => {
        const sub = a.submissions?.find((s) => s.userEmail === studentEmail) || {
            userEmail: studentEmail,
            submitted: false,
            submittedAt: null,
        };

        return { ...a, studentSubmission: sub };
    });

};


export const confirmSubmissionForStudent = (assignmentId, studentEmail) => {
    const all = getAllAssignments();
    const idx = all.findIndex((a) => a.id === assignmentId);
    if (idx === -1) return false;
    const a = all[idx];
    const subIdx = (a.submissions || []).findIndex((s) => s.userEmail === studentEmail);
    const now = new Date().toISOString();
    if (subIdx === -1) {
        a.submissions = a.submissions || [];
        a.submissions.push({ userEmail: studentEmail, submitted: true, submittedAt: now });
    } else {
        a.submissions[subIdx].submitted = true;
        a.submissions[subIdx].submittedAt = now;
    }
    all[idx] = a;
    saveAllAssignments(all);
    return true;
};


export const computeOverallProgress = (studentEmail) => {
    const all = getAllAssignments();
    if (!all.length) return 0;
    const total = all.length;
    const done = all.reduce((acc, a) => {
        const sub = a.submissions?.find((s) => s.userEmail === studentEmail);
        return acc + (sub && sub.submitted ? 1 : 0);
    }, 0);
    return Math.round((done / total) * 100);
};


export const createNewAssignment = (newAssignment, user) => {
    if (!newAssignment.title || !newAssignment.dueDate) {
        return { success: false, message: 'Title and Due date are required.' }
    }

    const all = getAllAssignments();
    const newA = {
        id: `a_${Date.now()}`,
        ...newAssignment,
        createdBy: user.email,
        submissions: [],
    };
    all.push(newA);
    saveAllAssignments(all);
    return { success: true, newA }
}


export const getSubmittedAssignments = (assignments, user) => {
    const submittedAssinments = assignments.filter((a) =>
        a.submissions.some(
            (s) => s.userEmail === user.email && s.submitted === true
        )
    )
    return submittedAssinments

}


export const getPendingAssignments = (assignments, user) => {
    const pendingAssignments = assignments.filter(
        (a) => !a.submissions.some((s) => s.userEmail === user.email)
    );
    return pendingAssignments

}

