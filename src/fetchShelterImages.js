import axios from "axios";
import {authHeader} from "pet-project-frontend-sharedcomponents";

const getImages = async (shelterId) => {
    const data = await axios.get(`http://localhost:8080/api/images/for-shelter/${shelterId}`, {
        headers: authHeader(),
        "Content-Type": "multipart/form-data"
    })
    console.log(data.data)
    return await data.data
}

const getProfileImage = async (shelterId) => {
    const data = await axios.get(`http://localhost:8080/api/images/for-shelter/${shelterId}`, {
        headers: authHeader(),
        "Content-Type": "multipart/form-data"
    })
    console.log(shelterId + " " + data.data[0].name)
    return await data.data[0].name
}

const fetchShelterImages = {
    getImages,
    getProfileImage
}

export default fetchShelterImages
