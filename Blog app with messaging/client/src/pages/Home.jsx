import React, { useEffect, useState } from "react";
import Logo from "../componenets/Logo.jsx";
import Container from "../componenets/Container.jsx";
import Loader from "../componenets/Loader.jsx";
import Input from "../componenets/Input.jsx";
import { calculateRemainingTime, getToken } from "../utills/localStorage";
import { useDispatch, useSelector } from "react-redux";
import HomePostCard from "../componenets/HomePostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { logoutUser } from "../redux-toolkit/reducers/userReducer/userApiCalls.js";
import Button from "../componenets/Button.jsx";
import { useNavigate } from "react-router";

function Home() {
  const token = getToken();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [searchVal , setSearchVal]= useState("");
  const navigate = useNavigate();

  async function logoutCurrentUser() {
    dispatch(logoutUser());
  }

  async function getPosts() {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/v1/post/getAllPosts?page=${page}&limit=6`,
        { method: "GET" }
      );
      const data = await response.json();
      if (data.success === false) {
        console.log(data.message);
        setLoading(true);
        return;
      }
      setPosts((prev) => [...prev, ...data.data.posts]);
      setPage((prev) => prev + 1);
      setCount(data.data.count);
      console.log(count);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(true);
    }
  }

  useEffect(() => {
    getPosts();

    if ((!token || token === 0) && status === true) {
      logoutCurrentUser();
      return;
    }

    const remainingTime = calculateRemainingTime();
    setTimeout(() => {
      logoutCurrentUser();
    }, remainingTime);
  }, [status, token]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    if (!searchVal) return;
    urlParams.set("searchTitle", searchVal);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  };

  return (
    <Container>
      <form
        onSubmit={handleSearchSubmit}
        className="flex max-w-xl mt-8 relative"
      >
        <Input value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} className="border-r-0" placeholder="Search..." />
        <Button className="absolute right-0 bottom-0 top-0 rounded-r-mdrounded-l-none px-3">
          Search
        </Button>
      </form>
      {loading && (
        <div className="fixed inset-0 top-[70px]">
          <Loader />
        </div>
      )}
      <div className={status ? "hidden" : "block"}>
        <h2 className="mt-[150px] text-6xl font-bold">
          Welcome to <Logo /> blogs.
        </h2>
        <p className="text-md mt-5 w-[70%]">
          Discover insightful articles on technology, lifestyle, and creativity.
          Stay informed, inspired, and connected with our vibrant community.
          Explore, learn, and grow with us!
        </p>
      </div>
      {posts && posts.length > 0 && (
        <InfiniteScroll
          dataLength={count}
          next={getPosts}
          hasMore={count !== posts.length}
          loader={<Loader />}
          scrollableTarget="scrollableDiv"
        >
          <div className="flex max-lg:justify-between max-xl:justify-between gap-5 mb-5 mt-5 flex-wrap">
            {posts.map((post, index) => (
              <HomePostCard key={index} post={post} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </Container>
  );
}

export default Home;
