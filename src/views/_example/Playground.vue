<script setup lang="ts">
import { flattenTree } from '@/utils';

const tree = [
  {
    id: 1,
    name: 'A',
    children: [
      {
        id: 2,
        name: 'B',
        children: [
          { id: 4, name: 'D', children: [] },
          { id: 5, name: 'E' },
        ],
      },
      {
        id: 3,
        name: 'C',
        children: [{ id: 6, name: 'F', children: [] }],
      },
    ],
  },
];
</script>

<template>
  <div>
    <div class="flex">
      <pre class="flex-1/2">{{ tree }}</pre>
      <pre class="flex-1/2">{{ flattenTree(tree) }}</pre>
    </div>
  </div>
</template>
