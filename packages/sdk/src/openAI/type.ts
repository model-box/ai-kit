
export interface ChatCompletionReq {
	model: string;
	messages: { role: string; content: string }[];
	temperature?: number;
	max_tokens?: number;
	top_p?: number;
	frequency_penalty?: number;
	presence_penalty?: number;
	stop?: string[] | string;
}

export interface ChatCompletionRes {
	id: string;
	object: string;
	created: number;
	model: string;
	choices: {
		message: { role: string; content: string };
		finish_reason: string;
		index: number;
	}[];
	usage: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
	};
}

export type Model =
	| 'gpt-4o'
	| 'gpt-4o-2024-08-06'
	| 'gpt-4o-2024-05-13'
	| 'gpt-4o-mini'
	| 'gpt-4o-mini-2024-07-18'
	| 'gpt-4-turbo'
	| 'gpt-4-turbo-2024-04-09'
	| 'gpt-4-0125-preview'
	| 'gpt-4-turbo-preview'
	| 'gpt-4-1106-preview'
	| 'gpt-4-vision-preview'
	| 'gpt-4'
	| 'gpt-4-0314'
	| 'gpt-4-0613'
	| 'gpt-4-32k'
	| 'gpt-4-32k-0314'
	| 'gpt-4-32k-0613'
	| 'gpt-3.5-turbo'
	| 'gpt-3.5-turbo-16k'
	| 'gpt-3.5-turbo-0301'
	| 'gpt-3.5-turbo-0613'
	| 'gpt-3.5-turbo-1106'
	| 'gpt-3.5-turbo-0125'
	| 'gpt-3.5-turbo-16k-0613';