import type { Component } from 'vue';

export const components = import.meta.glob<{ default: Component }>('./**/index.vue', { eager: true });
