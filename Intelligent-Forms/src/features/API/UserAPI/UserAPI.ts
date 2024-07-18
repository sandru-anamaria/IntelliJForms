import axios from 'axios'

const UserLoginURL = "https://intelligentformsapi.azurewebsites.net/api/v1/Users/SignIn";
const userGetURL ="https://intelligentformsapi.azurewebsites.net/api/v1/Users";
const userRegisterURL = "https://intelligentformsapi.azurewebsites.net/api/v1/Users/SignUp";
const UserAPI = axios.create({})

export const loginUserAPI = async ( userLogin:any) => {
    const response = await UserAPI.post(UserLoginURL, userLogin)
    return response
}

export const readSingleUserAPI = async (id: string) => {
        const response = await UserAPI.get(`${userGetURL}/${id}`)
        console.log(response.data)
        return response.data
    
}

export const createUserAPI = async (user: any) => {

    const response = await UserAPI.post(userRegisterURL,user)
    return response
}