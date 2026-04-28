const { spawn } = require("child_process");
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Render/Uptime server taake bot 24/7 chalta rahe
app.get('/', (req, res) => {
  res.send('Arhan Bot is Active and Running!');
});

app.listen(port, () => {
  console.log(`Main server listening on port ${port}`);
});

function startBot(message) {
    (message) ? console.log("[ Starting ] " + message) : "";
    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "sweetheart.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (codeExit) => {
        if (codeExit != 0) {
            startBot("Restarting Bot...");
            return;
        } else return;
    });

    child.on("error", function (error) {
        console.log("[ Error ] : " + JSON.stringify(error));
    });
};

startBot();
