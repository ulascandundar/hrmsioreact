import axios from "axios";

export default class SchoolService{

    getByCvId(cvId){
        return axios.get("http://localhost:8080/api/school/getById?id="+cvId)
    }

    addScholl(school){
        return axios.post("http://localhost:8080/api/school/add",school)
    }

    deleteSchool(schoolId){
        return axios.delete("http://localhost:8080/api/school/deleteSchool?schoolId="+schoolId)
    }
}