<script setup lang="ts">
import { streamCompletion } from '@/utils';

interface ChatMessage {
  content: string;
  inserted_at: number;
  role: 'ASSISTANT' | 'USER';
  thinking_content?: string;
}

const chatMessages = ref<ChatMessage[]>([]);
const prompt = ref('');

const sendPrompt = async () => {
  if (!prompt.value.trim()) return;

  const assistantMessage = ref<ChatMessage>({ content: '', inserted_at: 0, role: 'ASSISTANT' });
  chatMessages.value.push({ content: prompt.value, inserted_at: new Date().getTime() / 1000, role: 'USER' });
  chatMessages.value.push(assistantMessage.value);

  const stream = await streamCompletion({
    messages: [{ content: prompt.value, role: 'user' }],
    model: 'deepseek-chat',
  });

  for await (const chunk of stream) {
    assistantMessage.value.content += chunk.choices[0]?.delta.content || '';
    assistantMessage.value.inserted_at = chunk.created;
  }
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
      <div v-if="chatMessages.length" class="flex-1 overflow-y-auto bg-yellow-50">
        <div class="p-4 mx-auto w-full lg:w-[800px] bg-red-50">
          <template v-for="chatMessage in chatMessages" :key="chatMessage.inserted_at">
            <div v-if="chatMessage.role === 'USER'" class="flex justify-end">
              <div class="px-4 py-2 max-w-3/4 rounded-3xl bg-blue-100">Hello</div>
            </div>
            <div v-if="chatMessage.role === 'ASSISTANT'">
              <pre>{{ chatMessage }}</pre>
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
              :rows="textareaRows"
              class="block outline-0 w-full resize-none"
              placeholder="Message DeepSeek"
              ref="textareaRef"
            ></textarea>
          </div>
          <div class="pt-3 flex">
            <button class="h-8 px-2 rounded-full text-xs cursor-pointer border border-neutral-200">DeepThink</button>
            <div class="flex-1"></div>
            <button @click="sendPrompt" class="h-8 w-8 rounded-full cursor-pointer bg-black"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
