const service = require('../../service/xlsx.service');
const XLSX = require('xlsx');
const path = require('path');
const mysqlDumpService = require('../../service/mysqlDump.service');
const model = require('../../models');
const Account = model['Account'];
const excelService = require('../../service/xlsx.service');

require('dotenv').config();
function prepareNewExcelData(existingExcelData, dumpTables) {
    const tablesToUpdate = process.env.TABLE_NAMES.split(',')
        .map(tbl => dumpTables.find(v => v.name.toLowerCase() === tbl.toLowerCase()));
    const dbToExcelData = [];
    const editedExcelData = [].concat(
        ...Object.keys(existingExcelData).map(v => XLSX.utils.sheet_to_json(existingExcelData[v]))
    );
    tablesToUpdate.forEach(tbl => {
        Object.keys(tbl.columns).forEach(key => {
            dbToExcelData.push({
                ObjectType: process.env.SQL_DATABASE,
                ObjectName: `dbo.${tbl.name}`,
                ColumnName: key,
                DataType: tbl.columns[key]['type'],
                Nullable: tbl.columns[key]['nullable'] ? 'NOT NULL' : 'NULL', //TODO: MiscInfo
                Description: null,
                PIC: null
            });
        });
    });
    return dbToExcelData.map(v => {
        let temp = v;
        let cell = editedExcelData.find(xl => xl.ObjectType === temp.ObjectType && xl.ObjectName === temp.ObjectName && xl.ColumnName === temp.ColumnName);
        console.log("cell", cell);

        if (cell) {
            temp.Description = cell.Description;
            temp.PIC = cell.PIC;
        };
        return temp;
    });;
}

describe('test excel services', function () {

    it('test read excel file', function () {
        const filePath = path.join(__dirname, '../../dbDocument.xlsx');
        let excelData;
        return Account.findAll()
            .then(() => {
                console.log("filePath", filePath);

                return service.read(filePath)
            })
            .then(data => {
                console.log("data", data);

                excelData = data;
                return mysqlDumpService.getResult();
            })
            .then(dump => {
                return excelService.write(prepareNewExcelData(excelData, dump.tables));
            })
            .catch(err => {
                return Promise.reject(err);
            });
    })
})
