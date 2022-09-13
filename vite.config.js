export default {
    plugins: [injectorPlugin()]
  }


function injectorPlugin() {
    return {
        name: 'transform-injector',
        configResolved(config) {
            config.plugins = [
                transformPlugin(),
                ...config.plugins
            ]
        }
    }
}

function transformPlugin() {
    return {
        name: 'pre-transformer',
        transform: (content, id) => {
            if (id.match(/\.md$/)) {
                // do stuff here
            }
        }
    }
}