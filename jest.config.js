module.exports = {
    "testRegex": "((\\.|/*.)(test))\\.js?$",
    "collectCoverage": true,
    "roots": [
        ".",
        "__tests__"
        ],
        "collectCoverageFrom": [
            "**/*.js",
            "!<rootDir>/node_modules/",
            "!<rootDir>/__tests__/coverage/",
            "!<rootDir>/jest.config.js",
            "!<rootDir>/__tests__/coverage/*",
            "!<rootDir>/__tests__/coverage/**/*",
            "!<rootDir>/__tests__/coverage/**/**/*",
            "!<rootDir>/db/*.*"
        ],
        "coverageThreshold": {
        "global": {
            "lines": 80,
            "statements": 80
        }
    }
}