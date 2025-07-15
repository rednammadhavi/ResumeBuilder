import jsPDF from "jspdf";

export function generatePDF(data) {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(data.fullName, 20, 20);
    doc.setFontSize(12);
    doc.text(`Email: ${data.email}`, 20, 30);
    doc.text(`Phone: ${data.phone}`, 20, 40);
    doc.text("Summary:", 20, 55);
    doc.text(data.summary, 20, 65, { maxWidth: 170 });
    doc.text("Skills:", 20, 90);
    doc.text(data.skills, 20, 100, { maxWidth: 170 });
    doc.save("resume.pdf");
}
