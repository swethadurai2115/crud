const express = require("express");
const users = require("./sample.json");
const cors = require('cors');
const fs = require("fs");

const app = express();
app.use(express.json());
const port = 8000;
app.use(
    cors({
      origin: "http://localhost:3000",
      methods:["GET", "POST", "PATCH", "DELETE"],
    })
);

app.get("/users", (req, res) => {
    return res.json(users);
});

// Delete user detail
app.delete("/users/:id", (req, res) => {
    let id = Number(req.params.id);
    let filteredUsers = users.filter((user) => user.id !== id);
    fs.writeFile("./sample.json", JSON.stringify(filteredUsers), (err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to delete user" });
        }
        return res.json(filteredUsers);
    });
});

// Add new user
app.post("/users", (req, res) => {
    let { name, age, city } = req.body;
    if (!name || !age || !city) {
        return res.status(400).json({ message: "All Fields Required" });
    }
    let id = Date.now();
    users.push({ id, name, age, city });

    fs.writeFile("./sample.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to add user" });
        }
        return res.json({ message: "User detail added successfully" });
    });
});

// Update user
app.patch("/users/:id", (req, res) => {
    let { name, age, city } = req.body;
    if (!name || !age || !city) {
        return res.status(400).json({ message: "All Fields Required" });
    }

    let id = Number(req.params.id);
    let index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users[index] = { ...users[index], ...req.body };
    fs.writeFile("./sample.json", JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to update user" });
        }
        return res.json({ message: "User detail updated successfully" });
    });
});

app.listen(port, (err) => {
    if (err) {
        console.error(`Failed to start server: ${err}`);
    } else {
        console.log(`App is running on port ${port}`);
    }
});
