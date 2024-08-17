import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import MyPosts from "./pages/MyPosts.jsx";
import { store } from "./redux-toolkit/store.js";
import { Provider } from "react-redux";
import { persistor } from "./redux-toolkit/store";
import { PersistGate } from "redux-persist/integration/react";
import AuthLayout from "./componenets/AuthLayout.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import PostPage from "./pages/PostPage.jsx";
import UpdatePost from "./pages/UpdatePost.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: (
          <AuthLayout authentication={false}>
            <SignIn />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            <Profile />
          </AuthLayout>
        ),
      },
      {
        path: "/myPosts",
        element: (
          <AuthLayout authentication>
            <MyPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/myPosts/createPost",
        element: (
          <AuthLayout authentication>
            <CreatePost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:postSlug",
        element: (
          <AuthLayout authentication>
            <PostPage />
          </AuthLayout>
        ),
      },
      {
        path: "/homePost/:postSlug",
        element: (
          <AuthLayout authentication={false}>
            <PostPage />
          </AuthLayout>
        ),
      },
      {
        path: "/updatePost/:postSlug",
        element: (
          <AuthLayout authentication>
            <UpdatePost />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}/>
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </PersistGate>
    </Provider>
  // </StrictMode>
);
