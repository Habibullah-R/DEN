import React, { useState } from "react";
import Input from "./Input.jsx"
import Container from "./Container.jsx";
import Button from "./Button.jsx";
import Logo from "./Logo";
import Loader from "./Loader.jsx"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux-toolkit/reducers/userReducer/userApiCalls.js";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const disptch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    disptch(registerUser({username , email , password}))
    .unwrap()
    .then(()=>{
      navigate("/signin")
    })
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
          className="flex w-full mb-16 max-md:mt-10 md:px-2 flex-col gap-3"
        >
          <h2 className="text-2xl font-semibold text-center">Sign Up</h2>
          <Input
            type="text"
            className=""
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
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
            {error ? error : ""}
          </p>
          <Button className="bg-[#407BE3] hover:opacity-80">
            {loading ? <Loader/> : "Sign Up"}
          </Button>
          <p className="text-sm font-normal">
            Already have an account?{" "}
            <Link className="text-[#407BE3] underline" to="/signin">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </Container>
  );
};
