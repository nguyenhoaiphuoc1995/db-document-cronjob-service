require('dotenv').config();
const service = require('../../service/xlsx.service');
const path = require('path');
const mysqlDumpService = require('../../service/mysqlDump.service');
const excelService = require('../../service/xlsx.service');
require('../../models');
describe('test excel services', function () {
    it('test read excel file', function () {
        const filePath = path.join(__dirname, '../../dbDocument.xlsx');
        let excelData;
        return service.read(filePath)
            .then(data => {
                excelData = data;
                return mysqlDumpService.getResult();
            })
            .then(dump => {
                return excelService.write(excelService.prepareNewExcelData(excelData, dump.tables, process.env.TABLE_NAMES));
            })
            .catch(err => {
                return Promise.reject(err);
            });
    })
})
