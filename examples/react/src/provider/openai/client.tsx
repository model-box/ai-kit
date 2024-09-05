import OpenAI from "openai";

interface AIKitClientConfig {
  provider: string;
  key: string;
  storage?: Storage;
}

export class AIKitClient {
  private openai: OpenAI;

  constructor(config: AIKitClientConfig) {
    this.openai = new OpenAI({
      apiKey: config.key,
      dangerouslyAllowBrowser: true,
    });
  }

  async createChatCompletion(
    messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  ) {
    return this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages as OpenAI.ChatCompletionMessageParam[],
    });
  }
}
