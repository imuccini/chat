module.exports = function (options) {
    return {
        ...options,
        resolve: {
            ...options.resolve,
            extensionAlias: {
                '.js': ['.ts', '.js'],
            },
            extensions: ['.ts', '.js', '.json'],
        },
    };
};
