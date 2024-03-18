import axios from "axios"



export const client = () => {

    const client = axios.create({
        baseURL: 'https://pokeapi.co/api/v2/',
    })

    return client
}