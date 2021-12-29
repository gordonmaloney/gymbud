import axios from 'axios';

//const API = axios.create({baseURL: 'http://localhost:5000' });
const API = axios.create({baseURL: 'http://gymbud-tracker.herokuapp.com/' });

//ignore
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)



export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)

export const getUsers = () => API.get('/users')

//not working vvv, works on postman
export const getUser = (id) => API.post('/users/:id')

export const AddExercise = (id, entry) => API.post(`/users/${id}`, entry)

export const AddTarget = (id, exerciseId, exercise) => API.post(`/users/${id}/${exerciseId}`, exercise)

export const UpdateExercise = (id, exerciseId, exercise) => API.patch(`/users/${id}/${exerciseId}`, exercise)