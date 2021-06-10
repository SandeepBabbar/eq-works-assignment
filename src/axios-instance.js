import axios from 'axios';

const instance = axios.create({
     baseURL: "https://laser-knowing-barge.glitch.me",
});

export default instance;