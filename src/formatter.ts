export class PascalFormatter {
    private indentSize: number = 2;
    private currentIndent: number = 0;

    constructor(indentSize: number = 2) {
        this.indentSize = indentSize;
    }

    public format(code: string): string {
        const lines = code.split('\n');
        let formattedLines: string[] = [];
        let inBlock = false;

        for (let line of lines) {
            line = line.trim();

            // Skip empty lines
            if (line === '') {
                formattedLines.push('');
                continue;
            }

            // Handle block endings
            if (line.toLowerCase().startsWith('end')) {
                this.currentIndent = Math.max(0, this.currentIndent - 1);
                inBlock = false;
            }

            // Add indentation
            const indent = ' '.repeat(this.currentIndent * this.indentSize);
            formattedLines.push(indent + line);

            // Handle block beginnings
            if (line.toLowerCase().startsWith('begin') ||
                line.toLowerCase().startsWith('procedure') ||
                line.toLowerCase().startsWith('function')) {
                this.currentIndent++;
                inBlock = true;
            }
        }

        return formattedLines.join('\n');
    }
} 