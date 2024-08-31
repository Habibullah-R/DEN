import React,{useEffect, useState} from 'react';
import Container from '../componenets/Container';
import Input from '../componenets/Input';
import Button from '../componenets/Button';
import Loader from '../componenets/Loader';
import HomePostCard from '../componenets/HomePostCard';
import { useNavigate } from 'react-router';

function SearchPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchVal , setSearchVal] = useState("");
  const navigate = useNavigate();

    async function searchedData(searchVal){
        try {
          setLoading(true);
            const response = await fetch(`/api/v1/post/search?searchTitle=${searchVal}`,
                {
                    method:"GET"
                }
            )
            const data = await response.json();
            if(data.success === false){
              console.log(data.message);
              setLoading(false);
              return;
            }
            setPosts(data.data.posts);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.log(error.message);
          }
    }


    useEffect(() => {
      const URLParams = new URLSearchParams(location.search);
      const searchTermFromUrl = URLParams.get('searchTitle');
      setSearchVal(searchTermFromUrl);
      searchedData(searchTermFromUrl)
    }, [location.search])

    const handleSearchSubmit = async (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      if (!searchVal) return;
      urlParams.set("searchTitle", searchVal);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`)
    };
    
  return (
    <>
    <Container className='py-4'>
      <form
        onSubmit={handleSearchSubmit}
        className="flex max-w-xl mt-8 relative"
      >
        <Input type="text" value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} />
        <Button className="absolute right-0 bottom-0 top-0 rounded-r-mdrounded-l-none px-3">Search</Button>
      </form>
      <div className='flex max-lg:justify-between flex-wrap gap-5'>
      {
        posts && posts.length >0 && posts.map((post , index)=>(
          <HomePostCard key={index} post={post}/>
        ))
      }
      </div>
      {loading && (
        <div className="fixed inset-0 top-[70px]">
        <Loader />
      </div>
      )}
      {posts.length === 0 && (
        <h2 className='mt-8'>No post found</h2>
      )}
    </Container>
    
    </>
  )
}

export default SearchPage