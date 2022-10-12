import axios from "axios";

const request = axios.create(
    {
        baseURL: `https://api.themoviedb.org/3/`
    }
)
const img= "https://image.tmdb.org/t/p/original"
export const get = async (path, params={}) => {
    const response = await request.get(path, params)
    return response.data
}
export default request