const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if(user && user.token) {
        //for back-end
        return {"x-access-token": user.token};
    } else {
        return {};
    }
}
export default authHeader;