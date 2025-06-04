import { Marked } from 'marked';

export interface ChatMessage {
  content: string;
  role: 'ASSISTANT' | 'USER';
  thinking_content?: string;
}

interface Payload {
  messages: {
    content: string;
    role: 'user';
  }[];
  model: 'deepseek-chat' | 'deepseek-reasoner';
}

export async function streamCompletion(payload: Payload) {
  const controller = new AbortController();

  const response = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...payload, stream: true }),
    signal: controller.signal,
  });

  if (!response.ok || !response.body) {
    console.log(response.status);
    console.log(response.statusText);

    throw new Error();
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  return {
    stream: {
      async *[Symbol.asyncIterator]() {
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
              yield JSON.parse(data);
            } catch (error) {
              console.log(error);
            }
          }
        }
      },
    },
    controller,
  };
}

const marked = new Marked();

export function markdownToHTML(content: string) {
  return marked.parse(content);
}
