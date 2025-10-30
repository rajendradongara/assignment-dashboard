import React from "react";

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  assignmentTitle,
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h3 className="text-lg font-semibold mb-3">Confirm Submission</h3>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to mark <strong>{assignmentTitle}</strong> as
          submitted? This action will mark it as final.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md border">
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-md bg-blue-600 text-white"
          >
            Yes, Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
