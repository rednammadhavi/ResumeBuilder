import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Schema = Yup.object({
  fullName: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  summary: Yup.string().required("Summary is required"),
});

export default function ResumeForm({ resumeData, setResumeData }) {
  return (
    <Formik
      initialValues={resumeData}
      validationSchema={Schema}
      onSubmit={() => {}}
    >
      {({ errors, touched, handleChange }) => (
        <Form className="space-y-4 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Resume Information</h2>

          {Object.keys(resumeData).map((field) => (
            <div key={field}>
              <label className="block capitalize font-medium">{field}</label>
              <Field
                as={field === "summary" || field === "experience" || field === "education" ? "textarea" : "input"}
                name={field}
                onChange={(e) => {
                  handleChange(e);
                  setResumeData((prev) => ({ ...prev, [field]: e.target.value }));
                }}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {errors[field] && touched[field] && (
                <div className="text-red-500 text-sm">{errors[field]}</div>
              )}
            </div>
          ))}
        </Form>
      )}
    </Formik>
  );
}