import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAudioBookRegisterAPIMutation } from "../store/audioBooks/audioBookApiSlice";
import { toast } from "react-toastify";

const initialValues = {
  language: "",
  category: "",
  book_name: "",
  description: "",
  // book_cover_image: null, // Set initial value to null for file input
};

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const MAX_FILE_SIZE = 2 * 1024 * 1024;

const validationSchema = Yup.object({
  language: Yup.string().required("Language is required"),
  category: Yup.string().required("Category is required"),
  book_name: Yup.string().required("Book Name is required"),
  description: Yup.string().required("Description is required"),
  // book_cover_image: Yup.mixed()
  //   .required("Image is required")
  //   .test(
  //     "fileSize",
  //     "File size too large! Max 2 MB allowed.",
  //     (file) => file && file.size <= MAX_FILE_SIZE
  //   ),
});

const BookForm = () => {
  const [audioBookRegisterAPI] = useAudioBookRegisterAPIMutation();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      // Create formData for file upload along with other values if needed
      const formData = new FormData();
      formData.append("book_name", values.book_name);
      formData.append("category", values.category);
      formData.append("language", values.language);
      formData.append("description", values.description);
      // formData.append("book_cover_image", values.book_cover_image);
      // Append the file, key should match with backend key

      // Make API call here. Example using your audioBookRegisterAPI
      const response = await audioBookRegisterAPI(formData).unwrap();
      toast.success(response.message);
      resetForm();
      setSubmitting(false);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      setSubmitting(false);
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
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="space-y-4">
            {/* Language Field */}
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

            {/* Category Field */}
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

            {/* Book Name Field */}
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

            {/* Description Field */}
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

            {/* Image Upload Field
            <div>
              <label className="block text-black mb-1">Book Cover Image</label>
              <input
                type="file"
                name="book_cover_image"
                accept="image/*"
                onChange={(event) =>
                  setFieldValue("book_cover_image", event.target.files[0])
                }
                className="  text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-blue-500 hover:file:bg-blue-600"
              />
              <ErrorMessage
                name="book_cover_image"
                component="div"
                className="text-red-500 text-sm"
              />
            </div> */}

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
