import { COMPLETIONAPI } from "./const";
import { ChatCompletionReq, ChatCompletionRes } from "./openAI/type";
export interface AIKitOptions {
  apiKey: string;
  endpoint?: string;
}

class AIKit {
  private apiKey: string;
  protected endpoint?: string;

  constructor(options: AIKitOptions) {
    const { apiKey, endpoint } = options;
    this.apiKey = apiKey;
    this.endpoint = endpoint;
  }

  public async getChatCompletion(request: ChatCompletionReq): Promise<ChatCompletionRes> {

    const response = await fetch(this.endpoint || COMPLETIONAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

}
export { ChatCompletionReq, ChatCompletionRes };

export default AIKit;
