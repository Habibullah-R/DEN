import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { useLocation, useNavigate } from 'react-router';

function AuthLayout({children,authentication = true}) {
    const { status } = useSelector((state)=>state.user);
    const [loader , setLoader] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const isSearchPage = location.pathname === '/search';


    useEffect(()=>{
        if(!isSearchPage){
            if(authentication && status !== authentication){
                navigate("/signin");
            }
            else if(!authentication && status !== authentication){
                navigate("/")
            }
        }
        setLoader(false);
    },[navigate , authentication , status])
    


  return loader ? <h2>Loading...</h2> : <>{children}</>
}

export default AuthLayout