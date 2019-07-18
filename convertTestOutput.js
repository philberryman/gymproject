const fs = require("fs");

fs.watchFile("testOutput.json", (curr, prev) => {
  let rawdata = fs.readFileSync("testOutput.json");
  let testOutput = JSON.parse(rawdata);
  let touchBarString =
    "Tests:" + testOutput.numPassedTests + ":" + testOutput.numTotalTests + " ";
  fs.writeFile("touchBar.txt", touchBarString, err => {
    if (err) console.log(err);
    console.log("Touchbar.txt file has been updated to :" + touchBarString);
  });
});
