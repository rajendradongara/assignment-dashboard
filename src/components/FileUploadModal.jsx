import { toast } from "sonner";

import { useFile } from "../context/FileContext.js";

const FileUploadModal = ({ open, onClose }) => {
  const { uploadedFile, setUploadedFile } = useFile();

  if (!open) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUploadedFile(selectedFile);
      console.log("Selected file:", selectedFile);
      console.log(uploadedFile);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!uploadedFile)
      return toast.error("Please select a file before submitting.");

    toast.success("File Uploaded Successfully");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Upload Assignment
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-700 font-medium mb-2">
            Select file (PDF, DOCX, PPT)
          </label>

          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none 
            file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
            file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            required
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
              className="px-4 py-2 rounded-md text-gray-600 border hover:bg-gray-100 transition"
            >
              Close
            </button>

            <button
              type="submit"
              className={
                "px-4 py-2 rounded-md text-white font-semibold transition bg-blue-600 hover:bg-blue-700"
              }
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUploadModal;
