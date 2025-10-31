import React from "react";
import Navbar from "../components/Navbar";

const About = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar user={user} />
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          About TaskTrack
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          TaskTrack is your smart companion for managing assignments and
          submissions efficiently. Built for both students and admins, it
          ensures smooth coordination, timely submissions, and transparency in
          progress tracking.
        </p>
        <p className="text-gray-600 mt-4">
          Designed with simplicity, built for productivity — TaskTrack helps you
          stay ahead of deadlines, whether you’re assigning or submitting.
        </p>
      </div>
    </div>
  );
};

export default About;
