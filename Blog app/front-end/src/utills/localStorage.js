export const setItems = (token)=>{
    localStorage.setItem("blog_access_token",token);
    const expirationTime = new Date();
    expirationTime.setDate(expirationTime.getDate() + 2)
    localStorage.setItem("blog_access_token_expiration",expirationTime);
}


export const calculateRemainingTime = ()=>{
    const expiringTime = localStorage.getItem("blog_access_token_expiration");
    const expirationTime = new Date(expiringTime)
    const timeNow = new Date();
    let duration = expirationTime - timeNow;
    duration -= 15000;
    return duration;
}

export const getToken = ()=>{
    const token = localStorage.getItem("blog_access_token");

    const remainingTime = calculateRemainingTime();

    if(remainingTime <= 0){
        return 0;
    }
    return token;
}