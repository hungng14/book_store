/* eslint-disable class-methods-use-this */
const chalk = require('chalk');

const { log } = console;

class Utils {
    logError(message) {
        log(chalk.red(message));
    }

    logWarning(message) {
        log(chalk.yellowBright(message));
    }

    logSuccess(message) {
        log(chalk.greenBright(message));
    }

    logInfo(message) {
        log(chalk.rgb(113, 173, 221)(message));
    }
}
module.exports = new Utils();
