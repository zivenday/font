
import axios from 'axios';
let apiUrl='/api';
export const removeFeedback=params=>{  return axios.get(`${apiUrl}/feedbacks/remove`,{params:params})}
export const queryFeedbacks=params=>{  return axios.get(`${apiUrl}/feedbacks/query`,{params:params})}