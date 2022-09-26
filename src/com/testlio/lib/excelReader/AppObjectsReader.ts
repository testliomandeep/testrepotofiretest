import * as xl from 'xlsx';
import AutomationProperties from '../properties/AutomationProperties';
const logger = require('../utils/Logger');
const log = logger(module);

class AppObjectReader {
    Workbook;
    sheetToRead = [];

    readAppObjectsLocators() {

        let appObjsMap: Map<string, string>;

        if (AutomationProperties.isWebExecution()) {
            log.info("Creating MAP for WEB EXECUTION");
            this.Workbook = xl.readFile('AppObjectRepository.xlsx');
            appObjsMap = this.createMapFromPassedColumn(1);
        } else {
            this.Workbook = xl.readFile('AppObjsRepository_mobile.xlsx');
            if (AutomationProperties.isIOSExecution()) {
                appObjsMap = this.createMapFromPassedColumn(2);
            } else {

                appObjsMap = this.createMapFromPassedColumn(1);
            }

        }

        return appObjsMap;
    }

    createMapFromPassedColumn(columnToRead: number): Map<string, string> {

        const appObjsMap = new Map();
        const sheetList = this.Workbook.SheetNames;
        const _this = this;
        sheetList.forEach((sheetItem) => {
            const sheet = _this.Workbook.Sheets[sheetItem];
            const range = xl.utils.decode_range(sheet['!ref']);

            for (let i = range.s.r; i <= range.e.r; i++) {
                if (i > 0) {
                    const elementNameCell = sheet[xl.utils.encode_cell({c: 0, r: i})];
                    const elementLocatorCell = sheet[xl.utils.encode_cell({c: columnToRead, r: i})];
                    const elementKey: string = elementNameCell.v.toString();
                    if (appObjsMap.has(elementKey)) {
                        log.info(`${elementKey} element already exists in map, so not adding it again, please check the app repository excel sheet`);
                    } else {
                        appObjsMap.set(elementKey, elementLocatorCell.v.toString());
                    }

                }

            }
        });
        return appObjsMap;
    }

}

export default new AppObjectReader();