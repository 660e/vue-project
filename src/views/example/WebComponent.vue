<script setup lang="ts">
onMounted(() => {
  class WebComponentDemo extends HTMLElement {
    constructor() {
      super();

      const shadow = this.attachShadow({ mode: 'open' });
      const wrapper = document.createElement('div');

      const text = this.getAttribute('text') || '-';

      wrapper.innerHTML = `<div>${text}</div>`;

      shadow.appendChild(wrapper);
    }
  }
  customElements.define('web-component-demo', WebComponentDemo);
});
</script>

<template>
  <div>
    <ExampleComponent1 />
    <ExampleComponent2 />
    <web-component-demo class="text-blue-500" text="Web Component Demo" />
  </div>
</template>
