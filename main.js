import { createApp } from "vue";
import App from "./src/App.vue";
import './src/app.css';
import router from './src/router/index';

const app = createApp(App);
app.use(router);
app.mount('#app');