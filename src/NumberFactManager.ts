import NumberFactService from './NumberFactService';

class NumberFactManager {
    private facts: string[];
    private factService: NumberFactService;
    private maxFacts: number;

    constructor(maxFacts: number = 100) {
        this.facts = [];
        this.factService = new NumberFactService();
        this.maxFacts = maxFacts;
    }

    async initialize(): Promise<void> {
        while (this.facts.length < 30) {
            await this.fetchAndAddFact();
        }
    }

    async fetchAndAddFact(): Promise<void> {
        if (this.facts.length >= this.maxFacts) {
            throw new Error('Maximum number of facts reached');
        }

        const fact = await this.factService.getRandomFact();
        if (!this.facts.includes(fact)) {
            this.facts.push(fact);
        }
    }

    getFactCount(): number {
        return this.facts.length;
    }

    findFactsByKeyword(keyword: string): string[] {
        return this.facts.filter(fact => fact.toLowerCase().includes(keyword.toLowerCase()));
    }

    getRandomFact(): string | null {
        if (this.facts.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * this.facts.length);
        return this.facts[randomIndex];
    }

    updateFact(index: number, newFact: string): void {
        if (index < 0 || index >= this.facts.length) {
            throw new Error('Index out of bounds');
        }
        this.facts[index] = newFact;
    }

    hasFact(fact: string): boolean {
        return this.facts.includes(fact);
    }
}

export default NumberFactManager;