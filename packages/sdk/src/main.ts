import { AIKitOptions, GeneratorTextOptions } from "./type";

class AIKit {
  private _log: any;
  private _APIKEY: string;

  constructor(options: AIKitOptions) {
    const { apiKey } = options;
    this._APIKEY = apiKey;
  }

  async generatorText(options: GeneratorTextOptions) {}

  destroy() {}
}
export default AIKit;
