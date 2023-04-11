import axiosConfig from "./axios";
const fetchAllUsers = () => {
    return  axiosConfig.get("https://reqres.in/api/users?page=2");
}

export { fetchAllUsers}