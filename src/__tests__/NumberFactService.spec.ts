import NumberFactService from "../NumberFactService";
import { describe, it, expect } from "@jest/globals";

describe('NumberFactService', () => {
    describe('getRandomFact', () => {
        it('should return a random fact', async () => {
            const numberFactService = new NumberFactService();
            const fact = await numberFactService.getRandomFact();

            expect(fact).toBeDefined();
        })
    })
})