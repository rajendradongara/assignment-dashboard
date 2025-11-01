import React, { useEffect, useState } from "react";
import { getLoggedInUser } from "../utils/auth";
import {
  getAssignmentsForStudent,
  confirmSubmissionForStudent,
  computeOverallProgress,
  getSubmittedAssignments,
  getPendingAssignments,
} from "../utils/assignmentStorage";
import AssignmentCard from "../components/AssignmentCard";
import ProgressBar from "../components/ProgressBar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

import completedImg from "../assets/undraw_completed_0sqh.svg";

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
      loadAssignments(user.email);
      return true;
    }
    return false;
  };

  const submittedAssignments = getSubmittedAssignments(assignments, user);

  const pendingAssignments = getPendingAssignments(assignments, user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar user={user} />

      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Hello, {user?.name || "Student"}
            </h2>
            <p className="text-gray-500">Here’s your assignment overview</p>
          </div>

          <div className="w-56 mt-4 md:mt-0">
            <p className="text-xs text-gray-500 mb-1">Overall Progress</p>
            <ProgressBar percent={progress} />
            <p className="text-sm text-gray-600 mt-2">{progress}% completed</p>
          </div>
        </div>

        <section className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Pending Assignments
          </h3>
          {pendingAssignments.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
              <img
                src={completedImg}
                alt="TaskTrack Dashboard Illustration"
                className="h-40 w-40 mx-auto mb-4"
              />
              All caught up! No pending assignments.
            </div>
          ) : (
            <div className="grid gap-4">
              {pendingAssignments.map((a) => (
                <AssignmentCard
                  key={a.id}
                  assignment={a}
                  onConfirm={handleConfirm}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Submitted Assignments
          </h3>
          {submittedAssignments.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
              You haven't submitted any yet.
            </div>
          ) : (
            <div className="grid gap-4">
              {submittedAssignments.map((a) => (
                <AssignmentCard
                  key={a.id}
                  assignment={a}
                  onConfirm={handleConfirm}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
