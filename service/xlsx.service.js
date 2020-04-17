const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

exports.prepareNewExcelData = (existingExcelData, dumpTables, tableNames) => {
    const tablesToUpdate = tableNames.split(',')
        .map(tbl => dumpTables.find(dumpTable => dumpTable.name.toLowerCase() === tbl.toLowerCase()));
    const dbToExcelData = [];
    const editedExcelData = [].concat(
        ...Object.keys(existingExcelData).map(key => XLSX.utils.sheet_to_json(existingExcelData[key]))
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

    return dbToExcelData.map(data => {
        const temp = data;
        const cell = editedExcelData.find(xl => xl.ObjectType === temp.ObjectType && xl.ObjectName === temp.ObjectName && xl.ColumnName === temp.ColumnName);

        if (cell) {
            temp.Description = cell.Description;
            temp.PIC = cell.PIC;
        };

        return temp;
    });;
}

exports.read = async (path) => {
    let returnedData = {};

    if (fs.existsSync(path)) {
        returnedData = await XLSX.readFile(path).Sheets
    }

    return returnedData;
};

exports.write = (sheetData, sheetName = 'Data', bookType = '.xlsx') => {
    const wb = XLSX.utils.book_new();
    wb.SheetNames.push(`${sheetName}`);
    wb.Sheets[`${sheetName}`] = XLSX.utils.json_to_sheet(sheetData);
    return XLSX.writeFile(wb, path.join(__dirname, `../${process.env.FILE_NAME}${bookType}`));
}