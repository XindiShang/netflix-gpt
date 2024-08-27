import Groq from 'groq-sdk';

const aiClient = new Groq({
  apiKey: import.meta.env.VITE_GROQAI_API_KEY,
  dangerouslyAllowBrowser: import.meta.env.DEV,
});

export default aiClient;
