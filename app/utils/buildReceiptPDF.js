const PDFDocument = require("pdfkit");
const path = require("path");

function gerarPDF(receiptData) {
  const pdf = new PDFDocument({
    size: [420, 595],
    layout: "landscape",
  });

  const imagePath = path.join(__dirname, "img/logoDL.png");
  pdf.image(imagePath, 10, 10, { width: 180, height: 90 });

  const doc = "CNPJ: XX.XXX.XXX/XXXX-XX";
  const street = "R. XXXXXXXX XXXXXXXXX, XXX - CEP: XXXXX-XXX";
  const neighborhood = "XXXXXX - São Paulo";
  const inscription = "Insc. Municipal: XXX.XXX";
  const tel = "(XX) XXXX-XXXX";
  const cel = "(XX) XXXX-XXXX";
  const id = receiptData.id + "/" + receiptData.officeid;
  const paymentMethhod = paymentConfig(receiptData.methodpayment);
  const value = receiptData.value;
  const date = new Date(receiptData.startdate);

  pdf.fontSize(10);
  pdf.text(doc, 200, 30);
  pdf.text(street, 200, 60);
  pdf.text(neighborhood, 200, 90);
  pdf.text(inscription, 400, 30);
  pdf.text(tel, 400, 60);
  pdf.text(cel, 400, 90);

  pdf.lineWidth(1);
  pdf.moveTo(0, 120).lineTo(600, 120).stroke();

  pdf.fontSize(15);
  pdf.font("Helvetica-Bold");
  pdf.text("RECIBO:", 230, 140);
  pdf.font("Helvetica");
  pdf.text(`${id}`, 300, 140);

  pdf.fontSize(13);
  pdf.font("Helvetica-Bold");
  pdf.text("Método de pagamento:", 10, 200);
  pdf.font("Helvetica");
  pdf.text(`${paymentMethhod}`, 160, 200);

  pdf.fontSize(13);
  pdf.font("Helvetica-Bold");
  pdf.text("Valor:", 10, 230);
  pdf.font("Helvetica");
  pdf.text(`${value}`, 60, 230);

  pdf.fontSize(13);
  pdf.font("Helvetica-Bold");
  pdf.text("Data:", 10, 260);
  pdf.font("Helvetica");
  pdf.text(`${date.toLocaleDateString()}`, 60, 260);

  const logoPath = path.join(__dirname, "img/logoStxt.png");
  pdf.image(logoPath, 405, 265, { opacity: 0.5 });

  pdf.lineWidth(1);
  pdf.moveTo(380, 390).lineTo(580, 390).stroke();

  return pdf;
}

function paymentConfig(value) {
  const paymentCod = value;
  const paymentMethods = {
    C: "Cartão",
    D: "Dinheiro",
    T: "Transferência",
    P: "Pix",
    O: "Outros",
  };

  return paymentMethods[paymentCod];
}

module.exports = gerarPDF;
