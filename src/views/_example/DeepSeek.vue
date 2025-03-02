<script setup lang="ts">
const completions = ref([]);
const prompt = ref('');

const sendPrompt = async () => {
  if (!prompt.value.trim()) return;

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            content: prompt.value,
            role: 'user',
          },
        ],
        model: 'deepseek-chat',
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      console.log(response.status);
      console.log(response.statusText);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const chunks = buffer.split('\n\n');
      buffer = chunks.pop() || '';

      for (const chunk of chunks) {
        const data = chunk.replace('data: ', '').trim();
        if (data === '[DONE]') return;

        try {
          console.log(JSON.parse(data));
        } catch (error) {
          console.log(error);
        }
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    console.log('finally');
  }
};
</script>

<template>
  <div class="h-screen">
    <div class="h-full flex flex-col justify-center">
      <div v-if="completions.length" class="flex-1 overflow-y-auto bg-yellow-50">
        <div class="p-4 mx-auto w-full lg:w-[800px] bg-red-50">
          <div class="flex justify-end">
            <div class="px-4 py-2 max-w-3/4 rounded-3xl bg-neutral-100">Hello</div>
          </div>
          <div :style="{ height: '2000px' }"></div>
        </div>
      </div>
      <div class="p-4 mx-auto w-full lg:w-[800px]">
        <h1 v-if="completions.length === 0" class="mb-4 text-3xl leading-none text-center">What can I help with?</h1>
        <div class="rounded-3xl p-2 shadow border border-neutral-200">
          <div class="p-2 bg-blue-50">
            <textarea v-model="prompt" class="block outline-0 w-full resize-none bg-green-50" placeholder="Ask anything" rows="1"></textarea>
          </div>
          <div class="flex justify-end">
            <button @click="sendPrompt" class="h-8 w-8 rounded-full cursor-pointer bg-black" type="submit"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
