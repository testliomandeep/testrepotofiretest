import appObjectsReader from "../excelReader/AppObjectsReader";
export default class AppObjsMap {
    static appObjs: Map<string, string> = appObjectsReader.readAppObjectsLocators();
}