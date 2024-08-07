
class FetchClient {
	private baseUrl: string;
	private headers: Record<string, string>;

	constructor(baseUrl: string, headers: Record<string, string> = {}) {
		this.baseUrl = baseUrl;
		this.headers = headers;
	}

	public setHeader(key: string, value: string): void {
		this.headers[key] = value;
	}

	buildHeaders(): Record<string, string> {
		// TODO:
		if (!this.headers) {
			return {};
		}
		return {
			...this.headers,
		};
	}


	public async post<T>(endpoint: string, body: any): Promise<T> {
		const url = `${this.baseUrl}${endpoint}`;

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...this.headers,
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error(`API request failed: ${response.status} ${response.statusText}`);
		}

		return response.json();
	}
}

export { FetchClient };
