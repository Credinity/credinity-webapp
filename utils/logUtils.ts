import { Logger } from "aws-amplify";

export default function writeLog(msg: string) {
    process.env.NODE_ENV === "development" ? console.log(msg) : "";
}

class CredLogger {
    logger: Logger;
    constructor(logName: string) {
        this.logger = new Logger(logName);
    }

    log(...msg: any[]) {
        console.log(...msg);
        this.logger.info(...msg);
    }

    debug(...msg: any[]) {
        console.debug(...msg);
        this.logger.debug(...msg);
    }

    info(...msg: any[]) {
        console.info(...msg);
        this.logger.info(...msg);
    }

    warn(...msg: any[]) {
        console.warn(...msg);
        this.logger.warn(...msg);
    }

    error(...msg: any[]) {
        console.error(...msg);
        this.logger.error(...msg);
    }
}

export { CredLogger };
