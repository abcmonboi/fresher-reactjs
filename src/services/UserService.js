import axiosConfig from "./axios";
const fetchAllUsers = (page) => {
    return  axiosConfig.get(`/users?page=${page}`);
}

const postCreateUser = (name,job) => {
    return axiosConfig.post(`/users`, {name,job});
}
const putUpdateUser = (name,job) => {
    return axiosConfig.put(`/users/`,{name,job});
}

export { fetchAllUsers , postCreateUser,putUpdateUser}