import axios from "axios";

export default class ImageService{

    upload(id,image){
        return axios.post("http://localhost:8080/api/image/photoUpload?userId="+id, image)
    }

    getById(id){
        return axios.get("http://localhost:8080/api/image/getbyuserid?id="+id)
    }

}