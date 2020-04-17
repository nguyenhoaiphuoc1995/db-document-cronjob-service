const XLSX = require('xlsx');
const path = require('path');

exports.read = (path) => {
    return XLSX.readFile(path).Sheets;
};

exports.write = (sheetData, sheetName = 'Data', bookType = '.xlsx') => {
    var wb = XLSX.utils.book_new();
    wb.SheetNames.push(`${sheetName}`);
    wb.Sheets[`${sheetName}`] = XLSX.utils.json_to_sheet(sheetData);
    const fileName = path.join(__dirname, `../${process.env.FILE_NAME}${bookType}`);
    console.log("wb",wb);
    return XLSX.writeFile(wb, fileName);
}