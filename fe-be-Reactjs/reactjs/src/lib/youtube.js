import axios from "axios";

const api = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
    maxResults: 12,
    part: "snippet",
  },
});

export default api;
