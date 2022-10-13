import 'jest';
import 'jest-expect-message';
import { DiamondDrawer } from '../src/diamond-drawer';
import { getFirstLine, getCentralLine, getLastLine, getTopTriangle } from './utils/strings';

const SPACE = ' ';
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let drawer: DiamondDrawer;

beforeEach(() => {
    drawer = new DiamondDrawer(ALPHABET, SPACE);
});

describe('when empty input', () => {
    test('should return no lines', () => {
        // given
        const drawing = drawer.draw('');

        // then
        expect(drawing).toHaveLength;
        expect(drawing.length).toBe(0);
    });
});

describe('when input with more than one character', () => {
    test('should throw an error', () => {
        expect(() => drawer.draw('ABC')).toThrow('Input should be just one letter');
    });
});

describe('when input is not from given alphabet', () => {
    test('should throw an error', () => {
        expect(() => drawer.draw('!')).toThrow('Input has invalid characters');
    });
});

describe('when valid input', () => {
    test('should accept small letters', () => {
        // given
        const drawing = drawer.draw('e');

        // then
        expect(drawing.length).toBe(9);
    });

    describe('to have proper size', () => {
        test('should draw odd number of lines', () => {
            // given
            const drawing = drawer.draw('C');

            // then
            expect(drawing.length % 2).toBe(1);
        });

        test('should have central line with the length equal to number of lines', () => {
            // given
            const drawing = drawer.draw('D');
            const centralLine = getCentralLine(drawing);

            // then
            expect(centralLine?.length).toBe(drawing.length);
        });
    });

    describe('to contain only valid characters', () => {
        test('the first and the last lines should contain only one the same letter', () => {
            // given
            const drawing = drawer.draw('E');
            const trimmedfirstLine = getFirstLine(drawing).replaceAll(SPACE, '');
            const trimmedlastLine = getLastLine(drawing).replaceAll(SPACE, '');

            // then
            expect(trimmedfirstLine.length).toBe(1);
            expect(trimmedfirstLine.length).toBe(trimmedlastLine.length);
        });

        test('all lines except first and last should contain exactly two letters', () => {
            // given
            const drawing = drawer.draw('F');
            const internalLines = drawing.slice(1, drawing.length - 1);

            // then
            internalLines.forEach((line: string) => {
                const trimmedLine = line.replaceAll(SPACE, '');
                expect(trimmedLine?.length).toBe(2);
            });
        });

        test('each line when trimmed should have positive length', () => {
            // given
            const drawing = drawer.draw('G');

            // then
            drawing.forEach((line: string) => {
                const trimmedLine = line.replaceAll(SPACE, '');
                expect(trimmedLine?.length).toBeGreaterThanOrEqual(1);
            });
        });

        test('each line when trimmed should have the same letter as the first and the last character', () => {
            // given
            const drawing = drawer.draw('H');

            // then
            drawing.forEach((line: string) => {
                const trimmedLine = line.trim();
                const firstCharacter = trimmedLine[0];
                const lastCharacter = trimmedLine[trimmedLine.length - 1];
                expect(firstCharacter).toEqual(lastCharacter);
            });
        });
    });

    describe('to be a diamond shape', () => {
        describe('in top triangle', () => {
            test('in each line the last letter should be 1 position to right comparing to last letter in the previous line', () => {
                // given
                const drawing = drawer.draw('I');
                const topTriangle = getTopTriangle(drawing);
                const positionOfLetterInFirstLine = 8;
                let lastLength = positionOfLetterInFirstLine + 1;

                // then
                topTriangle
                    .map(line => line.trimEnd())
                    .forEach((line, index) => {
                        expect(line.length, `Line #${index + 1} "${line}" is invalid`).toEqual(lastLength + 1);
                        lastLength = line.length;
                    });
            });

            test('in each line the last letter should be increased by 1 position in alphabet comparing to last letter in the previous line', () => {
                // given
                const drawing = drawer.draw('J');
                const topTriangle = getTopTriangle(drawing);
                const positionOfLetterInFirstLine = 9;
                let lastASCII = drawing[0].charCodeAt(positionOfLetterInFirstLine);

                // then
                topTriangle
                    .map(line => line.trimEnd())
                    .forEach((line, index) => {
                        const lastASCIICharacter = line.charCodeAt(line.length - 1);
                        expect(lastASCIICharacter, `Line #${index + 1} "${line}" is invalid`).toEqual(lastASCII + 1);
                        lastASCII = lastASCIICharacter;
                    });
            });
        });

        test('the right triangle should be a mirror of the left triangle', () => {
            // given
            const drawing = drawer.draw('K');

            // then
            drawing.forEach((line: string) => {
                const trimmedLine = line.trim();
                const firstCharacter = trimmedLine[0];
                const lastCharacter = trimmedLine[trimmedLine.length - 1];
                expect(firstCharacter).toEqual(lastCharacter);
            });
        });

        test('the bottom triangle should be a mirror of the top triangle', () => {
            // given
            const drawing = drawer.draw('L');

            // then
            for (let index = 0; index <= Math.floor(drawing.length / 2); ++index) {
                const topLine = drawing[index];
                const bottomLine = drawing[drawing.length - 1 - index];
                const letter = topLine.trim()[0];

                expect(topLine.charAt(topLine.indexOf(letter))).toEqual(bottomLine.charAt(topLine.indexOf(letter)));
                expect(topLine.charAt(topLine.indexOf(letter, Math.floor(topLine.length / 2)))).toEqual(
                    bottomLine.charAt(topLine.indexOf(letter, Math.floor(topLine.length / 2))),
                );
            }
        });
    });
});
