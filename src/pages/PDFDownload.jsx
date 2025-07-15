import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function PDFDownload() {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text(data.fullName, 14, 22);
        doc.setFontSize(12);
        doc.text(`${data.email} | ${data.phone}`, 14, 32);

        doc.text("Summary:", 14, 45);
        doc.text(data.summary, 14, 52, { maxWidth: 180 });

        doc.text("Education:", 14, 72);
        doc.text(data.education, 14, 78, { maxWidth: 180 });

        doc.text("Experience:", 14, 98);
        doc.text(data.experience, 14, 104, { maxWidth: 180 });

        doc.text("Skills:", 14, 124);
        doc.text(data.skills, 14, 130, { maxWidth: 180 });

        doc.save("resume.pdf");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to download your resume?</h2>
            <button
                onClick={downloadPDF}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
                Download PDF
            </button>
            <button
                onClick={() => navigate("/build")}
                className="mt-4 text-blue-500 underline"
            >
                Back to Edit
            </button>
        </div>
    );
}
