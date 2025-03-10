<script setup lang="ts">
import { buildTree, flattenTree, is } from '@/utils';

const objectTree = {
  id: 1,
  name: 'A',
  children: [
    { id: 2, name: 'B', children: [{ id: 3, name: 'C' }] },
    { id: 4, name: 'D' },
  ],
};

const arrayTree = [structuredClone(objectTree)];

const flatData = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B', parentId: 1 },
  { id: 3, name: 'C', parentId: 2 },
  { id: 4, name: 'D', parentId: 1 },
];
</script>

<template>
  <div>
    <div v-if="false">
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
    <div v-if="false" class="flex">
      <pre class="flex-1">{{ objectTree }}</pre>
      <pre class="flex-1">{{ flattenTree(objectTree) }}</pre>
    </div>
    <div v-if="false" class="flex">
      <pre class="flex-1">{{ arrayTree }}</pre>
      <pre class="flex-1">{{ flattenTree(arrayTree) }}</pre>
    </div>
    <div class="flex">
      <pre class="flex-1">{{ flatData }}</pre>
      <pre class="flex-1">{{ buildTree(flatData) }}</pre>
    </div>
  </div>
</template>
