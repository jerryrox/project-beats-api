import express from "express";
import bodyParser from "body-parser";

import ErrorResponse from './responses/ErrorResponse';
import AuthRoute from './routes/AuthRoute';

const app = express();

app.use("/api/:provider/auth", AuthRoute);
app.use(bodyParser.json());

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

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => { // eslint-disable-line
    if (err) {
        res.status(500).json(new ErrorResponse(err));
    }
});

export default app;