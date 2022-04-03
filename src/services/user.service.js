import axios from "axios";

const API_URL = "http://localhost:3080/";

const getServiceContent = async () => {
    try {
        await axios
        .get(API_URL+"service")
    } catch (error) {
        
    }
}

const UserContent = {
    getServiceContent
}

export default UserContent;