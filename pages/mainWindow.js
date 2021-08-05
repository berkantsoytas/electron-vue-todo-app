const electron = require("electron");
const { ipcRenderer } = electron;

/* const app = Vue.createApp({
  data() {
    return {
      todoListMain: [],
    };
  },
  created() {
    ipcRenderer.on("todo:addItem", (err, todoItem) => {
      this.todoListMain.push(todoItem);
      console.log(this.todoListMain);
    });
  },
  methods: {
    removeItem(todo) {
      if (confirm("Bu kaydı silmek istediğinizden emin misiniz?")) {
      }
    },
  },
}).mount("#app"); */

const app = Vue.createApp({
  setup() {
    const todoListMain = Vue.ref([]);

    function removeItem(todo) {
      if (confirm("Bu kaydı silmek istediğinizden emin misiniz?")) {
        // Todo
      }
    }

    ipcRenderer.on("todo:addItem", (err, todoItem) => {
      todoListMain.value.push(todoItem);
    });

    return {
      todoListMain,
      removeItem,
    };
  },
}).mount("#app");
