import NumberFactManager from "../NumberFactManager";
import { describe, it, expect, beforeEach } from "@jest/globals";


describe('NumberFactManager', () => {
    let numberFactManager: NumberFactManager;
    beforeEach(() => {
        numberFactManager = new NumberFactManager();
    })

    describe('getFactCount', () => {
        it('should return 0 as the initial length', () => {
            expect(numberFactManager.getFactCount()).toBe(0);
        })
    })

    describe('fetchAndAddFact', () => {
        it("should add a new fact", async () => {
            await numberFactManager.fetchAndAddFact();
            expect(numberFactManager.getFactCount()).toBe(1);
        })

        it('should throw Maximum number of facts reached', async () => {
            numberFactManager = new NumberFactManager(0);
            expect(async () => await numberFactManager.fetchAndAddFact()).toThrow('Maximum number of facts reached');
        })
    })

    describe('initialize', () => {
        it('should add a new fact if under 30', async () => {
            await numberFactManager.initialize();
            expect(numberFactManager.getFactCount()).toBe(30);
        })
    })

    describe('getRandomFact', () => {
        it('should return a random fact', async () => {
            await numberFactManager.fetchAndAddFact();
            const fact = numberFactManager.getRandomFact();
            expect(fact).toBeDefined();
        })

        it('should return null if no facts', async () => {
            expect(numberFactManager.getRandomFact()).toBeNull();
        })
    })

    describe('findFactsByKeyword', () => {
        it('should return an array of facts', async () => {
            await numberFactManager.fetchAndAddFact();
            const fact = numberFactManager.getRandomFact();

            expect(fact).toBeDefined();
            // @ts-ignore
            const facts = numberFactManager.findFactsByKeyword(fact);
            expect(facts.length).toBe(1);
        })

        it('should return an empty array of facts', async () => {
            await numberFactManager.fetchAndAddFact();
            const fact = numberFactManager.getRandomFact();

            expect(fact).toBeDefined();
            // @ts-ignore
            const facts = numberFactManager.findFactsByKeyword('xxxxxxxxxx');
            expect(facts.length).toBe(0);
        })

    })


    // describe('updateFact', () => {
    //
    // })
    //
    // describe('hasFact', () => {
    //
    // })
})