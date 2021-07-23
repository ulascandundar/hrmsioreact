import axios from "axios"

export default class CandidateService{
    getCandidates() {
        return axios.get("http://localhost:8080/api/candidates/getall")
    }

    getCv() {
        return axios.get("http://localhost:8080/api/candidates/getallCv")
    }

    getCvId(id) {
        return axios.get("http://localhost:8080/api/candidates/getbyidcv?candidateId="+id)
    }

    likejobadvertisement(candidateId,jobAdvertisementId){
        return axios.put("http://localhost:8080/api/candidates/likejobadvertisement?candidateId="+candidateId+"&jobAdvertisementId="+jobAdvertisementId)
    }

    dislikejobadvertisement(candidateId,jobAdvertisementId){
        return axios.put("http://localhost:8080/api/candidates/dislikejobadvertisement?candidateId="+candidateId+"&jobAdvertisementId="+jobAdvertisementId)
    }

    updateGithub(candidateId,githubLink){
        return axios.put(`http://localhost:8080/api/candidates/updateGithub?candidateId=${candidateId}&githublink=${githubLink}`)
    }

    updateLinkedin(candidateId,linkedin){
        return axios.put(`http://localhost:8080/api/candidates/updateLinkedin?candidateId=${candidateId}&linkedinlink=${linkedin}`)
    }

    deleteGithub(candidateId){
        return axios.delete(`http://localhost:8080/api/candidates/deleteGithub?candidateId=${candidateId}`)
    }

    deleteLinkedin(candidateId){
        return axios.delete(`http://localhost:8080/api/candidates/deleteLinkedin?candidateId=${candidateId}`)
    }

   
}