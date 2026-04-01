import api from './axios'

// Profile
export const getProfile = () => api.get('/profile').then((r) => r.data)
export const updateProfile = (data) => api.put('/profile', data).then((r) => r.data)
export const getPublicPortfolio = (username) =>
  api.get(`/portfolio/public/${username}`).then((r) => r.data)

// Generic CRUD factory
const crudApi = (path) => ({
  getAll: () => api.get(path).then((r) => r.data),
  create: (data) => api.post(path, data).then((r) => r.data),
  update: (id, data) => api.put(`${path}/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`${path}/${id}`),
})

export const projectsApi = crudApi('/projects')
export const skillsApi = crudApi('/skills')
export const experiencesApi = crudApi('/experiences')
export const educationsApi = crudApi('/educations')
export const activitiesApi = crudApi('/activities')
