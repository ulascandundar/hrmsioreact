import axios from "axios";

export default class LanguageService{

    getByCvId(cvId){
        return axios.get("http://localhost:8080/api/lang/getById?id="+cvId)
    }

    deleteLanguage(languageId){
        return axios.delete(`https://kodlamaio-hrms.herokuapp.com/api/language/deleteLanguage?languageId=${languageId}`)
    }

    addLanguage(language){
        return axios.post("http://localhost:8080/api/lang/add",language)
    }
}