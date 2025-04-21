// wdio.conf.js
const path = require('path')

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',

    //
    // ==================
    // Specify Test Files
    // ==================
    specs: ['../../tests/mobile/specs/**/*.js'],

    // exclude: [
    //     './test/specs/excluded/**/*.js'
    // ],

    //
    // ============
    // Capabilities
    // ============
    capabilities: [
        {
            // Example for an Android emulator
            platformName: 'Android',
            'appium:deviceName': 'emulator-5554',
            'appium:platformVersion': '14.0', // adjust version
            'appium:automationName': 'UiAutomator2',
            'appium:app': path.join(process.cwd(), './apps/Google Chrome.apk'),
            'appium:autoGrantPermissions': true,
            'browserName': 'Chrome'
            // If you want to test an already installed app,
            // you can use "appium:appPackage" and "appium:appActivity"
        },
    ],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },

    //
    // Services
    services: [
        [
            'appium',
            {
                command: 'appium', // or full path to your local appium
                args: {
                    // Can specify Appium server args here if needed
                },
            },
        ],
    ],

    reporters: ['spec'],
}
