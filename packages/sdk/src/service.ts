import { ENDPOINT } from "./const";

class ChatService {
  async createMessage(options: any) {
    const payload = this._builtPayload(options);

    return this.getCompletion({ ...params, tools });
  }

  async getCompletion(options?: any) {
    const { signal } = options ?? {};

    const headers = {
      "Content-Type": "application/json", // TODO:
    };
    return fetch(ENDPOINT, {
      body: JSON.stringify(payload),
      fetcher: fetcher,
      headers,
      signal,
    });
  }

  private _processMessages(options?: any) {}

  private _builtPayload(options?: any) {}
}

export const chatService = new ChatService();
