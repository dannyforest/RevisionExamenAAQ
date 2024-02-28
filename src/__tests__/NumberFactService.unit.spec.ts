import fetchMock from "jest-fetch-mock";
import {expect, describe, it, beforeEach} from "@jest/globals";
import NumberFactService from "../NumberFactService";

fetchMock.enableMocks();

describe('NumberFactService', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    describe('getRandomFact', () => {
        it('should return a random fact', async () => {
            fetchMock.mockResponseOnce(JSON.stringify(
                {
                    "text": 'this is a random fact'
                }
            ));

            const numberFactService = new NumberFactService();
            const fact = await numberFactService.getRandomFact();

            expect(fact).toBe('this is a random fact');
        })
    })
})