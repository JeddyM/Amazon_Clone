import axios from "axios";


const instance = axios.create({

//the local api endpoint
baseURL:'http://127.0.0.1:5001/clone-a09e4/us-central1/api'

});


export default instance;