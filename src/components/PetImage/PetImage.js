import {useEffect, useState} from "react";
import axios from "axios";
import {authHeader} from "pet-project-frontend-sharedcomponents";

export default function PetImage({id}) {
    const [actualSrc, setActualSrc] = useState('No image')

    useEffect(() => {
        const getUrl = async (id) => {
            const data = await axios.get(`http://localhost:8080/api/images/for-pet/${id}`, {
                headers: authHeader(),
                "Content-Type": "multipart/form-data"
            })
            const resp = await data.data
            const url = resp[0]?.name
            console.log(url)
            return 'https://petprojectpetsimagesstorage.s3.amazonaws.com/' + url
        }
        getUrl(id).then((url) => setActualSrc(url))
        console.log(actualSrc)
    }, [id])

    return <img alt="pet image"
                loading="lazy"
                className="w-full rounded-xl"
                src={actualSrc}/>
}