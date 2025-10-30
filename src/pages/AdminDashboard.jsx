import React, { useEffect, useState } from "react";
import { getLoggedInUser } from "../utils/auth";
import {
  getAllAssignments,
  saveAllAssignments,
} from "../utils/assignmentStorage";
import { getAllUsers } from "../utils/userStorage";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    dueDate: "",
    driveLink: "",
  });

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

    const allUsers = getAllUsers();
    setStudents(allUsers.filter((u) => u.role === "student"));
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    if (!newAssignment.title || !newAssignment.dueDate) {
      toast.error("Title and due date are required.");
      return;
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
    toast.success("Assignment created successfully!");
    setNewAssignment({
      title: "",
      description: "",
      dueDate: "",
      driveLink: "",
    });
    loadData(user.email);
  };

  // calculate assignment progress (students who submitted)
  const getProgressForAssignment = (assignment) => {
    const totalStudents = students.length;
    if (totalStudents === 0) return 0;
    const submitted = assignment.submissions.filter((s) => s.submitted).length;
    return Math.round((submitted / totalStudents) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-gray-500 text-sm">
              Manage assignments and track submissions.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-blue-600 hover:underline"
          >
            Logout
          </button>
        </header>

        {/* Create Assignment Form */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Create New Assignment</h2>
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

        {/* Assignment List */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Your Assignments</h2>

          {assignments.length === 0 ? (
            <div className="bg-white p-6 text-center text-gray-600 rounded-lg shadow">
              No assignments created yet.
            </div>
          ) : (
            <div className="space-y-6">
              {assignments.map((a) => (
                <div key={a.id} className="bg-white shadow rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold">{a.title}</h3>
                      <p className="text-sm text-gray-500">{a.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        Due: {a.dueDate}
                      </p>
                    </div>
                    <div className="mt-3 md:mt-0 w-full md:w-64">
                      <p className="text-xs text-gray-500 mb-1">
                        {getProgressForAssignment(a)}% Submitted
                      </p>
                      <ProgressBar percent={getProgressForAssignment(a)} />
                    </div>
                  </div>

                  {/* Student submissions */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border border-gray-200 rounded-lg">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left p-2 border">Student Name</th>
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
                                  submitted ? "text-green-600" : "text-gray-400"
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
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
