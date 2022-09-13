const fs = require('fs')
import { defineConfig } from 'vitepress'
import viteConfig from '../../vite.config'

export default defineConfig({
    base: process.env.BASE_URL ?? '/',
    lang: 'en-US',
    title: 'SEU CSE Notes',
    description: 'SEU CSE Notes static site powered by Vite & Vue.',
    markdown: {
        config: md => {
            md.use(require("markdown-it-katex"))
        }
    },
    head: [
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
        ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }]
    ],
    themeConfig: {
        editLink: {
            pattern: 'https://github.com/HazzazBinFaiz/seu-cse-notes/edit/main/notes/:path',
            text: 'Edit this page on GitHub'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/HazzazBinFaiz/seu-cse-notes' }
        ],
        footer: {
            message: 'Made with ❤️ by students of SEU',
            copyright: 'Copyright © 2022 faculties and students of SEU'
        },
        sidebar: sidebar(),
    },
    vite: viteConfig
})


function dailyNoteScanner(path) {
    return fs.readdirSync('notes/'+path)
        .filter(file =>
            file.endsWith('.md')
            && !['index.md', 'README.md'].includes(file)
            && file.match(/\d{4}_\d{2}_\d{2}/)
        ).map(file => {
            return {
                text: file.match(/\d{4}_\d{2}_\d{2}/)[0].replaceAll('_', '-'),
                link: '/'+path+'/'+file.replace('.md', '')
            }
        })
}

function sidebar() {
    return {
        '/ECO461.5/': [
            {
                text: 'ECO461.5',
                items: [
                    { text: 'Table Of Content', link: '/ECO461.5/' },
                ]
            },
            {
                text: 'Exam questions',
                items: [
                    { text: 'Mid term', link : '/ECO461.5/_exam_mid.md'}
                ]
            },
            {
                text: 'Daily Notes',
                items: dailyNoteScanner('ECO461.5')
            }
        ],
        '/STA281.3/': [
            {
                text: 'STA281.3',
                items: [
                    { text: 'Course Outline', link: '/STA281.3/' },
                ]
            },
            {
                text: 'Daily Notes',
                items: dailyNoteScanner('STA281.3')
            }
        ]
    }
}