module.exports = {
    modify: (config, { target }) => {
        if (target === 'node') {
            config.output.publicPath = `${process.env.PUBLIC_PATH}`
        }
        return config
    },
    plugins: ['scss'],
}