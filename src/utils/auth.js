import { getAllUsers } from "../utils/userStorage.js";

export const getLoggedInUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};
export const saveAllUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};
export const addUser = (newUser) => {
    const users = getAllUsers();

    if (users.find((u) => u.email === newUser.email)) {
        return { success: false, message: "Email already registered" };
    }
    users.push(newUser);
    saveAllUsers(users);
    return { success: true, newUser };
};


export const loginUser = (email, password) => {
    const users = getAllUsers()

    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        return { success: true, user };
    }
    return { success: false, message: "Invalid credentials" };
};


export const logoutUser = () => {
    localStorage.removeItem("user");
};




