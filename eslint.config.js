import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

export default defineConfigWithVueTs(pluginVue.configs['flat/recommended'], vueTsConfigs.recommended, {
  rules: {
    // https://typescript-eslint.io/rules/

    // https://eslint.vuejs.org/rules/
    'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'always' } }],
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': 'off',
  },
});
