import express from "express";

import router from "./routes";

const app = express();

app.use("/api", router);

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Project: Beats API</title>
            </head>
            <body>
                <h3>Welcome to Project: Beats API</h3>
                <a href="https://github.com/jerryrox/project-beats-api">https://github.com/jerryrox/project-beats-api</a>
            </body>
        </html>
    `);
});

export default app;