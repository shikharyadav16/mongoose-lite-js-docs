const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.resolve("public")))

app.get("/", (req, res) => {
    return res.sendFile("index.html")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is listening at PORT:", PORT);
})