import * as vscode from 'vscode';

const markdownItContainer = require('markdown-it-container');
const emoji = require('markdown-it-emoji');

export function activate(context: vscode.ExtensionContext) {
    console.log('✅ Markdown Enhancer активирован');

    return {
        extendMarkdownIt(md: any) {
            console.log('🔧 extendMarkdownIt вызван');

            md.use(emoji);
            md.use(markdownItContainer, 'alert', {
                validate: () => true,
                render: (tokens: any, idx: number) => {
                    return tokens[idx].nesting === 1
                        ? '<div class="alert">'
                        : '</div>';
                }
            });
            md.use(markdownItContainer, 'spoiler', {
                marker: '?',
                validate: () => true,
                render: (tokens: any, idx: number) => {
                    if (tokens[idx].nesting === 1) {
                        let title = 'Спойлер';
                        const content = tokens[idx].info?.trim() || '';
                        const match = content.match(/spoiler\s+"(.+?)"/);
                        if (match) title = match[1];
                        return `<div class="spoiler"><details><summary>${title}</summary>`;
                    }
                    return '</details></div>';
                }
            });

            return md;
        }
    };
}

export function deactivate() {}