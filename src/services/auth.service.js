import axios from "axios";

const API_URL = "https://groomer-server.herokuapp.com/";

const signup = async (name, email, password, role) => {
    try {
        await axios({
        method: 'POST',
        url: API_URL+"signup",
        data: JSON.stringify({
          name, email, password, role
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then((res) => console.log(res.data))
      } catch (error) {
        console.log(error)
      }
}

const login = async (email, password) => {
    try {
        await axios({
        method: 'POST',
        url: API_URL+"login",
        data: JSON.stringify({
          email, password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      .then((res) => {
         if(res.data.token) {
             localStorage.setItem("user", JSON.stringify(res.data))
        }
        return res.data
      });
      } catch (error) {
        console.log(error)
    };
};

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
    signup,
    login,
    logout,
    getCurrentUser
};

export default AuthService;


