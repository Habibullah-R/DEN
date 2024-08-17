import React, { useState } from "react";
import Input from "./Input.jsx"
import Container from "./Container.jsx";
import Button from "./Button.jsx";
import Logo from "./Logo";
import Loader from "./Loader.jsx"
import {
  signinFailure,
  signinStart,
  signinSuccess,
} from "../redux-toolkit/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { setItems } from "../utills/localStorage.js";
import { toast } from "react-toastify";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const disptch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    disptch(signinStart());
    try {
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.success === false) {
        disptch(signinFailure(data));
        return;
      }
      console.log(data);
      setItems(data.data.token);
      disptch(signinSuccess(data));
      toast(data.message);
      navigate("/");
    } catch (error) {
      disptch(signinFailure(error));
      console.log("Error while sign in.");
    }
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
            {error ? error.message : ""}
          </p>
          <Button disabled={loading}>
            {loading ? <Loader/> : "Sign In"}
          </Button>
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

