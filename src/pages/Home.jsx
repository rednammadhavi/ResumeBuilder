import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center">
            <div className="text-center p-10 shadow-xl rounded-xl bg-white">
                <h1 className="text-5xl font-extrabold text-blue-700 mb-4">Classic Resume Builder</h1>
                <p className="text-gray-600 mb-6 text-lg">Design a professional resume in minutes.</p>
                <Link to="/build">
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
                        Build Resume
                    </button>
                </Link>
            </div>
        </div>
    );
}