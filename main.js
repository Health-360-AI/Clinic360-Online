#!/usr/bin/env node
"use strict";
// Import parts of electron to use
const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog,
  Notification,
  clipboard,
  Tray,
  shell,
  MenuItem,
} = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const url = require("url");
const { download } = require("electron-dl");
const auth = require("./auth");
const keytar = require("keytar");
const checkInternetConnected = require("check-internet-connected");
const log = require("electron-log");
const fs = require("fs");
const mv = require("mv");
const { get } = require("axios");
const axios = require("axios");
const appEnv = require("./env.json");
const apiUrl = appEnv.API_URL;
let child_process = require("child_process");
var unzipper = require("unzipper");
const { print, getDefaultPrinter, getPrinters } = require("pdf-to-printer");
const archiver = require("archiver");
var async = require("async");
const ProgressBar = require("electron-progressbar");
var rimraf = require("rimraf");
let LOCALAPPDATA =
  process.platform !== "darwin"
    ? process.env.LOCALAPPDATA
    : path.join(process.env.HOME, "Library", "Application Support");
let Resources =
  process.platform !== "darwin"
    ? "resources/"
    : "/Applications/clinic360.app/Contents/Resources/";
let CLINIC360_IN_LOCAL = path.join(LOCALAPPDATA, "./clinic360");
let DATABASE_IN_RESOURCES = path.join(Resources, "./db.sqlite3");
let DATABASE_IN_LOCAL = path.join(LOCALAPPDATA, "./clinic360/db.sqlite3");
let WHATSNEW_IN_RESOURCES = path.join(Resources, "./WhatsNew.json");
let WHATSNEW_IN_LOCAL = path.join(LOCALAPPDATA, "./clinic360/WhatsNew.json");
let SETTINGS_IN_RESOURCES = path.join(Resources, "./Settings.json");
let SETTINGS_IN_LOCAL = path.join(LOCALAPPDATA, "./clinic360/Settings.json");
let CHARTDATA_IN_RESOURCES = path.join(Resources, "./chart-data");
let CHARTDATA_IN_LOCAL = path.join(LOCALAPPDATA, "./clinic360/chart-data");
// let BERT_IN_APP = "Bioclinical_Bert.zip";
// let BERT_IN_LOCAL = path.join(LOCALAPPDATA, "./clinic360/bert/main");
let Settings;
if (process.env.NODE_ENV == "development") {
  Settings = "./Settings.json";
} else {
  Settings = SETTINGS_IN_LOCAL;
}
// const { createAuthWindow, createLogoutWindow } = require("./main/auth-process");
// const authService = require("./services/auth-service");
// Setup file logging
console.log = log.log;
log.transports.file.level = "info";
log.catchErrors();
log.transports.file.file = "log.log";
// var mammoth = require("mammoth");

//----------------------------Section 1-----------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
autoUpdater.autoDownload = true;
log.info("App starting...");

const config = {
  timeout: 2000, //timeout connecting to each try (default 5000)
  // retries: 3,//number of retries to do before failing (default 5)
  domain: "www.google.com", //the domain to check DNS record of
};

function alert(title, body) {
  new Notification({ title, body }).show();
}

async function getToken() {
  try {
    const token = await auth.getToken();
    alert("getToken success", `See console`);
    console.info("Token:", token);
    return token;
  } catch (e) {
    alert("getToken failed", `See stdout. Error was "${e}"`);
    console.error(e);
  }
}

async function isLoggedIn() {
  try {
    const logged = await auth.isLoggedIn();
    if (logged) {
      alert("Logged in", `See console`);
      console.info("Logged:", logged);
    } else {
      alert("Not Logged in", `See console`);
      console.info("Logged:", logged);
    }
    return logged;
  } catch (e) {
    alert("Logged failed", `See stdout. Error was "${e}"`);
    console.error(e);
  }
}

async function logout() {
  try {
    await auth.logout();
    alert("logout success", "You should now be logged out");
  } catch (e) {
    alert(`logout fail. See stdout. Error was "${e}"`);
  }
}

//--------------------------Section 2--------------------------------

let backend =
  process.platform !== "darwin"
    ? path.join(process.cwd(), "resources/py_main/main")
    : "/Applications/clinic360.app/Contents/Resources/py_main/main";
let VC_CPP =
  process.platform !== "darwin"
    ? path.join(process.cwd(), "resources/VC_redist.x64.exe")
    : "/Applications/clinic360.app/Contents/Resources/VC_redist.x64.exe";
