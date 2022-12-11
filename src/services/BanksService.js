import axios from "axios";
const baseUrl = "http://localhost:5167/api";

const banksRoute = `${baseUrl}/Banks`;


const BanksService = {
    async getAllBanks() {
        let myBanks = [];
        const tempResult = (await axios.get(`${banksRoute}`)).data;
        tempResult.map((bank) => myBanks.push(bank))
        return myBanks;
    },

    async getBranchesForBankId(bankId) {
        let myBranchesForBankId = [];
        const tempResult = (await axios.get(`${banksRoute}/${bankId}`)).data
        tempResult.map((branch) => myBranchesForBankId.push(branch))
        return myBranchesForBankId;
    },

    async getAllBranches() {
        let myBranches = [];
        const tempResult = (await axios.get(`${banksRoute}/getallbranches`)).data
        tempResult.map((branch) => myBranches.push(branch))
        return myBranches;
    },

}



export default BanksService;