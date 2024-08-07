"use strict";
var AIKit = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // src/main.ts
  var main_exports = {};
  __export(main_exports, {
    default: () => main_default
  });

  // src/const/index.ts
  var COMPLETIONAPI = "https://api.model.box/v1/chat/completions";

  // src/main.ts
  var AIKit = class {
    constructor(options) {
      __publicField(this, "apiKey");
      __publicField(this, "endpoint");
      const { apiKey, endpoint } = options;
      this.apiKey = apiKey;
      this.endpoint = endpoint;
    }
    async getChatCompletion(request) {
      const response = await fetch(this.endpoint || COMPLETIONAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(request)
      });
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
      return response.json();
    }
  };
  var main_default = AIKit;
  return __toCommonJS(main_exports);
})().default;
//# sourceMappingURL=ai-kit.js.map