var execfile = require("child_process").execFile;
// let pid2;
let pid = execfile(
  backend,
  {
    windowsHide: true,
    stdio: "inherit",
  },
  (err, stdout, stderr) => {
    if (err) {
      console.log(err);
    }
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(stderr);
    }
  }
);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, AuthWindow, loginWindow;

// Keep a reference for dev mode
let dev = false;

// Broken:
// if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
//   dev = true
// }

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === "development"
) {
  dev = true;
}

// Temporary fix broken high-dpi scale factor on Windows (125% scaling)
// info: https://github.com/electron/electron/issues/9691
if (process.platform === "win32") {
  app.commandLine.appendSwitch("high-dpi-support", "true");
  app.commandLine.appendSwitch("force-device-scale-factor", "1");
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    // minWidth: 1280,
    // minHeight: 720,
    show: false,
    fullscreenable: true,
    webPreferences: {
      // devTools: false,
      nodeIntegration: true,
      contextIsolation: false,
      spellcheck: true,
    },
    autoHideMenuBar: true,
  });

  fs.access(DATABASE_IN_LOCAL, fs.F_OK, (err) => {
    if (err) {
      fs.access(DATABASE_IN_RESOURCES, fs.F_OK, (err) => {
        if (err) {
          console.error(err.message);
          return;
        }

        if (!fs.existsSync(CLINIC360_IN_LOCAL)) {
          fs.mkdirSync(CLINIC360_IN_LOCAL);
        }

        fs.copyFile(DATABASE_IN_RESOURCES, DATABASE_IN_LOCAL, function (err) {
          // done. it tried fs.rename first, and then falls back to
          // piping the source file to the dest file and then unlinking
          // the source file.

          if (err) return console.error(err);
          console.log("Copied success!");
        });
      });
    }
  });
  fs.access(SETTINGS_IN_LOCAL, fs.F_OK, (err) => {
    if (err) {
      fs.access(SETTINGS_IN_RESOURCES, fs.F_OK, (err) => {
        if (err) {
          console.error(err.message);
          return;
        }

        if (!fs.existsSync(CLINIC360_IN_LOCAL)) {
          fs.mkdirSync(CLINIC360_IN_LOCAL);
        }

        fs.copyFile(SETTINGS_IN_RESOURCES, SETTINGS_IN_LOCAL, function (err) {
          // done. it tried fs.rename first, and then falls back to
          // piping the source file to the dest file and then unlinking
          // the source file.

          if (err) return console.error(err);
          console.log("Copied success!");
        });
      });
    }
  });
  fs.access(CHARTDATA_IN_LOCAL, fs.F_OK, (err) => {
    if (err) {
      fs.access(CHARTDATA_IN_RESOURCES, fs.F_OK, (err) => {
        if (err) {
          console.error(err.message);
          return;
        }

        if (!fs.existsSync(CLINIC360_IN_LOCAL)) {
          fs.mkdirSync(CLINIC360_IN_LOCAL);
        }

        fs.copyFile(CHARTDATA_IN_RESOURCES, CHARTDATA_IN_LOCAL, function (err) {
          // done. it tried fs.rename first, and then falls back to
          // piping the source file to the dest file and then unlinking
          // the source file.

          if (err) return console.error(err);
          console.log("Copied success!");
        });
      });
    }
  });
  fs.access(WHATSNEW_IN_LOCAL, fs.F_OK, (err) => {
    if (err) {
      fs.access(WHATSNEW_IN_RESOURCES, fs.F_OK, (err) => {
        if (err) {
          console.error(err.message);
          return;
        }

        if (!fs.existsSync(CLINIC360_IN_LOCAL)) {
          fs.mkdirSync(CLINIC360_IN_LOCAL);
        }

        fs.copyFile(WHATSNEW_IN_RESOURCES, WHATSNEW_IN_LOCAL, function (err) {
          // done. it tried fs.rename first, and then falls back to
          // piping the source file to the dest file and then unlinking
          // the source file.

          if (err) return console.error(err);
          console.log("Copied success!");
        });
      });
    } else {
      console.log(1);
      fs.access(WHATSNEW_IN_RESOURCES, fs.F_OK, (err) => {
        if (err) {
          console.error(err.message);
          return;
        }
        fs.unlink(WHATSNEW_IN_LOCAL, (err) => {
          if (err) console.error(err.message);
          console.log("WhatsNew.json was deleted");
        });

        if (!fs.existsSync(CLINIC360_IN_LOCAL)) {
          fs.mkdirSync(CLINIC360_IN_LOCAL);
        }

        fs.copyFile(WHATSNEW_IN_RESOURCES, WHATSNEW_IN_LOCAL, function (err) {
          // done. it tried fs.rename first, and then falls back to
          // piping the source file to the dest file and then unlinking
          // the source file.

          if (err) return console.error(err);
          console.log("Copied success!");
        });
      });
    }
  });
  if (process.platform !== "darwin") {
    if (!fs.existsSync("C:\\temp")) {
      fs.mkdirSync("C:\\temp");
    }
  }
  // Handle IPC messages from the renderer process.
  // ipcMain.handle("auth:get-profile", authService.getProfile);
  // ipcMain.on("auth:log-out", () => {
  //   BrowserWindow.getAllWindows().forEach((window) => window.close());
  //   createLogoutWindow();
  // });
  let indexPath, whatsNewPath;
  if (dev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true,
    });
    whatsNewPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      hash: `#whats-new`,
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      slashes: true,
    });
    whatsNewPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "dist", "index.html"),
      hash: `#whats-new`,
      slashes: true,
    });
    // trigger autoupdate check
    autoUpdater.checkForUpdatesAndNotify();
    setInterval(() => {
      autoUpdater.checkForUpdatesAndNotify();
    }, 1000 * 60 * 60);
  }
  mainWindow.loadURL(indexPath);

  mainWindow.on("ready-to-show", async () => {
    // if (dev) {
    //   const {
    //     default: installExtension,
    //     REACT_DEVELOPER_TOOLS,
    //   } = require("electron-devtools-installer");
    //   installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
    //     console.log("Error loading React DevTools: ", err)
    //   );
    // }
    mainWindow.show();
    mainWindow.maximize();
    if (fs.existsSync(SETTINGS_IN_LOCAL)) {
      if (
        JSON.parse(fs.readFileSync(Settings, "utf8")).runTime == 0 ||
        JSON.parse(fs.readFileSync(Settings, "utf8")).runTime == undefined
      ) {
        execfile(
          VC_CPP,
          {
            windowsHide: true,
            stdio: "inherit",
          },
          (err, stdout, stderr) => {
            if (err) {
              console.log(err);
            }
            if (stdout) {
              console.log(stdout);
            }
            if (stderr) {
              console.log(stderr);
            }
          }
        );
        let win = new BrowserWindow({
          icon: "./logo.ico",
          width: 900,
          height: 500,
          autoHideMenuBar: true,
          webPreferences: {
            // devTools: false,
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
          },
        });
        win.loadURL(whatsNewPath);
        win.focus();
        win.on("close", function () {
          win = null;
        });
      }
      let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
      content.runTime += 1;
      //write file
      fs.writeFileSync(Settings, JSON.stringify(content));
      // if (JSON.parse(fs.readFileSync(Settings, "utf8")).runTime < 6) {
      //   const win = BrowserWindow.getFocusedWindow();
      //   await dialog
      //     .showMessageBox(win, { message: "Please Rechoose your printer" })
      //     .then(function (response) {
      //       console.log(response);
      //     });
      // }

      // pid2 = execfile(
      //   BERT_IN_LOCAL,
      //   {
      //     windowsHide: true,
      //   },
      //   (err, stdout, stderr) => {
      //     if (err) {
      //       console.log(err);
      //     }
      //     if (stdout) {
      //       console.log(stdout);
      //     }
      //     if (stderr) {
      //       console.log(stderr);
      //     }
      //   }
      // );
    }
    if (
      JSON.parse(fs.readFileSync(Settings, "utf8")).bMarginDrug == undefined
    ) {
      let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
      content.bMarginDrug = 0;
      //write file
      fs.writeFileSync(Settings, JSON.stringify(content));
    }
    if (JSON.parse(fs.readFileSync(Settings, "utf8")).nutrition == undefined) {
      let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
      content.nutrition = 0;
      content.reportOnStart = 0;
      content.reportPageSize = "A4";
      //write file
      fs.writeFileSync(Settings, JSON.stringify(content));
    }
    if (
      JSON.parse(fs.readFileSync(Settings, "utf8")).A4TopMargin == undefined
    ) {
      let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
      content.A4TopMargin = "0mm";
      //write file
      fs.writeFileSync(Settings, JSON.stringify(content));
    }
    if (JSON.parse(fs.readFileSync(Settings, "utf8")).landscape == undefined) {
      let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
      content.gynecological = 0;
      content.landscape = 0;
      content.bert = 0;
      content.rightMargin = "0";
      content.leftMargin = "0";
      //write file
      fs.writeFileSync(Settings, JSON.stringify(content));
    }
    if (JSON.parse(fs.readFileSync(Settings, "utf8")).scanType == undefined) {
      let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
      content.scanType = 0;
      //write file
      fs.writeFileSync(Settings, JSON.stringify(content));
    }
  });
  mainWindow.webContents.on("context-menu", (event, params) => {
    const menu = new Menu();

    // Add each spelling suggestion
    for (const suggestion of params.dictionarySuggestions) {
      menu.append(
        new MenuItem({
          label: suggestion,
          click: () => mainWindow.webContents.replaceMisspelling(suggestion),
        })
      );
    }

    // Allow users to add the misspelled word to the dictionary
    if (params.misspelledWord) {
      menu.append(
        new MenuItem({
          label: "Add to dictionary",
          click: () =>
            mainWindow.webContents.session.addWordToSpellCheckerDictionary(
              params.misspelledWord
            ),
        })
      );
    }
    if (menu.items.length != 0) {
      menu.popup();
    }
  });
  mainWindow.on("closed", function () {
    mainWindow = null;
    AuthWindow = null;

    get(`${apiUrl}/shutdown`)
      .then(() => {
        console.log("ended");
        app.quit();
      })
      .catch((e) => {
        console.log(e);
        app.quit();
      });
  });
}

