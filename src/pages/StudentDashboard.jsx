import React, { useEffect, useState } from "react";
import { getLoggedInUser } from "../utils/auth"; // your auth util that validates session
import {
  getAssignmentsForStudent,
  confirmSubmissionForStudent,
  computeOverallProgress,
} from "../utils/assignmentStorage";
import AssignmentCard from "../components/AssignmentCard";
import ProgressBar from "../components/ProgressBar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const u = getLoggedInUser();
    if (!u || u.role !== "student") {
      navigate("/");
      return;
    }
    setUser(u);
    loadAssignments(u.email);
  }, [navigate]);

  function loadAssignments(email) {
    const arr = getAssignmentsForStudent(email);
    setAssignments(arr);
    setProgress(computeOverallProgress(email));
  }

  const handleConfirm = (assignmentId) => {
    if (!user) {
      toast.error("You must be logged in");
      return false;
    }
    const ok = confirmSubmissionForStudent(assignmentId, user.email);
    if (ok) {
      loadAssignments(user.email); // refresh
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Hello, {user?.name || "Student"}
            </h1>
            <p className="text-sm text-gray-500">
              Overview of your assignments
            </p>
          </div>
          <div className="w-56">
            <p className="text-xs text-gray-500 mb-1">Overall Progress</p>
            <ProgressBar percent={progress} />
            <p className="text-sm text-gray-600 mt-2">{progress}% completed</p>
          </div>
        </header>

        <section className="grid gap-4">
          {assignments.length === 0 && (
            <div className="bg-white p-6 rounded shadow text-center text-gray-600">
              No assignments yet.
            </div>
          )}
          {assignments.map((a) => (
            <AssignmentCard
              key={a.id}
              assignment={a}
              onConfirm={handleConfirm}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
