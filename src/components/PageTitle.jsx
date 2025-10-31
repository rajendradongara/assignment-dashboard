import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitleManager = () => {
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const path = location.pathname;
    console.log(path);

    let title = "TaskTrack";

    if (path === "/") title = "TaskTrack | Home";
    else if (path === "/login") title = "Login | TaskTrack";
    else if (path === "/signup") title = "Signup | TaskTrack";
    else if (path.startsWith("/student"))
      title = "Student Dashboard | TaskTrack";
    else if (path.startsWith("/admin")) title = "Admin Dashboard | TaskTrack";
    else title = "TaskTrack";

    document.title = title;
  }, [location]);

  return null;
};

export default PageTitleManager;
