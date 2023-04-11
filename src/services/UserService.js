import axiosConfig from "./axios";
const fetchAllUsers = (page) => {
    return  axiosConfig.get(`https://reqres.in/api/users?page=${page}`);
}

export { fetchAllUsers}