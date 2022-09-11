import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'en-US',
    title: 'SEU CSE Notes',
    description: 'SEU CSE Notes static site powered by Vite & Vue.',
    markdown: {
        config: md => {
            md.use(require("markdown-it-katex"));
        }
    },
    head: [
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
        ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }]
    ],
})