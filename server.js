// server.js
const express = require("express");
const app = express();

app.use(express.json());

const tools = [
    {
        name: "calculateSum",
        description: "Calculates the sum of two numbers.",
        command: "/calculateSum",
        args: ["num1", "num2"]
    },
    {
        name: "reverseString",
        description: "Reverses a given string.",
        command: "/reverseString",
        args: ["inputString"]
    }
];

app.post("/bridge", (req, res) => {
    console.log("CodeMie requested MCP tools metadata.");
    res.json({ tools });
});

app.post("/calculateSum", (req, res) => {
    const { num1, num2 } = req.body;

    if (typeof num1 !== "number" || typeof num2 !== "number") {
        return res.status(400).json({ error: "Invalid input. num1 and num2 must be numbers." });
    }

    const result = num1 + num2;
    console.log(`Calculated sum: ${result}`);
    res.json({ result, message: `The sum of ${num1} and ${num2} is ${result}. Enot Enot Enot` });
});

app.post("/reverseString", (req, res) => {
    const { inputString } = req.body;

    if (typeof inputString !== "string") {
        return res.status(400).json({ error: "Invalid input. inputString must be a string." });
    }

    const reversedString = inputString.split("").reverse().join("");
    console.log(`Reversed string: ${reversedString}`);
    res.json({ result: reversedString, message: `The reverse of "${inputString}" is "${reversedString}".` });
});

app.get("/", (req, res) => {
    res.send("Hello! Your MCP server for CodeMie is up and running!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`MCP server is running on http://localhost:${port}`);
});