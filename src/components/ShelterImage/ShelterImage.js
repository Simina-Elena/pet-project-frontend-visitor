import {useEffect, useState} from "react";
import axios from "axios";
import {authHeader} from "pet-project-frontend-sharedcomponents";

export default function ShelterImage({id}) {
    const [actualSrc, setActualSrc] = useState('No image')

    useEffect(() => {
        const getUrl = async (id) => {
            const data = await axios.get(`http://localhost:8080/api/images/for-shelter/${id}`, {
                headers: authHeader(),
                "Content-Type": "multipart/form-data"
            })
            const resp = await data.data
            const url = resp[0]?.name
            console.log(url)
            return 'https://petprojectimagestorage.s3.amazonaws.com/' + url
        }
        getUrl(id).then((url) => setActualSrc(url))
        console.log(actualSrc)
    }, [id])

    return <img alt="shelter building"
                loading="lazy"
                className="lg:w-1/3 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={actualSrc}/>
}