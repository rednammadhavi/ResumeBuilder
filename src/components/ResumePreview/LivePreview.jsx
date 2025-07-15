export default function LivePreview({ data }) {
    return (
        <div className="bg-white p-6 rounded shadow text-gray-800">
            <h1 className="text-2xl font-bold text-blue-700 mb-2">{data.fullName}</h1>
            <p className="text-sm mb-1">{data.email} | {data.phone}</p>
            <hr className="my-3" />

            <section>
                <h2 className="font-semibold text-lg">Summary</h2>
                <p className="mb-4 whitespace-pre-line">{data.summary}</p>
            </section>

            <section>
                <h2 className="font-semibold text-lg">Education</h2>
                <p className="mb-4 whitespace-pre-line">{data.education}</p>
            </section>

            <section>
                <h2 className="font-semibold text-lg">Experience</h2>
                <p className="mb-4 whitespace-pre-line">{data.experience}</p>
            </section>

            <section>
                <h2 className="font-semibold text-lg">Skills</h2>
                <ul className="list-disc list-inside">
                    {data.skills.split(",").map((skill, i) => (
                        <li key={i}>{skill.trim()}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
}