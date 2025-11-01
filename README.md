

---

# 🎓 Student Assignment Management System

A clean, responsive **Student-Admin Assignment Management System** built using **React + Tailwind CSS**.
Students can view assignments, upload their work, and track progress.
Admins can create assignments, manage submissions, and view uploaded files.

---

## 🚀 Features

* **Role-based Dashboard**

  * Students: View, upload, and confirm assignments.
  * Admins: Create and manage assignments, view submissions.
* **File Uploads**

  * Supports `.pdf`, `.docx`, and `.pptx` formats.
* **LocalStorage Persistence**

  * All data stored locally — no external database required.
* **Progress Tracking**

  * Individual and overall progress bars.
* **Responsive UI**

  * Built with Tailwind for a modern, clean layout.

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/rajendradongara/assignment-dashboard.git
cd assignment-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Deploy (Vercel Recommended)

* Push the project to GitHub.
* Go to [vercel.com](https://vercel.com/).
* Import your repository.
* Click **Deploy**.

---

## 🧩 Folder Structure

```
student-assignment-system/
├── public/
│   └── assets/              # Static images, icons
├── src/
│   ├── components/      # Reusable UI components (Navbar, ProgressBar, Modals, etc.)
│   ├── context/             # Global context (FileContext)
│   ├── pages/               # Main pages (StudentDashboard, AdminDashboard)
│   ├── utils/               # Helper functions (storage, auth)
│   ├── App.jsx              # Routes and layout
│   ├── main.jsx             # App entry point
│   └── index.css            # Tailwind setup
└── package.json
```

---

## 🧠 Architecture Overview

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **State Management:** React Context
* **Data Storage:** LocalStorage
* **Deployment:** Vercel

**Flow:**

1. User logs in → role identified (admin/student)
2. Admin creates assignments → stored in localStorage
3. Student views assignments → uploads file
4. File data stored temporarily (local URL) + submission status updated
5. Admin can view uploaded files & progress

---

## 🧩 Component Structure & Design Decisions

| Component             | Purpose                                                            |
| --------------------- | ------------------------------------------------------------------ |
| **Navbar**            | Handles navigation & user display                                  |
| **AssignmentCard**    | Displays individual assignments; includes upload & confirm actions |
| **ProgressBar**       | Shows overall and per-assignment progress                          |
| **FileUploadModal**   | Handles file uploads cleanly in a modal                            |
| **ConfirmationModal** | Ensures users confirm submission intentionally                     |
| **AdminDashboard**    | Displays all assignments, progress, and student submissions        |
| **StudentDashboard**  | Displays pending/submitted assignments, handles uploads            |

**Design Notes:**

* Minimalistic UI with consistent spacing and shadows.
* Light color palette for clarity and focus.
* Modular structure to scale easily if backend integration is added later.

---

