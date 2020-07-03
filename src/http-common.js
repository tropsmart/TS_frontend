import axios from 'axios';

//n-word: json-server --watch db.json --routes routes.json

export default axios.create({
    //baseURL:"https://ts-appsweb-be.azurewebsites.net/",
    baseURL:"https://localhost:5001/",
    params: {"Access-Control-Allow-Origin": "*"},
    headers: {
        "Content-type": "application/json",
    }
});