import {
    config
} from "dotenv";

config();

const {
    PORT,
} = process.env;

const app = require("./app").default;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});