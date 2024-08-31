import React, { useState, useEffect } from "react";
import Container from "./Container";
import Button from "./Button";
import Logo from "./Logo";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser  } from "../redux-toolkit/reducers/userReducer/userApiCalls";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";

function Header() {
  const { status, userData } = useSelector((state) => state.user);
  const [subMenu, setSubMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const location = useLocation();
  const path = location.pathname;

  const handleSignOut = async () => {
    dispatch(logoutUser())
    .unwrap()
    .then(()=>{
      setSubMenu(!subMenu);
    })
  };


  

  return (
    <>
      <header className="h-[70px] bg-[#1F2937]">
        <Container className="h-full">
          <div className="flex items-center h-full justify-between">
            {status ? (
              <h2 className="md:hidden text-lg font-semibold">BLOG</h2>
            ) : (
              <h2 className="hidden text-lg font-semibold">BLOG</h2>
            )}
            <Logo className="m-0 p-0 max-md:hidden" />

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
                        My Blogs
                      </Link>
                    </li>
                    <li>
                      <Link className="hover:text-white" to="/messaging">
                        Messaging
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
                        My Blogs
                      </Button>
                    </Link>
                  </MenuItem>
                  <MenuItem className="md:hidden block">
                    <Link className="md:hidden w-full h-full" to="/messaging">
                      <Button
                        onClick={() => setSubMenu(!subMenu)}
                        className="text-sm border-none p-3 w-full text-left"
                      >
                       Messaging
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
