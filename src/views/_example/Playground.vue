<script setup lang="ts">
import { flattenTree, is } from '@/utils';

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
    <div>
      <div>{{ is.array([1, 2, 3]) }} {{ is.array(undefined) }}</div>
      <div>{{ is.author('660e') }} {{ is.author(undefined) }}</div>
      <div>{{ is.bigint(123n) }} {{ is.bigint(undefined) }}</div>
      <div>{{ is.boolean(true) }} {{ is.boolean(undefined) }}</div>
      <div>{{ is.date(new Date()) }} {{ is.date(undefined) }}</div>
      <div>{{ is.function(() => {}) }} {{ is.function(undefined) }}</div>
      <div>{{ is.map(new Map()) }} {{ is.map(undefined) }}</div>
      <div>{{ is.null(null) }} {{ is.null(undefined) }}</div>
      <div>{{ is.number(1) }} {{ is.number(undefined) }}</div>
      <div>{{ is.object({}) }} {{ is.object(undefined) }}</div>
      <div>{{ is.set(new Set()) }} {{ is.set(undefined) }}</div>
      <div>{{ is.string('') }} {{ is.string(undefined) }}</div>
      <div>{{ is.symbol(Symbol()) }} {{ is.symbol(undefined) }}</div>
      <div>{{ is.undefined(undefined) }}</div>
    </div>
    <div class="flex">
      <pre class="flex-1">{{ tree }}</pre>
      <pre class="flex-1">{{ flattenTree(tree) }}</pre>
    </div>
  </div>
</template>
