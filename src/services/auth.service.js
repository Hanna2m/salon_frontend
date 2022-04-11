import axios from "axios";

const API_URL = "https://groomer-server.herokuapp.com/";

const logout = () => {
    localStorage.removeItem("user");
    try {
       axios
        .get(API_URL+"logout")
        .then((res) => {
            return res.data
        })
    } catch (error) {
        console.log(error)
    }
}

const getCurrentUser = () => {
   return(JSON.parse(localStorage.getItem("user"))) ;
  };

const AuthService = {
    logout,
    getCurrentUser
};

export default AuthService



