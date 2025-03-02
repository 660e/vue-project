<script setup lang="ts">
const sendPrompt = async () => {
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
            content: 'Hello',
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
    <div class="h-full flex flex-col justify-center mx-auto w-full lg:w-[800px]">
      <div class="hidden flex-1"></div>
      <div class="p-4">
        <h1 class="text-3xl leading-none text-center">What can I help with?</h1>
        <div class="rounded-3xl p-2 shadow border border-neutral-200">
          <form>
            <textarea class="w-full bg-red-500/20" placeholder="Ask anything"></textarea>
            <div class="flex">
              <div class="flex-1"></div>
              <button @click="sendPrompt" class="h-8 w-8 rounded-full bg-black"></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
