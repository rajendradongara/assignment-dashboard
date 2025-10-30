import { defaultUsers } from "../data/users.js";

export const getAllUsers = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    return users || defaultUsers;
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
    return { success: true };
};
