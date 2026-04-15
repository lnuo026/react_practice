import axios from 'axios';


//创建实例， baseURL 是固定的地址前缀：不用每次都写 /api，省重复代码。  
const api = axios.create({
    baseURL:'/api',
})

    //拦截器： 每次发请求之前，先执行括号里的函数
    // config 是 axios 自动传进来的，包含这次请求的所有信息：           
    //   config = { url: '/decks',method: 'GET',headers: {我们要往这里加东西 }data: null,  ...}
    api.interceptors.request.use((config) => {
    // // 从浏览器取出 token 
    const token = localStorage.getItem('token')
    // // 如果有 token,加到请求头里
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


// Auth           
  //    /api/auth/register 
export const register = (data) => api.post('/auth/register', data)
export const login = (data) => api.post('/auth/login', data)



// Decks
export const getDecks = () => api.get('/decks')
export const createDeck = (data) => api.post('/decks', data)
export const updateDeck = (id, data) => api.put(`/decks/${id}`, data)
export const deleteDeck = (id) => api.delete(`/decks/${id}`)


// Cards
export const getCards = (deckId) => api.get(`/cards/${deckId}`)
export const createCard = (deckId, data) => api.post(`/cards/${deckId}`, data)
export const updateCard = (id, data) => api.put(`/cards/${id}`, data)
export const deleteCard = (id) => api.delete(`/cards/${id}`)



// Review
export const getDueCards = (deckId) => api.get(`/review/${deckId}/due`)
export const submitReview = (cardId, quality) => api.post(`/review/${cardId}`, { quality })



export default api
