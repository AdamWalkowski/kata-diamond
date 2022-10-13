type char = string;

export class DiamondDrawer {
    constructor(public readonly alphabet: string, private readonly _space: string) {}
    
    public draw = (input: string): string[] => {
        if (input === undefined || input === null || input.length === 0) {
            return [];
        }
        if (input.length > 1) {
            throw new Error('Input should be just one letter');
        }
        
        const inputLetter = input.toUpperCase();
        const inputIndex = this.alphabet.indexOf(inputLetter);
        if (inputIndex < 0) {
            throw new Error('Input has invalid characters');
        }

        const lineWidth = 2 * inputIndex + 1;
        const lines: string[] = [];

        // push top triangle
        for (let index = 0; index < inputIndex; index++) {
            const line = this.buildDiamondLine(lineWidth, inputIndex, index);
            lines.push(line);
        }

        // push central line
        const centralLine = this.buildDiamondLine(lineWidth, inputIndex, inputIndex);
        lines.push(centralLine)
        
        // push bottom triangle
        for (let index = inputIndex - 1; index >= 0; index--) {
            const line = this.buildDiamondLine(lineWidth, inputIndex, index);
            lines.push(line);
        }
        
        return lines;
    }

    private buildDiamondLine = (width: number, centerIndex: number, characterIndex: number) => {
        const line: char[] = Array<char>(width).fill(this._space);
        const firstIndex = centerIndex - characterIndex;
        const lastIndex = centerIndex + characterIndex;
        const letter: char = this.alphabet.charAt(characterIndex);
        line[firstIndex] = letter;
        line[lastIndex] = letter;

        return line.join('');
    }
}
