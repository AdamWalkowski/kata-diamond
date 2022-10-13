export function getFirstLine(lines: string[]): string {
    return lines[0];
}

export function getCentralLine(lines: string[]): string {
    const centralLineIndex = Math.ceil(lines.length / 2);
    return lines[centralLineIndex];
}

export function getLastLine(lines: string[]): string {
    return lines[lines.length - 1];
}

export function getTopTriangle(lines: string[]): string[] {
    return lines.slice(1, Math.floor(lines.length / 2) + 1);
}

export function getBottomTriangle(lines: string[]): string[] {
    return lines.slice(Math.floor(lines.length / 2), lines.length - 1);
}