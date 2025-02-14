import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useUpdateAudioBookMutation,
  useDeleteAudioBookApiMutation,
} from "../store/audioBooks/audioBookApiSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAudioBook } from "../store/user/authSlice";

const EditPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const book = location.state?.book;
  const [updateAudioBook] = useUpdateAudioBookMutation();
  const [deleteAudioBookApi] = useDeleteAudioBookApiMutation();

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [bookName, setBookName] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const updatedData = {};
      if (values.book_name !== book.book_name)
        updatedData.book_name = values.book_name;
      if (values.category !== book.category)
        updatedData.category = values.category;
      if (values.language !== book.language)
        updatedData.language = values.language;
      if (values.description !== book.description)
        updatedData.description = values.description;

      if (Object.keys(updatedData).length === 0) {
        toast.info("No changes detected");
        setSubmitting(false);
        return;
      }

      const response = await updateAudioBook({
        id: book._id,
        ...updatedData,
      }).unwrap();
      toast.success(response.message);
      setSubmitting(false);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      setSubmitting(false);
    }
  };

  //   const handleDelete = async () => {
  //     if (confirmBookName !== book.book_name) {
  //       toast.error("Book name does not match. Try again.");
  //       return;
  //     }

  //     try {
  //       await deleteAudioBook(book._id).unwrap();
  //       toast.success("AudioBook deleted successfully");
  //       navigate("/audiobooks"); // Redirect after deletion
  //     } catch (error) {
  //       toast.error(error?.data?.message || "Failed to delete audiobook");
  //     }
  //   };

  const handleDelete = async () => {
    if (bookName === book.book_name) {
      try {
        // Call the delete function on the backend
        const response = await deleteAudioBookApi(book._id).unwrap();

        // Dispatch the delete action to update Redux state
        dispatch(deleteAudioBook(book._id));

        toast.success("AudioBook deleted successfully");
        setShowModal(false); // Close the modal after deletion
      } catch (error) {
        toast.error("Failed to delete AudioBook");
      }
    } else {
      toast.error("Book name does not match.");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md w-xl h-full">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Edit Audio Book
        </h2>
        <Formik
          initialValues={{
            language: book.language || "",
            category: book.category || "",
            book_name: book.book_name || "",
            description: book.description || "",
          }}
          validationSchema={Yup.object({
            language: Yup.string().required("Language is required"),
            category: Yup.string().required("Category is required"),
            book_name: Yup.string().required("Book Name is required"),
            description: Yup.string().required("Description is required"),
          })}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
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

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-28 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  disabled={isSubmitting}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="w-28 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                  onClick={() => setShowModal(true)}
                >
                  Delete
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* Modal for confirming deletion */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Deletion</h3>
            <label>Enter Book Name to confirm:</label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="Enter Book Name"
              className="p-2 border border-gray-700 rounded mt-1 w-full"
            />
            <button
              onClick={handleDelete}
              className="delete-btn w-full bg-red-500 text-white py-2 px-4 rounded mt-2 hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="cancel-btn w-full bg-gray-500 text-white py-2 px-4 rounded mt-2 hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPage;