ipcMain.on("download-button", (event, info) => {
  const win = BrowserWindow.getFocusedWindow();
  download(win, info, { saveAs: true })
    .then((dl) => console.log("Finished Download"))
    .catch((error) => console.log(error.message));
});

ipcMain.on("handleSignUpWithGoogle", async (event, info) => {
  checkInternetConnected(config)
    .then(async () => {
      console.log("Connection available");
      let token = await getToken();
      mainWindow.webContents.send("register-token-received", token, info);
      get(`${apiUrl}/db`)
        .then((d) => {
          console.log(d.data.success);
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((err) => {
      console.log("No connection", err.message);
      mainWindow.webContents.send("offline-login");
    });
});
ipcMain.on("handleSignInWithGoogle", async (event, info) => {
  checkInternetConnected(config)
    .then(async () => {
      console.log("Connection available");
      let token = await getToken();
      mainWindow.webContents.send("login-token-received", token, info);
      get(`${apiUrl}/db`)
        .then((d) => {
          console.log(d.data.success);
        })
        .catch((e) => {
          console.log(e);
        });
    })
    .catch((err) => {
      console.log("No connection", err.message);
      mainWindow.webContents.send("offline-login");
    });
});

ipcMain.on("logout", async (event, info) => {
  checkInternetConnected(config)
    .then(async () => {
      console.log("Connection available");
      await logout();
    })
    .catch((err) => {
      console.log("No connection", err.message);
    });
});

ipcMain.on("image-view", async (event, info, index, type) => {
  let win = new BrowserWindow({ icon: "./logo.ico" });
  win.loadFile(info);
  win.on("close", async function () {
    let res = await dialog.showMessageBox({
      buttons: ["No", "Yes"],
      message: "Do you want to save ?",
    });
    console.log(res);
    console.log(type);
    event.sender.send("scan-response", res.response, info, index, type);
    win = null;
  });
});

ipcMain.on("image-view-single", async (event, info, dataToSend) => {
  let win = new BrowserWindow({ icon: "./logo.ico" });
  win.loadFile(info);
  win.on("close", async function () {
    let res = await dialog.showMessageBox({
      buttons: ["No", "Yes"],
      message: "Do you want to save ?",
    });
    console.log(res);
    event.sender.send("scan-response", res.response, dataToSend, info);
    win = null;
  });
});

ipcMain.on("image-view-url", async (event, info) => {
  let win = new BrowserWindow({ icon: "./logo.ico" });
  win.loadURL(info);
  win.on("close", function () {
    win = null;
  });
});

// const auth0Link = `https://googleapis.com/oauth2/v1/tokeninfo?access_token=`;

// ipcMain.on

// ipcMain.on("download-next-word", async (event, info) => {
//   const win = BrowserWindow.getFocusedWindow();
//   const download = async () => {
//     let totalLength;
//     let totalLengthInMB;
//     let progressBar = new ProgressBar({
//       indeterminate: false,
//       text: "Downloading AI Next Word Predictor",
//       detail: "Please Wait...",
//       browserWindow: { parent: win, closable: true },
//       abortOnError: true,
//     });
//     progressBar
//       .on("completed", function () {
//         console.info(`completed...`);
//         let progressBar2 = new ProgressBar({
//           indeterminate: false,
//           text: "Saving AI Next Word Predictor",
//           detail: "Please Wait...",
//           browserWindow: { parent: win, closable: true },
//           abortOnError: true,
//         });
//         progressBar2
//           .on("completed", function () {
//             console.info(`completed...`);
//             let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
//             content.bert = 1;
//             //write file
//             fs.writeFileSync(Settings, JSON.stringify(content));

//             pid2 = execfile(
//               BERT_IN_LOCAL,
//               {
//                 windowsHide: true,
//               },
//               (err, stdout, stderr) => {
//                 if (err) {
//                   console.log(err);
//                 }
//                 if (stdout) {
//                   console.log(stdout);
//                 }
//                 if (stderr) {
//                   console.log(stderr);
//                 }
//               }
//             );
//             event.sender.send("change-bert");
//             progressBar2.detail = "Task completed. Exiting...";
//           })
//           .on("aborted", function () {
//             console.info(`aborted...`);
//           })
//           .on("progress", function (value) {
//             progressBar2.detail = `Value ${value} out of ${
//               progressBar2.getOptions().maxValue
//             }...`;
//           });
//         let { size } = fs.statSync(BERT_IN_APP);
//         let written2 = 0;
//         fs.createReadStream(BERT_IN_APP)
//           .on("data", (data) => {
//             written2 += data.length;
//             if (progressBar2.isInProgress()) {
//               progressBar2.value = Number(((written2 / size) * 100).toFixed(2));
//             }
//           })
//           .pipe(unzipper.Extract({ path: LOCALAPPDATA + "/clinic360" }));

//         progressBar.detail = "Task completed. Exiting...";
//       })
//       .on("aborted", function () {
//         console.info(`aborted...`);
//       })
//       .on("progress", function (value) {
//         progressBar.detail = `Value %${value} out of %${
//           progressBar.getOptions().maxValue
//         } \nTotal Size is: ${totalLengthInMB.toFixed(2)}MB`;
//       });
//     try {
//       get(`http://localhost:8050/shutdown`)
//         .then(() => {
//           console.log("ended");
//           process.kill(pid2.pid, "SIGINT");
//         })
//         .catch((e) => {
//           console.log(e);
//         });
//       await axios({
//         url: "https://github.com/Health-360-AI/ClinicalBERT360/releases/latest/download/Bioclinical_Bert.zip",
//         method: "GET",
//         responseType: "stream",
//       }).then(({ data, headers }) => {
//         totalLength = headers["content-length"];
//         totalLengthInMB = totalLength / 1024 / 1024;
//         const writer = fs.createWriteStream("Bioclinical_Bert.zip");
//         // let { size } = fs.statSync(res);
//         let written = 0;

//         data.on("data", (chunk) => {
//           // progressBar.tick(chunk.length)
//           // console.log("% complted", chunk.length * 100);

//           written += chunk.length;
//           console.log(((written / totalLength) * 100).toFixed(2));
//           if (progressBar.isInProgress()) {
//             progressBar.value = Number(
//               ((written / totalLength) * 100).toFixed(2)
//             );
//           }
//         });
//         data.pipe(writer);
//       });
//     } catch (err) {
//       console.log(err);
//       // progressBar.close();
//     }
//   };
//   download();
// });
ipcMain.on("choose-path", async (event) => {
  const win = BrowserWindow.getFocusedWindow();
  let res;
  let today = new Date();

  let date = today.toISOString().slice(0, 10);

  let time = today.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  let dateTime = date + "-" + time.split(":")[0] + "," + time.split(":")[1];
  await dialog
    .showSaveDialog(win, {
      properties: ["promptToCreate"],
      defaultPath: dateTime,
    })
    .then(function (response) {
      if (!response.canceled) {
        // handle fully qualified file name
        res = response.filePath;
      } else {
        console.log("no file selected");
      }
    });
  console.log(res);
  if (res) {
    directorySize(LOCALAPPDATA + "/clinic360", (err, totalSize) => {
      let progressBar = new ProgressBar({
        indeterminate: false,
        text: "Saving Backup",
        detail: "Please Wait...",
        browserWindow: { parent: win, closable: true },
        abortOnError: true,
      });
      progressBar
        .on("completed", function () {
          console.info(`completed...`);
          progressBar.detail = "Task completed. Exiting...";
        })
        .on("aborted", function () {
          console.info(`aborted...`);
        })
        .on("progress", function (value) {
          progressBar.detail = `Value ${value} out of ${
            progressBar.getOptions().maxValue
          }...`;
        });
      const output = fs.createWriteStream(res);
      const archive = archiver("zip", {
        zlib: { level: 9 }, // Sets the compression level.
      });

      // listen for all archive data to be written
      // 'close' event is fired only when a file descriptor is involved
      output.on("close", function () {
        console.log(archive.pointer() + " total bytes");
        console.log(
          "archiver has been finalized and the output file descriptor has closed."
        );
      });

      // This event is fired when the data source is drained no matter what was the data source.
      // It is not part of this library but rather from the NodeJS Stream API.
      // @see: https://nodejs.org/api/stream.html#stream_event_end
      output.on("end", function () {
        console.log("Data has been drained");
      });

      // good practice to catch warnings (ie stat failures and other non-blocking errors)
      archive.on("warning", function (err) {
        if (err.code === "ENOENT") {
          // log warning
        } else {
          // throw error
          throw err;
        }
      });

      // good practice to catch this error explicitly
      archive.on("error", function (err) {
        throw err;
      });
      archive.on("progress", (progressData) => {
        // console.log(progressData.fs.processedBytes);
        console.log(
          ((progressData.fs.processedBytes / totalSize) * 100).toFixed(2)
        );
        progressBar.value = Number(
          ((progressData.fs.processedBytes / totalSize) * 100).toFixed(2)
        );
      });

      // pipe archive data to the file
      archive.pipe(output);

      // append files from a sub-directory and naming it `new-subdir` within the archive
      archive.directory(LOCALAPPDATA + "/clinic360", false);

      // finalize the archive (ie we are done appending files but streams have to finish yet)
      // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
      archive.finalize();
    });
  }
});

/**
 * You can use a nodejs module to do this, this function is really straightforward and will fail on error
 * Note that when computing a directory size you may want to skip some errors (like ENOENT)
 * That said, this is for demonstration purpose and may not suit a production environnment
 */
function directorySize(path, cb, size) {
  if (size === undefined) {
    size = 0;
  }

  fs.stat(path, function (err, stat) {
    if (err) {
      cb(err);
      return;
    }

    size += stat.size;

    if (!stat.isDirectory()) {
      cb(null, size);
      return;
    }

    fs.readdir(path, function (err, paths) {
      if (err) {
        cb(err);
        return;
      }

      async.map(
        paths.map(function (p) {
          return path + "/" + p;
        }),
        directorySize,
        function (err, sizes) {
          size += sizes.reduce(function (a, b) {
            return a + b;
          }, 0);
          cb(err, size);
        }
      );
    });
  });
}

ipcMain.on("choose-retrival-path", async (event) => {
  const win = BrowserWindow.getFocusedWindow();
  let res;
  await dialog
    .showOpenDialog(win, { properties: ["openFile"] })
    .then(function (response) {
      if (!response.canceled) {
        // handle fully qualified file name
        res = response.filePaths[0];
      } else {
        console.log("no file selected");
      }
    });
  console.log(res);
  if (res) {
    // get(`http://localhost:8050/shutdown`)
    //   .then(() => {
    //     console.log("ended");
    //     process.kill(pid2.pid, "SIGINT");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    get(`${apiUrl}/shutdown`)
      .then(() => {
        console.log("ended");
        setTimeout(() => {
          if (pid.pid) {
            process.kill(pid.pid, "SIGINT");
          }
          let progressBar = new ProgressBar({
            indeterminate: false,
            text: "Retreiving Backup",
            detail: "Please Wait...",
            browserWindow: { parent: win, closable: true },
            abortOnError: true,
          });
          progressBar
            .on("completed", function () {
              console.info(`completed...`);
              progressBar.detail = "Task completed. Exiting...";
            })
            .on("aborted", function () {
              console.info(`aborted...`);
            })
            .on("progress", function (value) {
              progressBar.detail = `Value ${value} out of ${
                progressBar.getOptions().maxValue
              }...`;
            });
          rimraf.sync(LOCALAPPDATA + "/clinic360/*");
          // get total size of the file
          let { size } = fs.statSync(res);
          let written = 0;
          fs.createReadStream(res)
            .on("data", (data) => {
              written += data.length;
              progressBar.value = Number(((written / size) * 100).toFixed(2));
            })
            .pipe(unzipper.Extract({ path: LOCALAPPDATA + "/clinic360" }));

          pid = execfile(
            backend,
            {
              windowsHide: true,
            },
            (err, stdout, stderr) => {
              if (err) {
                console.log(err);
              }
              if (stdout) {
                console.log(stdout);
              }
              if (stderr) {
                console.log(stderr);
              }
            }
          );
          console.log(11);
        }, 5000);
      })
      .catch((e) => {
        console.log(e);
        let progressBar = new ProgressBar({
          indeterminate: false,
          text: "Retreiving Backup",
          detail: "Please Wait...",
          browserWindow: { parent: win, closable: true },
          abortOnError: true,
        });
        progressBar
          .on("completed", function () {
            console.info(`completed...`);
            progressBar.detail = "Task completed. Exiting...";
          })
          .on("aborted", function () {
            console.info(`aborted...`);
          })
          .on("progress", function (value) {
            progressBar.detail = `Value ${value} out of ${
              progressBar.getOptions().maxValue
            }...`;
          });
        rimraf.sync(LOCALAPPDATA + "/clinic360/*");
        let { size } = fs.statSync(res);
        let written = 0;
        fs.createReadStream(res)
          .on("data", (data) => {
            written += data.length;
            progressBar.value = Number(((written / size) * 100).toFixed(2));
          })
          .pipe(unzipper.Extract({ path: LOCALAPPDATA + "/clinic360" }));

        pid = execfile(
          backend,
          {
            windowsHide: true,
          },
          (err, stdout, stderr) => {
            if (err) {
              console.log(err);
            }
            if (stdout) {
              console.log(stdout);
            }
            if (stderr) {
              console.log(stderr);
            }
          }
        );
      });
  }
});

async function getFilesizeInMegaBytes(filename) {
  var fileSizeInBytes = fs.statSync(filename).size;
  console.log(fileSizeInBytes);
  console.log(fileSizeInBytes / (1024 * 1000));
  return fileSizeInBytes / (1024 * 1000);
}

ipcMain.on("handle-recovery", async (event, info) => {
  get(`${apiUrl}/shutdown`)
    .then(() => {
      console.log("ended");
      setTimeout(() => {
        pid = execfile(
          backend,
          {
            windowsHide: true,
          },
          (err, stdout, stderr) => {
            if (err) {
              console.log(err);
            }
            if (stdout) {
              console.log(stdout);
            }
            if (stderr) {
              console.log(stderr);
            }
          }
        );
        event.sender.send("get-recovery", info);
      }, 1000);
    })
    .catch((e) => {
      console.log(e);
      pid = execfile(
        backend,
        {
          windowsHide: true,
        },
        (err, stdout, stderr) => {
          if (err) {
            console.log(err);
          }
          if (stdout) {
            console.log(stdout);
          }
          if (stderr) {
            console.log(stderr);
          }
        }
      );
      event.sender.send("get-recovery", info);
    });
});

ipcMain.on("get-word", async (event, info) => {
  mammoth
    .convertToHtml({ path: "html-to-docx.docx" })
    .then(function (result) {
      var html = result.value; // The generated HTML
      var messages = result.messages; // Any messages, such as warnings during conversion
      console.log(html);
    })
    .done();
});

ipcMain.on("printComponent", async (event, url, pageSize) => {
  let win = new BrowserWindow({ show: false });
  win.loadURL(url);
  win.webContents.on("did-finish-load", async () => {
    let printerSettings = JSON.parse(fs.readFileSync(Settings, "utf8"));
    if (process.platform == "darwin") {
      let pp = await win.webContents.getPrintersAsync();
      let printOptions = {
        silent: true,
        deviceName:
          printerSettings.printer == ""
            ? pp.filter((printer) => printer.isDefault)[0].name
            : printerSettings.printer,
        pageSize: pageSize,
        printBackground: true,
        color: true,
        margin: {
          marginType: "printableArea",
        },
        landscape: false,
        pagesPerSheet: 1,
        collate: false,
        copies: 1,
        header: "Page header",
        footer: "Page footer",
      };
      win.webContents.print(printOptions, (success, failureReason) => {
        if (!success) console.log(failureReason);
        console.log("Print Initiated");
      });
    } else if (printerSettings.landscape) {
      let pp = await win.webContents.getPrintersAsync();
      let printOptions = {
        silent: true,
        deviceName:
          printerSettings.printer == ""
            ? pp.filter((printer) => printer.isDefault)[0].name
            : printerSettings.printer,
        pageSize: pageSize,
        printBackground: true,
        color: true,
        margin: {
          marginType: "printableArea",
        },
        landscape: true,
        pagesPerSheet: 1,
        collate: false,
        copies: 1,
        header: "Page header",
        footer: "Page footer",
      };
      win.webContents.print(printOptions, (success, failureReason) => {
        if (!success) console.log(failureReason);
        console.log("Print Initiated");
      });
    } else {
      let printOptions = {
        silent: false,
        deviceName: printerSettings.printer,
        pageSize: pageSize,
        printBackground: true,
        color: true,
        marginsType: 0,
        landscape: false,
        pagesPerSheet: 1,
        collate: false,
        copies: 1,
        header: "Page header",
        footer: "Page footer",
      };
      win.webContents
        .printToPDF(printOptions, async (error, data) => {
          if (error) throw error;
        })
        .then(async (data) => {
          fs.writeFileSync("pdfPath.pdf", data, { encoding: "utf8" }, (err) => {
            if (err) throw err;
            console.log("PDF success!");
          });
          print("pdfPath.pdf", {
            paperSize: pageSize,
            printer:
              printerSettings.printer == ""
                ? (await getDefaultPrinter()).deviceId
                : printerSettings.printer,
          }).then(() => console.log("Success"));
        });
      console.log("Print Initiated in Main...");
      console.log(await getDefaultPrinter());
    }
  });
  return "shown print dialog";
});

ipcMain.on("check-for-updates", (event) => {
  autoUpdater
    .checkForUpdates()
    .then((res) =>
      event.sender.send("get-latest-version", res.updateInfo.version)
    )
    .catch((err) =>
      event.sender.send("get-latest-version", "Check your connection")
    );
});

ipcMain.on("get-printers", async (event, info) => {
  let printers;
  let printerSettings = JSON.parse(fs.readFileSync(Settings, "utf8"));
  if (process.platform == "darwin") {
    printers = await mainWindow.webContents.getPrintersAsync();
    printers.map((printer) => {
      printer["deviceId"] = printer.name;
      printer["name"] = printer.displayName;
    });
  } else if (printerSettings.landscape) {
    printers = await mainWindow.webContents.getPrintersAsync();
    printers.map((printer) => {
      printer["deviceId"] = printer.name;
      printer["name"] = printer.displayName;
    });
  } else {
    printers = await getPrinters();
  }
  console.log(printers);
  mainWindow.webContents.send("send-printers", printers);
});

ipcMain.on("get-profile", async (event, info) => {
  const win = BrowserWindow.getFocusedWindow();
  console.log(await keytar.getPassword("iclinic", "refresh-token"));
  checkInternetConnected(config)
    .then(async () => {
      console.log("Connection available");
      if (await isLoggedIn()) {
      } else {
        await getToken();
      }
    })
    .catch((err) => {
      console.log("No connection", err);
    });
  // await isLoggedIn();

  // keytar.deletePassword("iclinic", os.userInfo().username);
  // await logout();
  // const profile = await getToken();
  // console.log(profile);

  // authService.logout();
  // win.close();
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    // get(`http://localhost:8050/shutdown`)
    //   .then(() => {
    //     console.log("ended");
    //     process.kill(pid2.pid, "SIGINT");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    get(`${apiUrl}/shutdown`)
      .then(() => {
        console.log("ended");
        process.kill(pid.pid, "SIGINT");
        app.quit();
      })
      .catch((e) => {
        console.log(e);
        process.kill(pid.pid, "SIGINT");
        app.quit();
      });
  }
});
app.disableHardwareAcceleration();
app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

//-------------------------------------------------------------------
// Auto updates
//-------------------------------------------------------------------
const sendStatusToWindow = (text) => {
  log.info(text);
  if (mainWindow) {
    mainWindow.webContents.send("message", text);
  }
};

if (dev && process.argv.indexOf("--noDevServer") === -1) {
} else {
  autoUpdater.on("checking-for-update", () => {
    sendStatusToWindow("Checking for update...");
  });
  autoUpdater.on("update-available", (info) => {
    sendStatusToWindow("Update available.");
  });
  autoUpdater.on("update-not-available", (info) => {
    sendStatusToWindow("Update not available.");
  });
  autoUpdater.on("error", (err) => {
    sendStatusToWindow(`Error in auto-updater: ${err.toString()}`);
  });
  autoUpdater.on("download-progress", (progressObj) => {
    sendStatusToWindow(
      `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
    );
  });
  autoUpdater.on("update-downloaded", (info) => {
    sendStatusToWindow("Update downloaded; will install now");
  });

  autoUpdater.on("update-downloaded", async (info) => {
    // Wait 5 seconds, then quit and install
    // In your application, you don't need to wait 500 ms.
    // You could call autoUpdater.quitAndInstall(); immediately
    let content = JSON.parse(fs.readFileSync(Settings, "utf8"));
    content.runTime = 0;
    //write file
    fs.writeFileSync(Settings, JSON.stringify(content));
    let win = BrowserWindow.getFocusedWindow();
    let response = await dialog.showMessageBox(win, {
      buttons: ["No", "Yes"],
      message:
        "Update Downloaded. It will be installed on restart\nRestart now?",
    });
    if (response.response == 1) {
      // get(`http://localhost:8050/shutdown`)
      //   .then(() => {
      //     console.log("ended");
      //     process.kill(pid2.pid, "SIGINT");
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
      get(`${apiUrl}/shutdown`)
        .then(() => {
          console.log("ended");
          process.kill(pid.pid, "SIGINT");
          autoUpdater.quitAndInstall();
        })
        .catch((e) => {
          console.log(e);
          autoUpdater.quitAndInstall();
        });
    }
  });
}
