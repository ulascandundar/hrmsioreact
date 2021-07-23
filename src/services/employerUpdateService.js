import axios from "axios";

export default class EmployerUpdateService{

    getAll() {
        return axios.get("http://localhost:8080/api/employerUpdate/getAll");
      }

      add(values) {
        return axios.post("http://localhost:8080/api/employerUpdate/add", values);
      }
}