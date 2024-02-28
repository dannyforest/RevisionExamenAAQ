// NumberFactService.ts

class NumberFactService {
    private baseUrl: string;

    constructor(baseUrl: string = 'http://numbersapi.com') {
        this.baseUrl = baseUrl;
    }

    async getRandomFact(): Promise<string> {
        const url = `${this.baseUrl}/random/trivia?json`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.text; // Adjusted to match the response format of Numbers API
    }
}

export default NumberFactService;