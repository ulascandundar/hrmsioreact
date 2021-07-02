import axios from "axios"

export default class JobPositionService{
    getJobPositions() {
        return axios.get("http://localhost:8080/api/jobposition/getAll")
    }

    add(data){
        return axios.post("http://localhost:8080/api/jobposition/add",data)
    }
}