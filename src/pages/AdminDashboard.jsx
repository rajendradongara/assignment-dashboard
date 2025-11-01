import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { getLoggedInUser } from "../utils/auth.js";
import {
  createNewAssignment,
  getAllAssignments,
} from "../utils/assignmentStorage.js";
import { getAllStudents } from "../utils/userStorage.js";
import ProgressBar from "../components/ProgressBar.jsx";
import Navbar from "../components/Navbar.jsx";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const students = getAllStudents();
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    driveLink: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [expandedAssignment, setExpandedAssignment] = useState(null);

  useEffect(() => {
    const u = getLoggedInUser();
    if (!u || u.role !== "admin") {
      navigate("/");
      return;
    }
    setUser(u);
    loadData(u.email);
  }, [navigate]);

  function loadData(adminEmail) {
    const all = getAllAssignments();
    setAssignments(all.filter((a) => a.createdBy === adminEmail));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();

    const result = createNewAssignment(newAssignment, user);
    if (result.success) {
      toast.success("Assignment created successfully");
      loadData(user.email);

      setNewAssignment({
        title: "",
        description: "",
        dueDate: "",
        driveLink: "",
      });
    } else {
      toast.error(result.message);
    }
  };

  const getProgressForAssignment = (assignment) => {
    const totalStudents = students.length;
    if (totalStudents === 0) return 0;
    const submitted = assignment.submissions.filter((s) => s.submitted).length;
    return Math.round((submitted / totalStudents) * 100);
  };

  return (
    <>
      <Navbar user={user} />
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Hello, {user?.name || "Professor"} 👋
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back to your{" "}
              <span className="text-purple-700 font-semibold">TaskTrack</span>{" "}
              dashboard — manage assignments and track student progress easily.
            </p>
          </div>

          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow transition font-medium"
          >
            {showForm ? "Close Form" : "Create New Assignment"}
          </button>
        </div>

        {showForm && (
          <section className="bg-white shadow rounded-lg p-6 mb-8 animate-fadeIn">
            <h2 className="text-lg font-semibold mb-4">
              Create New Assignment
            </h2>
            <form
              onSubmit={handleCreateAssignment}
              className="grid gap-4 md:grid-cols-2"
            >
              <input
                type="text"
                name="title"
                value={newAssignment.title}
                onChange={handleInputChange}
                placeholder="Assignment Title"
                className="border rounded p-2"
                required
              />
              <input
                type="date"
                name="dueDate"
                value={newAssignment.dueDate}
                onChange={handleInputChange}
                className="border rounded p-2"
                required
              />
              <textarea
                name="description"
                value={newAssignment.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border rounded p-2 md:col-span-2"
              />
              <input
                type="url"
                name="driveLink"
                value={newAssignment.driveLink}
                onChange={handleInputChange}
                placeholder="Google Drive Link (optional)"
                className="border rounded p-2 md:col-span-2"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded md:col-span-2"
              >
                Create Assignment
              </button>
            </form>
          </section>
        )}

        {assignments.length === 0 ? (
          <div className="bg-white p-6 text-center text-gray-600 rounded-lg shadow">
            No assignments created yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {assignments.map((a) => (
              <div
                key={a.id}
                className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-md transition"
                onClick={() =>
                  setExpandedAssignment((prev) => (prev === a.id ? null : a.id))
                }
              >
                <div className="flex flex-col space-y-2 mb-3">
                  <h3 className="text-lg font-bold text-blue-700">{a.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {a.description}
                  </p>
                  <p className="text-xs text-gray-400">Due: {a.dueDate}</p>
                </div>

                <div className="w-full">
                  <p className="text-xs text-gray-500 mb-1">
                    {getProgressForAssignment(a)}% Submitted
                  </p>
                  <ProgressBar percent={getProgressForAssignment(a)} />
                </div>

                {expandedAssignment === a.id && (
                  <div className="mt-4 border-t pt-4 animate-fadeIn">
                    <h4 className="text-sm font-semibold mb-2">Submissions</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="text-left p-2 border">Student</th>
                            <th className="text-left p-2 border">Email</th>
                            <th className="text-center p-2 border">Status</th>
                            <th className="text-center p-2 border">
                              Submitted At
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {students.map((stu) => {
                            const sub = a.submissions.find(
                              (s) => s.userEmail === stu.email
                            );
                            const submitted = sub?.submitted || false;
                            const time = sub?.submittedAt
                              ? new Date(sub.submittedAt).toLocaleString()
                              : "-";
                            return (
                              <tr key={stu.email}>
                                <td className="p-2 border">{stu.name}</td>
                                <td className="p-2 border">{stu.email}</td>
                                <td
                                  className={`p-2 text-center border font-semibold ${
                                    submitted
                                      ? "text-green-600"
                                      : "text-gray-400"
                                  }`}
                                >
                                  {submitted ? "Submitted" : "Pending"}
                                </td>
                                <td className="p-2 text-center border text-gray-500">
                                  {time}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
