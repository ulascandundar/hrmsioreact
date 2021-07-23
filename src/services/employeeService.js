import axios from "axios";

export default class EmployeeService{



    employerupdateconfirm(id) {
        return axios.put("http://localhost:8080//api/employees/employerupdateconfirm?id="+id);
      }
}