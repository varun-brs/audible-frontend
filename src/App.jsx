// Import the components and other
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import RootLayout from "./components/RootLayout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AuthorPage from "./pages/AuthorPage";
import EmailVerifyPage from "./pages/EmailVerifyPage";
import EditPage from "./components/EditPage";

// Defining the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/forgotpassword", element: <ForgotPasswordPage /> },
      { path: "/resetpassword", element: <ResetPasswordPage /> },
      { path: "/verifyEmail/:verifytoken", element: <EmailVerifyPage /> },

      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/home", element: <HomePage /> },
          { path: "/profile", element: <ProfilePage /> },
          { path: "/author", element: <AuthorPage /> },
          { path: "/edit-page/:id", element: <EditPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
