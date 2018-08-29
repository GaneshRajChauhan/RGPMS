import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-1da42.firebaseio.com/'
});

export default instance;