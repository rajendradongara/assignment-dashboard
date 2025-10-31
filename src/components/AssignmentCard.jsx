import React, { useState } from "react";
import { toast } from "sonner";
import ConfirmationModal from "./ConfirmationModal";
import { getAllUsers } from "../utils/userStorage.js";

export default function AssignmentCard({ assignment, onConfirm }) {
  const [modalOpen, setModalOpen] = useState(false);

  const { studentSubmission } = assignment;
  const submitted = studentSubmission?.submitted;

  const users = getAllUsers();

  const admin = users.find((u) => u.email === assignment.createdBy);

  const handleFirstClick = () => {
    setModalOpen(true);
  };

  const handleConfirm = () => {
    const ok = onConfirm(assignment.id);
    if (ok) {
      toast.success("Submission confirmed");
    } else {
      toast.error("Failed to confirm submission");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex-1">
        <h4 className="text-lg font-semibold">{assignment.title}</h4>
        <p className="text-sm text-gray-500 mb-2">{assignment.description}</p>
        <p className="text-xs text-red-600">Due: {assignment.dueDate}</p>
        <p className="text-xs text-gray-900">From: {admin.name}</p>
        {assignment.driveLink && (
          <a
            className="text-sm text-blue-600 hover:underline inline-block mt-2"
            href={assignment.driveLink}
            target="_blank"
            rel="noreferrer"
          >
            Submission Link (Drive)
          </a>
        )}
      </div>

      <div className="w-full md:w-64 flex flex-col items-end gap-3">
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {submitted ? "Submitted" : "Not Submitted"}
            </span>
            <span className="text-xs text-gray-400">
              {studentSubmission?.submittedAt
                ? new Date(studentSubmission.submittedAt).toLocaleString()
                : ""}
            </span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className={`h-full ${
                submitted ? "bg-green-400" : "bg-gray-300"
              } transition-all`}
              style={{ width: submitted ? "100%" : "0%" }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleFirstClick}
            disabled={submitted}
            className={`px-3 py-2 rounded-md ${
              submitted
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {submitted ? "Submitted" : "Confirm Submission"}
          </button>
        </div>
      </div>

      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        assignmentTitle={assignment.title}
      />
    </div>
  );
}
