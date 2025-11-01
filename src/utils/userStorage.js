import { defaultUsers } from "../data/users.js";


export const getAllUsers = () => {
    const users = JSON.parse(localStorage.getItem("users"));
    return users || defaultUsers;
};


export const getAllStudents = () => {
    const users = getAllUsers()
    const students = users.filter((a) => a.role === "student")
    return students
}