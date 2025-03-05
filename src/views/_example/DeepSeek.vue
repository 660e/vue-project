<script setup lang="ts">
import { streamCompletion, markdownToHTML } from '@/utils';
import type { IChatMessage } from '@/utils';

const prompt = ref('');
const chatMessages = ref<IChatMessage[]>([]);
const isLoading = ref(false);
const abortController = ref<AbortController>();

const sendPrompt = async () => {
  if (!prompt.value.trim() || isLoading.value) return;

  try {
    isLoading.value = true;
    abortController.value = new AbortController();

    const assistantMessage = ref<IChatMessage>({ content: '', role: 'ASSISTANT' });
    chatMessages.value.push({ content: prompt.value, role: 'USER' });
    chatMessages.value.push(assistantMessage.value);

    const stream = await streamCompletion(
      {
        messages: [{ content: prompt.value, role: 'user' }],
        model: 'deepseek-chat',
      },
      abortController.value.signal,
    );

    for await (const chunk of stream) {
      assistantMessage.value.content += chunk.choices[0]?.delta.content || '';
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const cancelStream = () => {
  abortController.value?.abort();
};

const textareaRef = ref();
const textareaRows = ref(2);
watch(prompt, async () => {
  textareaRows.value = 2;

  await nextTick();
  const computedStyle = window.getComputedStyle(textareaRef.value);
  textareaRows.value = Math.min(textareaRef.value.scrollHeight / parseInt(computedStyle.lineHeight), 10);
});
</script>

<template>
  <div class="h-screen text-base">
    <div class="h-full flex flex-col justify-center">
      <div v-if="chatMessages.length" class="flex-1 overflow-y-auto">
        <div class="p-4 space-y-4 mx-auto w-full lg:w-[800px] bg-yellow-50">
          <template v-for="(chatMessage, index) in chatMessages" :key="index">
            <div v-if="chatMessage.role === 'USER'" class="flex justify-end">
              <div class="px-4 py-2 max-w-3/4 rounded-3xl bg-blue-100">{{ chatMessage.content }}</div>
            </div>
            <div v-else-if="chatMessage.role === 'ASSISTANT'" class="bg-red-50">
              <div v-html="markdownToHTML(chatMessage.content)"></div>
            </div>
          </template>
          <div :style="{ height: '2000px' }"></div>
        </div>
      </div>
      <div class="p-4 mx-auto w-full lg:w-[800px]">
        <h1 v-if="chatMessages.length === 0" class="mb-4 text-3xl leading-none text-center">How can I help you today?</h1>
        <div class="rounded-3xl p-3 border border-neutral-200">
          <div class="px-1">
            <textarea
              v-model="prompt"
              :disabled="isLoading"
              :rows="textareaRows"
              class="block outline-0 w-full resize-none"
              placeholder="Message DeepSeek"
              ref="textareaRef"
            ></textarea>
          </div>
          <div class="pt-3 flex">
            <button class="h-8 px-2 rounded-full text-xs cursor-pointer border border-neutral-200">DeepThink</button>
            <div class="flex-1"></div>
            <button v-if="isLoading" @click="cancelStream" class="h-8 w-8 rounded-full cursor-pointer bg-red-500"></button>
            <button v-else @click="sendPrompt" class="h-8 w-8 rounded-full cursor-pointer bg-black"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
