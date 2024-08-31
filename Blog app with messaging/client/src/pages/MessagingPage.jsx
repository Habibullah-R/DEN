import React,{useState, useEffect , useRef} from 'react'
import Container from '../componenets/Container'
import Input from "../componenets/Input"
import { FaMagnifyingGlass } from "react-icons/fa6";
import SearchUser from '../componenets/SearchUser';
import { getToken } from '../utills/localStorage';
import io from "socket.io-client" 
import Chat from "../componenets/Chat"
import { FaRegPaperPlane } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const MessagingPage = () => {
    const [searchUser , setSearchUser]= useState("");
    const [ loading , setLoading ] = useState(false);
    const [Users, setUsers] = useState([]);
    const token = getToken();
    const [ messageUser,setMessageUser]= useState("")
    const [ chat , setChat ]= useState([]);
    const [ message , setMessage ] = useState("");
    const [ sockets , setSockets] =useState(null);
    const { userData , status } = useSelector(state=>state.user)
    const [error , setError] = useState("");

    const chatContainerRef = useRef(null);

    async function getAllUsers (){
      try {
        setLoading(true);
      const response = await fetch("/api/v1/user/allUsers",
        {
          method:"GET",
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json();
      if(data.success === false){
        setLoading(false);
        return;
      }
      setUsers([...data.data]);
      setLoading(false);
      } catch (error) {
        console.log(error.message)
        setLoading(false);
      }
    }

    
    const selectUser = async (User)=>{
      setMessageUser(User)
      try {
        setLoading(true);
      const response = await fetch(`/api/v1/coversation/${User._id}`,
        {
          method:"GET",
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      )
      const data = await response.json();
      if(data.success === false){
        setLoading(false);
        return;
      }
      setChat([...data.data]);
      setLoading(false);
      } catch (error) {
        console.log(error.message)
        setLoading(false);
      }
    }

    const sendMessage = async(e)=>{
      e.preventDefault();

        try {
          setLoading(true);
          const response = await fetch(
            `/api/v1/coversation/send/${messageUser._id}`,
            {
              method: "POST",
              headers: {
                "content-type":"application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                message
              }),
            }
          );
          const data = await response.json();
          if(data.success === false){
            setLoading(false);
            setError(data.message);
            return;
          }
          setLoading(false);
          sockets.emit('newMessage', {
            to: messageUser._id,
            message: message,
            senderId: userData.data.user._id // Include senderId for reference
          });
          setChat(prevChat => [...prevChat, {
            senderId: userData.data.user._id,
            message: message
        }]);
          setMessage("")
        } catch (error) {
          setLoading(false);
          setError(error.message);
        }
    }

    useEffect(() => {
      getAllUsers();
      if(status){
        const socket = io("http://localhost:3000",{
          query:{
            userId : userData.data.user._id,
          }
        })


        socket.on('newMessage', (newMessage) => {
          if (messageUser._id === newMessage.senderId) {
            setChat((prevChat) => [...prevChat, newMessage]);
            
          }
        });

        setSockets(socket)
        return () => socket.close()
      }else{
        if(sockets){
          sockets.close();
          setSockets(null)
        }
      }
     
    }, [status, userData.data.user._id, messageUser ])


    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [chat]);
    
  return (
    <>
    <Container className='flex gap-4'>
        <div className='shadow-xl overflow-auto bg-[#1F2937] px-3 h-[600px] mt-12 w-[30%] rounded-md'>
            <div className='mt-5'>
              { Users && Users.length > 0 && Users.map((User,index)=>(
                <SearchUser User={User} key={index} onClick={()=>selectUser(User)}/>
              ))}
                
            </div>
        </div>

        <div className='shadow-xl overflow-auto relative bg-[#1F2937] h-[600px] mt-12 w-[70%] rounded-md'>
          {messageUser === "" ? (
             <div className="w-full h-full flex items-center justify-center">
            <h2 className='text-xl font-semibold'>No Chats Yet!</h2>
          </div>
          ) : (
            <>
            <div ref={chatContainerRef} className='p-3 h-[calc(100%-64px)] overflow-auto'>
              <h2 className='bg-gray-900 text-xl font-semibold p-2 rounded-md sticky top-0'>To: {messageUser.username}</h2>
              {chat && chat.length > 0 && chat.map((data,index)=>(
                <Chat chats={data} key={index} />
              ))}
            </div>
            <div className='sticky bottom-0  pt-3 bg-gray-900 h-16 left-3 right-3'>
            <form className='relative' onSubmit={sendMessage}>
            <Input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder={"Type a message"} />
            <FaRegPaperPlane className='absolute right-4 bottom-3 cursor-pointer' type='Submit' size={20}  />
            </form>
            </div>
            </>
          )}

            
        </div>
    </Container>
    </>
  )
}

export default MessagingPage