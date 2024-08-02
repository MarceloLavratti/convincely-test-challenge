import axios from "axios"

const apiKey = '8i37JPmHs4WNFEJaxwHM'

const api = axios.create({
    baseURL: 'https://the-one-api.dev/v2/movie',
    headers: {
        Authorization: `Bearer ${apiKey}`
    }
})

// const api = axios.create({
//     baseURL: 'https://66a7bc6053c13f22a3d0e3f5.mockapi.io/api/v1/cart',
//     timeout: 10000
// })

export default api