import axios from 'axios';

//export const API = axios.create({baseURL: 'http://localhost:5000' });
export const API = axios.create({baseURL: 'https://gymbud-tracker.herokuapp.com' });

//ignore
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)



export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)

export const getUsers = () => API.get('/users/')

export const getUser = (id) => API.post('/users/:id')

export const AddExercise = (id, entry) => API.post(`/users/${id}`, entry)

export const RemoveExercise = (id, exerciseId) => API.delete(`/users/${id}/${exerciseId}`)

export const AddTarget = (id, exerciseId, exercise) => API.post(`/users/${id}/${exerciseId}`, exercise)

export const UpdateExercise = (id, exerciseId, exercise) => API.patch(`/users/${id}/${exerciseId}`, exercise)