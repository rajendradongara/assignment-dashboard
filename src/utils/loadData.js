
export const loadInitialData = async () => {

    const users = localStorage.getItem("users");
    const assignments = localStorage.getItem("assignments");

    if (!users || !assignments) {
        try {
            const res = await fetch("/data.json");
            const data = await res.json();

            localStorage.setItem("users", JSON.stringify(data.users));
            localStorage.setItem("assignments", JSON.stringify(data.assignments));

            console.log("Sample data loaded from data.json");
        } catch (err) {
            console.error("Failed to load data.json", err);
        }
    } else {
        console.log("ℹData already exists in localStorage — skipping load");
    }
};
