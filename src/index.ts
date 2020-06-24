import Environment from "./utils/Environment";

const port = Environment.getPort();

const app = require("./app").default; // eslint-disable-line
app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});