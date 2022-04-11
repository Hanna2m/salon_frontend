import axios from "axios";
import {useState} from "react"

const API_URL = "http://localhost:3080/";



// const signup = async (name, email, password, role) => {
//   console.log(name, email, password, role)
//   console.log(IsUnique(email))
  // if (IsUnique(email) === true){
  //   try {
  //       await axios
  //       .post(API_URL+"signup", {
  //         name, email, password, role
  //       })
  //     .then((res) => console.log(res.data))
  //     } catch (error) {
  //       console.log(error)
  //     }
  // } else {
  //   console.log( "Email is already registered")
  //   return "Email is already registered"}
    
// }

const login = async (email, password) => {
    try {
        const res = await axios({
        method: 'POST',
        url: API_URL+"login",
        data: JSON.stringify({
          email, password
        }),
        headers: {'Content-Type': 'application/json'}
      })
      if(res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data))
      }
      return res.data
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
    // signup,
    login,
    logout,
    getCurrentUser
};

export default AuthService

// export const IsUnique = email => {
//   const [users, setUsers] = useState();
//     const getAllUsers = async () => {
//       try {
//         await axios.get('https://groomer-server.herokuapp.com/user')
//         .then((res) => {
//           console.log(res.data)
//           return(res.data)
//         });
//       } catch (error) {
//         console.log(error.message);
//       }
//       setUsers(getAllUsers());
//       if (!users) {return "Loading..."} else {
//         console.log(users.email)
//         const result = users.email.find(element => element === email)
//         if (result) {return false}
//       }
//   }}


