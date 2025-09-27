const express = require("express");
const app = express();

app.use(express.json());

// Tools metadata (exposed to CodeMie via /bridge)
const tools = [
    {
        name: "calculateSum",
        description: "Calculates the sum of two numbers.",
        command: "/calculateSum",
        args: ["num1", "num2"],
        inputSchema: {
            type: "object",
            properties: {
                num1: { type: "number" },
                num2: { type: "number" }
            },
            required: ["num1", "num2"]
        }
    },
    {
        name: "reverseString",
        description: "Reverses a given string.",
        command: "/reverseString",
        args: ["inputString"],
        inputSchema: {
            type: "object",
            properties: {
                inputString: { type: "string" }
            },
            required: ["inputString"]
        }
    },
    {
        name: "sayHello",
        description: "Returns a constant greeting message.",
        command: "/sayHello",
        args: [],
        inputSchema: {
            type: "object",
            properties: {},
            required: []
        }
    }
];

// Handler for /bridge endpoint
app.post("/bridge", (req, res) => {
    console.log("CodeMie is requesting MCP tools metadata.");
    res.json({ tools });
});

// Handler for calculateSum
app.post("/calculateSum", (req, res) => {
    console.log(`calculateSum function called`);

    const { num1, num2 } = req.body;

    // Validate inputs
    if (typeof num1 !== "number" || typeof num2 !== "number") {
        console.log(`Invalid input for calculateSum!`);
        return res.status(400).json({
            content: {
                error: "Invalid input. num1 and num2 must be numbers."
            }
        });
    }

    const result = num1 + num2;
    console.log(`Calculated sum: ${result}`);
    res.json({
        content: {
            result,
            message: `The sum of ${num1} and ${num2} is ${result}.`
        }
    });
});

// Handler for reverseString
app.post("/reverseString", (req, res) => {
    console.log(`reverseString function called`);

    const { inputString } = req.body;

    // Validate input
    if (typeof inputString !== "string") {
        console.log(`Invalid input for reverseString!`);
        return res.status(400).json({
            content: {
                error: "Invalid input. inputString must be a string."
            }
        });
    }

    const reversedString = inputString.split("").reverse().join("");
    console.log(`Reversed string: ${reversedString}`);

    // Return response with reversed string
    res.json({
        content: {
            result: reversedString,
            message: `The reversed string is: ${reversedString}`
        }
    });
});

// Handler for sayHello
app.post("/sayHello", (req, res) => {
    console.log("sayHello function called");

    // Return a structured response matching MCPToolInvocationResponse schema
    res.json({
        content: {
            message: "Hello, World!",
            note: "This is the response from sayHello tool."
        }
    });
});

// Default fallback handler for unsupported requests
app.use((req, res) => {
    console.log(`Fallback handler triggered for unmatched route: ${req.originalUrl}`);
    res.status(404).json({
        content: {
            error: "Requested route is not defined in the MCP server.",
            note: "Check your request or consult the MCP server documentation for valid routes."
        }
    });
});

// Endpoint for root (to confirm the server is live)
app.get("/", (req, res) => {
    res.send("Hello! Your MCP server for CodeMie is up and running!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`MCP server is running on http://localhost:${port}`);
});