const electron = require("electron");
const { ipcRenderer } = electron;

const app = Vue.createApp({
  setup() {
    const todoListMain = Vue.ref([]);
    const mainTodo = Vue.ref();

    function removeTodo(todo) {
      if (confirm("Bu kaydı silmek istediğinizden emin misiniz?")) {
        console.log(todo);
      }
    }

    function addTodo(e) {
      todoListMain.value.push({
        id: new Date().getTime(),
        text: e.target.value,
      });
    }

    ipcRenderer.on("todo:addItem", (err, todoItem) => {
      todoListMain.value.push(todoItem);
    });

    return {
      todoListMain,
      removeTodo,
      addTodo,
    };
  },
});

app.mount("#app");

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
