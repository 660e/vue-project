<script setup lang="ts">
const submit = async () => {
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
  <div class="flex p-4">
    <div class="flex-1/2">
      <button @click="submit" class="rounded px-2 py-1 cursor-pointer bg-neutral-200 hover:opacity-80">Submit</button>
    </div>
    <div class="flex-1/2"></div>
  </div>
</template>
