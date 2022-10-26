const { Stream } = require("stream");

fileSystem = require("fs");

path = require("path");

cmdTwainCmd = "C:\\CmdTwain\\CmdTwain.exe";

cmdTwainPreviewOpts = "/PAPER=A4 /RGB /DPI=30 /JPG25";

cmdTwainTmpDir = "C:\\temp";

appEnv = process.env.NODE_ENV;

module.exports = {
  preview: function (req, res) {
    if (appEnv === "production") {
      tmpFileName =
        "preview_" +
        new Date()
          .toISOString()
          .replace("T", "_")
          .replace(/[:,-]/g, "")
          .substr(0, 15) +
        ".jpg";
      tmpFilePath = path.join(cmdTwainTmpDir, tmpFileName);
      child_process = require("child_process");
      child_process.execSync(
        cmdTwainCmd + " " + cmdTwainPreviewOpts + " " + tmpFilePath
      );
    } else {
      tmpFilePath = "vendor/test_image.jpg";
    }
    stat = fileSystem.statSync(tmpFilePath);
    res.writeHead(200, {
      "Content-Type": "image/jpg",
      "Content-Length": stat.size,
    });
    readStream = fileSystem.createReadStream(tmpFilePath);
    return util.pump(readStream, res);
  },
  scan: function (req, res, opt) {
    child_process = require("child_process");
    if (opt) {
      tmpFileName =
        "scan_" +
        new Date()
          .toISOString()
          .replace("T", "_")
          .replace(/[:,-]/g, "")
          .substr(0, 15) +
        ".pdf";
      tmpFilePath = path.join(cmdTwainTmpDir, tmpFileName);
      child_process.execSync(
        cmdTwainCmd + " " + `-c "A4 300 COLOR" PDF` + " " + tmpFilePath
      );
    } else {
      tmpFileName =
        "scan_" +
        new Date()
          .toISOString()
          .replace("T", "_")
          .replace(/[:,-]/g, "")
          .substr(0, 15) +
        ".jpg";
      tmpFilePath = path.join(cmdTwainTmpDir, tmpFileName);
      child_process.execSync(cmdTwainCmd + " " + tmpFilePath);
    }
    // stat = fileSystem.statSync(tmpFilePath);
    return tmpFilePath;
  },
};
