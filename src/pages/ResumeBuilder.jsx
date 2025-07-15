import { useState } from "react";
import ResumeForm from "../components/Form/ResumeForm";
import LivePreview from "../components/ResumePreview/LivePreview";

export default function ResumeBuilder() {
    const [resumeData, setResumeData] = useState({
        fullName: "",
        email: "",
        phone: "",
        summary: "",
        education: "",
        experience: "",
        skills: "",
    });

    return (
        <div className="min-h-screen flex flex-col md:flex-row gap-6 p-6 bg-gray-50">
            <div className="md:w-1/2">
                <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
            </div>
            <div className="md:w-1/2">
                <LivePreview data={resumeData} />
            </div>
        </div>
    );
}