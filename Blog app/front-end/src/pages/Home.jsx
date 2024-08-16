import React, { useEffect, useState } from "react";
import { Container, Loader, Logo } from "../componenets";
import { calculateRemainingTime, getToken } from "../utills/localStorage";
import {
  LogoutFailure,
  LogoutStart,
  LogoutSuccess,
} from "../redux-toolkit/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import HomePostCard from "../componenets/HomePostCard";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const token = getToken();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  async function logoutUser() {
    try {
      dispatch(LogoutStart());
      const response = await fetch("/api/v1/user/logout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(LogoutFailure(data.message));
        return;
      }
      localStorage.clear();
      dispatch(LogoutSuccess());
    } catch (error) {
      dispatch(LogoutFailure(error.message));
    }
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
      console.log(count)
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(true);
    }
  }

  useEffect(() => {
      getPosts();
    

    if (!token || token === 0) {
      logoutUser();
      return;
    }

    const remainingTime = calculateRemainingTime();
    setTimeout(() => {
      logoutUser();
    }, remainingTime);
  }, [status, token]);
  return (
    <Container>
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
            Discover insightful articles on technology, lifestyle, and
            creativity. Stay informed, inspired, and connected with our vibrant
            community. Explore, learn, and grow with us!
          </p>
        </div>
        {
        posts && posts.length > 0 && (
          <InfiniteScroll
            dataLength={count}
            next={getPosts}
            hasMore={count !== posts.length}
            loader={<Loader/>}
            scrollableTarget="scrollableDiv"
          >
            
            <div className='flex max-lg:justify-between max-xl:justify-between gap-5 mb-5 mt-5 flex-wrap'>
            {posts.map((post, index) => (
              <HomePostCard key={index} post={post} />
            ))}
            </div>
          </InfiniteScroll>
        ) 
        }
    </Container>
  );
}

export default Home;
