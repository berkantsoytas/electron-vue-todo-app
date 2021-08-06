const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow, addWindow;

app.on("ready", () => {
  // Pencere tanımlanıp Ayarlamaları
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    // frame: false,
  });
  mainWindow.setResizable(false);
  mainWindow.loadURL(
    url.format(
      {
        pathname: path.join(__dirname, "pages/main.html"),
        protocol: "file:",
        slashes: true,
      },
      { unicode: "utf-8" }
    )
  );

  // Eğer Ana sayfa kapatılırsa tüm uygulama kapanacak!
  mainWindow.on("close", () => {
    app.quit();
  });

  // Menünün Oluşturulması
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  // New TODO Penceresinin Eventleri
  ipcMain.on("newTodo:close", (err, data) => {
    addWindow.close();
    addWindow = null;
  });

  ipcMain.on("newTodo:save", (err, todo) => {
    if (todo) {
      // todoList.push();

      mainWindow.webContents.send("todo:addItem", {
        id: new Date().getTime(),
        text: todo,
      });

      addWindow.close();
      addWindow = null;
    }
  });

  ipcMain.on("todo:quit", () => {
    app.quit();
  });
});

const mainMenuTemplate = [
  {
    label: "Dosya",
    submenu: [
      {
        label: "Yeni TODO Ekle",
        accelerator: "Ctrl+N",
        click() {
          createWindow();
        },
      },
      {
        label: "Tüm TODO'ları Sil",
      },
      {
        label: "Çıkış",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        role: "quit",
      },
    ],
  },
];

if (process.platform == "darwin") {
  mainMenuTemplate.unshift({
    label: app.getName(),
    role: "TODO",
  });
}

if (process.env.NODE_ENV != "production") {
  mainMenuTemplate.push({
    label: "Dev Tools",
    submenu: [
      {
        label: "Geliştirici Araçları",
        click(item, focusWindow) {
          focusWindow.toggleDevTools();
        },
      },
      {
        label: "Yenile",
        role: "reload",
      },
    ],
  });
}

function createWindow() {
  addWindow = new BrowserWindow({
    width: 480,
    height: 183,
    title: "Yeni Pencere",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  addWindow.loadURL(
    url.format(
      {
        pathname: path.join(__dirname, "pages/newTodo.html"),
        protocol: "file:",
        slashes: true,
      },
      { unicode: "utf-8" }
    )
  );

  addWindow.setResizable(false);

  addWindow.on("close", () => {
    addWindow = null;
  });
}

function getTodoList() {
  console.log(todoList);
}
