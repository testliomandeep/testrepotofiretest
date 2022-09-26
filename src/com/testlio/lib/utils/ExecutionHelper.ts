const logger = require('./Logger');
const log = logger(module);
class ExecutionHelper {
    async sleepInSeconds(time): Promise<unknown> {
        log.info("Wait till " + time + " seconds");
        return new Promise(resolve => setTimeout(resolve, 1000 * time));
    }

    async sleepInMilliSeconds(time) {
        log.info("Wait till " + time + " ms" );
        return new Promise(resolve => setTimeout(resolve, time));
    }
}
export default new ExecutionHelper();