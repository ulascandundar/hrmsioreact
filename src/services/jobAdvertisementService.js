import axios from "axios"

export default class JobAdvertisementService{
    getJobAdvertisements(){
        return axios.get("http://localhost:8080/api/jobadverts/getAll")
    }

    getAllByFilteredAndPaged(pageNo, pageSize, filterOption) {
        return axios.post(`http://localhost:8080/api/jobadverts/getAllByFilteredAndPaged?pageNo=${pageNo}&pageSize=${pageSize}`, filterOption)
    }

    add(values){
        return axios.post("http://localhost:8080/api/jobadverts/add",values)
    }

    getAllByActivationStatusFalse(){
        return axios.get("http://localhost:8080/api/jobadverts/getAllByActivationStatusFalse")
    }

    delete(id){
        return axios.post("http://localhost:8080/api/jobadverts/delete?id="+id)
    }

    activate(id,status){
        return axios.put("http://localhost:8080/api/jobadverts/activate?activationStatus="+status+"&id="+id)
    }
    
}