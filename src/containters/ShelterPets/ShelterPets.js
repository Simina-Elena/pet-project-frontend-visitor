import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {authHeader} from "pet-project-frontend-sharedcomponents";

export default function ShelterPets() {
    const shelterId = useParams().id
    const [pets, setPets] = useState([])
    const [loading, setLoading] = useState(true)
    const getPets = async () => {
        const data = await axios.get(`http://localhost:8080/api/pet/list/${shelterId}`,
            {headers: authHeader()})
        const res = await data.data
        console.log(res)
        setPets(res)
        setLoading(false)
    }
    console.log(pets)

    const petAge = (pet) => {
        if (pet.age < '1') {
            return (pet.age + " months")
        } else if (pet.age === '1') {
            return (pet.age + " year")
        } else {
            return (pet.age + " years")
        }
    }


    useEffect(() => {
        getPets()
    }, [])

    if (loading === true)
        return (<div>Loading...</div>)
    else
        return (
            <div
                className="min-h-screen bg-page flex justify-center items-center py-20">
                <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
                    {pets.map((pet) => (
                        <div
                            className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transform hover:scale-105 transition duration-500">
                            <div className="relative">
                                <img className="w-full rounded-xl"
                                     src="https://img.freepik.com/free-vector/cute-corgi-dog-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4181.jpg?t=st=1645106489~exp=1645107089~hmac=3ce379d2564334482b321bfd2c1eecfd6f6c90f07784cd283d2681a89968a345&w=740"
                                     alt="Colors"/>
                            </div>
                            <h1 className="mt-4 text-gray-800 text-2xl font-bold cursor-pointer">{pet.name}</h1>
                            <div className="my-4">
                                <div className="flex space-x-1 items-center">
                                    <img width='30px'
                                         src="https://img.icons8.com/external-flat-wichaiwi/64/000000/external-description-business-flat-wichaiwi.png"/>
                                    <p>Description: {pet.description}</p>
                                </div>
                                <div className="flex space-x-1 items-center">
                                    <img width='30px' src="https://img.icons8.com/dusk/64/000000/age.png"/>
                                    <p>Age: {petAge(pet)}</p>
                                </div>
                                <div className="flex space-x-1 items-center">
                                    <img width='30px' src="https://img.icons8.com/offices/30/000000/corgi.png"/>
                                    <p>Breed: {pet.race}</p>
                                </div>
                                <div className="flex space-x-1 items-center">
                                    <img width='30px' src="https://img.icons8.com/offices/30/000000/cat-butt.png"/>
                                    <p>Gender: {pet.gender}</p>
                                </div>
                                <div className="flex space-x-1 items-center">
                                    <img width='30px'
                                         src="https://img.icons8.com/offices/30/000000/paint-palette.png"/>
                                    <p>Color: {pet.color}</p>
                                </div>
                                <div className="flex space-x-1 items-center">
                                    <img width='30px'
                                         src="https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/58/000000/external-calendar-calendar-and-date-vitaliy-gorbachev-flat-vitaly-gorbachev-28.png"/>
                                    <p>Joined date: {pet.joinedDate}</p>
                                </div>

                                <button
                                    className="mt-4 text-xl w-1/2 text-white bg-gradient-to-r from-baseForGradient to-textColor hover:from-pink-500 hover:to-orange-500 py-2  rounded-xl shadow-lg">
                                    Adopt
                                </button>
                                <button
                                    className='mt-4 text-xl w-1/2 text-white bg-gradient-to-r from-baseForGradient to-textColor hover:from-pink-500 hover:to-orange-500 py-2 rounded-xl shadow-lg'>Visit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
}