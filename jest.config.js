module.exports = {
    testEnvironment: "node",
    verbose: true,
    globalSetup: "./test/config/setup.js",
    globalTeardown: "./test/config/teardrown.js",
    testEnvironment: "./test/config/databaseEnvironment.js",
    transform: {
        "^.+\\.js$": "babel-jest"
    }
};
