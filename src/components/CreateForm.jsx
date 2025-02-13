import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAudioBookRegisterAPIMutation } from "../store/audioBooks/audioBookApiSlice";
import { toast } from "react-toastify";

const initialValues = {
  language: "",
  category: "",
  book_name: "",
  description: "",
};

const validationSchema = Yup.object({
  language: Yup.string().required("Language is required"),
  category: Yup.string().required("Category is required"),
  book_name: Yup.string().required("Book Name is required"),
  description: Yup.string().required("Description is required"),
});

const BookForm = () => {
  const [audioBookRegisterAPI] = useAudioBookRegisterAPIMutation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      const response = await audioBookRegisterAPI({
        book_name: values.book_name,
        category: values.category,
        language: values.language,
        description: values.description,
      }).unwrap();
      toast.success(response.message);
      resetForm();
      setSubmitting(false);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full h-full">
      <h2 className="text-xl font-semibold mb-4 text-black">
        Create Audio Book
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-black">Language</label>
              <Field
                as="select"
                name="language"
                className="w-full p-2 border border-gray-700 rounded mt-1 appearance-none bg-gray-100 text-black"
              >
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
              </Field>
              <ErrorMessage
                name="language"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-black">Category</label>
              <Field
                as="select"
                name="category"
                className="w-full p-2 border border-gray-700 rounded mt-1 appearance-none bg-gray-100 text-black"
              >
                <option value="">Select Category</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="mystery">Mystery</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-black">Book Name</label>
              <Field
                type="text"
                name="book_name"
                placeholder="Enter Your Book Name"
                className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-100 text-black"
              />
              <ErrorMessage
                name="book_name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-black">Description</label>
              <Field
                as="textarea"
                name="description"
                rows="4"
                className="w-full p-2 border border-gray-700 rounded mt-1 bg-gray-100 text-black"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-44 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BookForm;
