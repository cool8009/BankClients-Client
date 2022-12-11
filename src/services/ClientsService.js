import axios from "axios";
const baseUrl = "http://localhost:5167/api";

const clientsRoute = `${baseUrl}/Clients`;


const ClientService = {
    async getAllClients() {
        let clients = [];
        const tempResult = (await axios.get(`${clientsRoute}`)).data;
        tempResult.map((client) => clients.push(client))
        return clients;
    },

    async addClient(object) {
        return (await axios.post(`${clientsRoute}`, object)).data;
    },

    async getClientById(id) {
        let client = {};
        const tempResult = (await axios.get(`${clientsRoute}/${id}`)).data
        client = tempResult;
        return client;
    },

}



export default ClientService;