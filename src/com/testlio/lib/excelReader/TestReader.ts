import * as xl from 'xlsx';
import AutomationProperties from "../properties/AutomationProperties";
const logger = require('../utils/Logger');
const log = logger(module);

class TestListReader {

    map = new Map();
    projectList = [];
    Workbook = xl.readFile('Suites.xlsx');
    sheetToRead = [];

    getTestList(): Map<string, string> {
        const testList = [];

        const sheet = this.Workbook.Sheets.Project;
        const range = xl.utils.decode_range(sheet['!ref']);
        log.info(`Range: ${range.e.r}`);

        for (let i = range.s.r; i <= range.e.r; i++) {
            if (i > 0) {
                const cell = sheet[xl.utils.encode_cell({c: 1, r: i})];
                log.info('Project Name: ' + cell.v.toString());

                const runModeCell = sheet[xl.utils.encode_cell({c: 2, r: i})];
                const platformCell = sheet[xl.utils.encode_cell({c: 3, r: i})];

                if (runModeCell.v.toLowerCase() === 'run') {
                    if (AutomationProperties.isWebExecution()) {
                        log.info("Execution is set to WEB, so selecting only WEB tests");

                        if (platformCell.v.toLowerCase() === "web") {
                            this.projectList.push(cell.v.toString());
                        }
                    } else {
                        log.info("Execution is set to MOBILE, so selecting only MOBILE tests");
                        if (platformCell.v.toLowerCase() === "mobile") {
                            this.projectList.push(cell.v.toString());
                        }
                    }

                }
            }
        }

        this.projectList.forEach((value, index) => {
            log.info(`The value : ${value}, and index : ${index} in project list`);
        });

        const sheetList = this.Workbook.SheetNames;

        const _this = this;

        this.projectList.forEach((item, index) => {
            sheetList.forEach((sheetItem, sheetIndex) => {
                if (item === sheetItem) {
                    _this.sheetToRead.push(item);
                }
            });
        });

        this.sheetToRead.forEach((value, index) => {
            log.info(`The value : ${value}, and index : ${index} in sheetToRead`);
        });

        this.sheetToRead.forEach((item, index) => {
            const currentSheet = _this.Workbook.Sheets[item];
            const currentRange = xl.utils.decode_range(currentSheet['!ref']);

            for (let i = currentRange.s.r; i <= currentRange.e.r; i++) {
                if (i > 0) {
                    const testNameCell = currentSheet[xl.utils.encode_cell({c: 2, r: i})];
                    const suiteDescriptionCell = currentSheet[xl.utils.encode_cell({c: 1, r: i})];
                    const runFlagCell = currentSheet[xl.utils.encode_cell({c: 3, r: i})];

                    if (runFlagCell.v.toLowerCase() === 'run') {
                        // testList.push(testNameCell.v.toString());
                        _this.map.set(suiteDescriptionCell.v.toString(), testNameCell.v.toString());
                    }
                }

            }
        });
        return this.map;
    }
}

export default new TestListReader();
