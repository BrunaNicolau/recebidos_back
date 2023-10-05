const PDFKit = require('pdfkit');
const fs = require('fs');

const pdf = new PDFKit();

pdf.text('TESTE');

pdf.pipe(fs.createWriteStream("app/utils/storage/storagefile.pdf"));
pdf.end();