import Page from "./Page";

class InitPage {
    /**
     * Return Page class object
     * @param page
     * @returns page
     */

    async initPage<T extends Page>(page: T): Promise<T> {
        const instance: T = Object.assign(page);
        await page.isPageLoaded();
        return instance;
    }
}
export default new InitPage();