import axios from "axios";

export default class CandidateSkillService{

    getByCvId(cvId){
        return axios.get("http://localhost:8080/api/candidateskills/getById?id="+cvId)
    }

    addSkill(skill){
        return axios.post("http://localhost:8080/api/candidateskills/add",skill)
    }

    deleteSkill(skillId){
        return axios.delete("http://localhost:8080/api/candidateskills/deleteSkill?skillId="+skillId)
    }
}