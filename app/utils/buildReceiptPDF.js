const PDFDocument = require("pdfkit");
const path = require("path");

function gerarPDF(receiptData) {
  const pdf = new PDFDocument({
    size: [420, 595],
    layout: "landscape",
  });

  const imagePath = path.join(__dirname, "img/logoDL.png");
  pdf.image(imagePath, 10, 10, { width: 180, height: 90 });

  const doc = "CNPJ: 09.973.391/0001-32";
  const street = "R. Major Boaventura, 558 - CEP: 03569-030";
  const neighborhood = "VL. Nhocuné - São Paulo";
  const inscription = "Insc. Municipal: 427.422";
  const tel = "(11) 2217-0643";
  const cel = "(11) 96220-1765";

  // TODO: ira receber valor dinamico
  const id = receiptData.escritorio_id;
  const paymentMethhod = receiptData.method_payment;
  const value = receiptData.valor;
  const date = new Date(receiptData.inicio);

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

module.exports = gerarPDF;
