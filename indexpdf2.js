const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {}; /* see below */
pdfExtract.extract('pdf2[2].pdf', options, (err, data) => {
    if (err) return console.log(err);
    console.log(JSON.stringify(data));
    parsePdfData(data);
});

function parsePdfData(){

}