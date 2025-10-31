import Navbar from "../components/Navbar";

const Contact = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar user={user} />
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Need Help?</h2>
        <p className="text-gray-600 mb-6">
          We’re here to make your TaskTrack experience smooth. For any queries,
          feedback, or support — reach out to us below.
        </p>
        <div className="bg-white shadow-lg rounded-xl p-6 inline-block">
          <p className="text-gray-700 font-medium">📧 Email:</p>
          <p className="text-blue-600 font-semibold">
            support@tasktrackapp.com
          </p>
          <p className="text-gray-700 font-medium mt-4">📞 Phone:</p>
          <p className="text-blue-600 font-semibold">+91 98765 43210</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
