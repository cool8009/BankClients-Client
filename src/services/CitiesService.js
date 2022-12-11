import axios from "axios";
const baseUrl = "http://localhost:5167/api";

const citiesRoute = `${baseUrl}/Cities`;


const CitiesService = {
    async getAllCities() {
        let myCities = [];
        const tempResult = (await axios.get(`${citiesRoute}`)).data;
        tempResult.map((city) => myCities.push(city))
        return myCities;
    },

    async getCityById(id) {
        let myCity = {};
        const tempResult = (await axios.get(`${citiesRoute}/${id}`)).data
        myCity = tempResult;
        return myCity;
    }, 

}



export default CitiesService;