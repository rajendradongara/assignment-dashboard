import { getAllUsers as users } from "../utils/userStorage.js";

export const loginUser = (email, password) => {
    const user = users.find(
        (u) => u.email === email && u.password === password
    );
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        return { success: true, user };
    }
    return { success: false, message: "Invalid credentials" };
};

export const getLoggedInUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
    localStorage.removeItem("user");
};
