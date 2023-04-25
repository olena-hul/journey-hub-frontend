import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import "./styles/index.scss";
import { defaultConfig, plugin } from "@formkit/vue";
import router from "@/router";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const app = createApp(App);

// register globally
app.component("VueDatePicker", VueDatePicker);
app.use(createPinia());
app.use(plugin, defaultConfig);
app.use(router);

app.mount("#app");
