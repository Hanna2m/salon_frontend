import axios from "axios";

const API_URL = "https://groomer-server.herokuapp.com/";

const login = async (email, password) => {


  let {user} ={};
    try {await 
        axios
        .post(API_URL+"login", {email, password})
        .then(res =>  {
          if(res.data.token) {
            localStorage.setItem("user", JSON.stringify(res.data))
            localStorage.getItem("user")
            user = JSON.parse(localStorage.getItem("user"));
            console.log('1', user)
            // console.log('2', localStorage.getItem("user").role)
            if (user.role === "admin") {
              window.location = "/dashboard";
            } 
            // else {
            //   if (location.state?.from) {
            //     navigate(location.state.from);
            //         }
            //   }
            }
          return res.data
          })
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
  // try {
  //   const data = AsyncLocalStorage.getItem('user');
  //   return data;
  // } catch(e) {
  //   console.log(e)
  // }
  
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


