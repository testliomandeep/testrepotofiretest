import * as xl from 'xlsx';

class TestCaseDataReader {
    Workbook = xl.readFile('Suites.xlsx');
    sheetToRead = [];

    readUserName(stringToMatch: string) {

        let usernameMap: Map<string, string>;


        usernameMap = this.createMapFromPassedColumn(4, stringToMatch);

        return usernameMap;
    }

    readPassword(stringToMatch: string) {
        let passwordMap: Map<string, string>;
        passwordMap = this.createMapFromPassedColumn(5, stringToMatch);
        return passwordMap;
    }

    createMapFromPassedColumn(columnToRead: number, stringToMatch: string): Map<string, string> {
        const containerMap: Map<string, string> = new Map<string, string>();
        const sheetList = this.Workbook.SheetNames;
        const _this = this;
        sheetList.forEach((sheetItem) => {
            const sheet = _this.Workbook.Sheets[sheetItem];
            const range = xl.utils.decode_range(sheet['!ref']);

            const keyCell = sheet[xl.utils.encode_cell({c: columnToRead, r: 0})];

            for (let i = range.s.r; i <= range.e.r; i++) {
                if (i > 0) {
                    const nameMatchingCell = sheet[xl.utils.encode_cell({c: 2, r: i})];
                    if (nameMatchingCell.v.toString().endsWith(stringToMatch)) {
                        const valueCell = sheet[xl.utils.encode_cell({c: columnToRead, r: i})];
                        containerMap.set(keyCell.v.toString(), valueCell.v.toString());
                    }
                }
            }
        });
        return containerMap;
    }
}

export default new TestCaseDataReader();