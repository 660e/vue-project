import './styles/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { components } from '@/components';

const app = createApp(App);

app.use(createPinia());
app.use(router);

Object.values(components).forEach((component) => {
  if (component.default.name) {
    app.component(component.default.name, component.default);
  }
});

app.mount('#app');
