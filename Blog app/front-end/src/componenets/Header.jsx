import React, { useState } from "react";
import { Container, Input, Button, Logo } from "./";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LogoutFailure,
  LogoutStart,
  LogoutSuccess,
} from "../redux-toolkit/reducers/userSlice";
import { getToken } from "../utills/localStorage";
import { toast } from "react-toastify";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";

function Header() {
  const [searchVal, setSearchVal] = useState("");
  const { status, userData } = useSelector((state) => state.user);
  const [subMenu, setSubMenu] = useState(false);
  const dispatch = useDispatch();
  const token = getToken();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(LogoutStart());
      const response = await fetch("/api/v1/user/logout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      const data = await response.json();
      if (data.success === false) {
        dispatch(LogoutFailure(data.message));
        return;
      }
      localStorage.clear();
      dispatch(LogoutSuccess());
      toast(data.message);
      setSubMenu(!subMenu);
      navigate("/");
    } catch (error) {
      dispatch(LogoutFailure(error.message));
    }
  };



  return (
    <>
      <header className="h-[70px] bg-[#1F2937]">
        <Container className="h-full">
          <div className="flex items-center h-full justify-between">
            <Logo />
            {/* <div className="relative">
              <Input
                type="text"
                className="pr-[35px]"
                value={searchVal}
                placeholder="Search"
                onChange={(e) => setSearchVal(e.target.value)}
              />
              <IoMdSearch
                className="absolute text-gray-400 top-2 right-2"
                size={23}
              />
            </div> */}
            <nav className="flex max-md:hidden h-full items-center">
              <ul className="flex text-sm gap-5 text-gray-400">
                {status && (
                  <>
                    <li>
                      <Link className="hover:text-white" to="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-white" to="/myPosts">
                        My Posts
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            {status ? (
              <div className="relative">
                <Menu
                  direction="bottom"
                  align="end"
                  menuButton={
                    <MenuButton>
                      <img
                        src={userData.data.user.avatar}
                        onClick={() => {
                          setSubMenu(!subMenu);
                        }}
                        className="cursor-pointer cd w-[40px] h-[40px] rounded-[50%]"
                        alt=""
                      />
                    </MenuButton>
                  }
                >
                    <div className="text-sm p-3">
                      <p>@{userData.data.user.username}</p>
                      <p>{userData.data.user.email}</p>
                    </div>
                  <hr className="border-gray-600" />
                  <MenuItem>
                  <Link to="/profile" className="h-full w-full">
                    <Button
                      onClick={() => setSubMenu(!subMenu)}
                      className="text-sm border-none p-3 w-full text-left"
                    >
                      Profile
                    </Button>
                  </Link>
                  </MenuItem>
                  <hr className="md:hidden block border-gray-600" />
                  <MenuItem className="md:hidden block w-full">
                  <Link className="md:hidden h-full w-full" to="/">
                    <Button
                      onClick={() => setSubMenu(!subMenu)}
                      className="text-sm border-none p-3 w-full text-left"
                    >
                      Home
                    </Button>
                  </Link>
                  </MenuItem>
                  <hr className="md:hidden block border-gray-600" />
                  <MenuItem className="md:hidden block">
                  <Link className="md:hidden w-full h-full" to="/myPosts">
                    <Button
                      onClick={() => setSubMenu(!subMenu)}
                      className="text-sm border-none p-3 w-full text-left"
                    >
                      My Posts
                    </Button>
                  </Link>
                  </MenuItem>
                  <hr className="border-gray-600" />
                  <MenuItem>
                  <Button
                    onClick={handleSignOut}
                    className="text-sm border-none p-3 w-full text-left"
                  >
                    Sign Out
                  </Button>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/signin">
                  <Button className="w-[90px]">Sign In</Button>
                </Link>
                <Link className="max-md:hidden" to="/signup">
                  <Button className="w-[90px]">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </header>
    </>
  );
}

export default Header;
