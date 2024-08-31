import React, { useState } from "react";
import Input from "./Input.jsx";
import Container from "./Container.jsx";
import Button from "./Button.jsx";
import Logo from "./Logo";
import Loader from "./Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signInUser } from "../redux-toolkit/reducers/userReducer/userApiCalls.js";


export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const disptch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    disptch(signInUser({ email, password }));
  };

  return (
    <Container>
      <div className="flex mt-[120px] w-full max-md:flex-col xl:w-[70%] mx-auto items-center justify-center gap-4">
        <div className="w-full">
          <Logo className="mb-3" />
          <p className="test-md">
            This is the demo project so you can use arbitrary email and
            password.
            
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex mb-16 w-full max-md:mt-10 md:px-2 flex-col gap-3"
        >
          <h2 className="text-2xl font-semibold text-center">Sign In</h2>
          <Input
            type="email"
            className=""
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            className=""
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm text-red-500 block h-4">
            {error && error }
          </p>
          <Button disabled={loading}>{loading ? <Loader /> : "Sign In"}</Button>
          <p className="text-sm font-normal">
            Don't have an account?{" "}
            <Link className="text-[#407BE3] underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Container>
  );
}
