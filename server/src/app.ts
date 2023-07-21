import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("test");
});

app.listen(4000, () => {
    console.info(`Server listening on port ${4000}`);
});