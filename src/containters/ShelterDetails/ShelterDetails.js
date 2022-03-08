import axios from "axios";
import {useEffect, useState} from "react";
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";


export default function ShelterDetails(props) {
    const [shelter, setShelter] = useState(props.location.state)
    const [activities, setActivities] = useState([])

    const [values, setValues] = useState({
        loading: true,
        name: '',
        age: '',
        breed: '',
        color: '',
        gender: '',
        open: false,
    });

    const genders = [
        {
            value: 'FEMALE',
            label: 'female',
        },
        {
            value: 'MALE',
            label: 'male',
        },

    ];

    const handleOpen = () => setValues({...values, open: true})

    const handleClose = () => {
        values.gender = ''
        values.race = ''
        values.age = ''
        values.name = ''
        values.color = ''
        setValues({...values, open: false})
    };

    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
        console.log(values)
    };

    const capitalize = (petName) => {
        return petName.charAt(0).toUpperCase() + petName.slice(1)
    }

    const onSubmitAddPet = async (e) => {
        e.preventDefault()
        let name = capitalize(values.name)
        let age = values.age
        let color = values.color
        let race = values.race
        let gender = values.gender
        await axios.post(`http://localhost:8080/api/pet/add/${shelter.id}`,
            {
                name,
                gender,
                age,
                color,
                race,
            })
        handleClose()
    }

    const getActivities = async () => {
        const data = await axios.get(`http://localhost:8080/api/activities?shelterId=${shelter.id}`)
        const res = await data.data
        setActivities(res)
        console.log(activities)
    }

    useEffect(() => {
        getActivities()
        setShelter(props.location.state)
    }, [])

    // add pet modal style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        '& .MuiTextField-root': {m: 1, width: '25ch'}
    };

    return (
        <div className="bg-page py-14">
            {/*<h3 className="text-2xl tracking-widest text-green-600 text-center"></h3>*/}
            <h1 className="mt-8 text-center text-5xl text-textColor font-bold">Shelter's Information</h1>
            <div className="md:flex md:justify-center md:space-x-8 md:px-14">
                <div
                    className="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
                    <div className="w-sm">
                        <img className="w-64"
                             src="https://img.freepik.com/free-vector/dog-walking-concept-illustration_114360-3169.jpg?w=740"
                             alt=""/>
                        <div className="mt-4 text-green-600 text-center">
                            <h1 className="text-xl text-textColor font-bold">Activities</h1>
                            {activities.length > 0 ? (activities.map((activity) =>
                                <p className="mt-4 text-gray-600">
                                    <ul className="leading-relaxed">
                                        <li key={activity.id}>Activity type: {activity.activityType}</li>
                                        <li key={activity.id}>Capacity: {activity.capacity} room(s)</li>
                                    </ul>
                                </p>
                            )) : (<p className="mt-4 text-gray-600">No activities yet</p>)}
                            <button
                                className="mt-8 mb-4 py-2 px-14 rounded-full bg-gradient-to-r from-baseForGradient to-textColor text-white hover:from-pink-500 hover:to-orange-500 tracking-widest focus:bg-black transition duration-200">Booking
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
                    <div className="w-sm">
                        <img className="w-64"
                             src="https://img.freepik.com/free-vector/pet-location-icon-with-paw-print_1284-42578.jpg?w=740"
                             alt=""/>
                        <div className="mt-4 text-green-600 text-center">
                            <h1 className="text-xl text-textColor font-bold">Address</h1>
                            {shelter.address !== null ? (<p className="mt-4 text-gray-600">
                                    <ul>
                                        <li>City: {shelter.address.city}</li>
                                        <li>Country: {shelter.address.country}</li>
                                        <li>Street: {shelter.address.street}</li>
                                        <li>Number: {shelter.address.number}</li>
                                        <li>Zipcode:{shelter.address.zip}</li>
                                    </ul>
                                </p>) :
                                <p className="mt-4 text-gray-600">No address yet</p>}
                            <button
                                className="mt-8 mb-4 py-2 px-14 rounded-full bg-gradient-to-r from-baseForGradient to-textColor text-white tracking-widest hover:from-pink-500 hover:to-orange-500 transition duration-200">View
                                on map
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className="mt-16 py-4 px-4 bg-whit w-72 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-110 transition duration-500 mx-auto md:mx-0">
                    <div className="w-sm">
                        <img className="w-64"
                             src="https://images01.nicepage.com/c461c07a441a5d220e8feb1a/8cc47b39e719570b996d9879/dsds.jpg"
                             alt=""/>
                        <div className="mt-4 text-green-600 text-center">
                            <h1 className="text-xl text-textColor font-bold">Contact</h1>
                            <p className="mt-4 text-gray-600">
                                <ul className="leading-relaxed">
                                    <li><img className='inline' width='40px'
                                             src="https://img.icons8.com/bubbles/50/000000/email--v1.png"/>{shelter.email}
                                    </li>
                                    <li><img className='inline' width='40px'
                                             src="https://img.icons8.com/bubbles/50/000000/phone--v2.png"/>{shelter.phoneNumber}
                                    </li>
                                    <li><img className='inline' width='40px'
                                             src="https://img.icons8.com/bubbles/50/000000/google-calendar.png"/>{shelter.joinedDate}
                                    </li>

                                </ul>
                            </p>
                            <button
                                onClick={handleOpen}
                                className="mt-8 mb-4 py-2 px-14 rounded-full bg-gradient-to-r from-baseForGradient to-textColor text-white tracking-widest hover:from-pink-500 hover:to-orange-500 transition duration-200">Give
                                a pet
                            </button>
                            {/*add pet modal*/}
                            <Modal
                                open={values.open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>

                                    <img align='left' className="mr-3 ml-20" width='40px'  src="https://img.icons8.com/external-filled-outline-icons-maxicons/85/000000/external-animal-insurance-filled-outline-filled-outline-icons-maxicons.png"/>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" mb='10px'
                                                fontFamily='Lora' fontWeight='600'>
                                        Give pet
                                    </Typography>
                                    <Box onSubmit={onSubmitAddPet} component="form"
                                         sx={{display: 'table', textAlign: 'center'}}>
                                        <TextField
                                            label="name"
                                            id="name"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={values.name}
                                            onChange={handleChange('name')}
                                        />
                                        <FormControl>
                                            <InputLabel color="secondary" id="select-gender">gender</InputLabel>
                                            <Select
                                                color="secondary"
                                                sx={{width: '24ch'}}
                                                labelId="select-gender"
                                                id="gender"
                                                value={values.gender}
                                                label="gender"
                                                onChange={handleChange('gender')}>
                                                {genders.map((gender) => (
                                                    <MenuItem key={gender.value} value={gender.value}>
                                                        {gender.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            label="age"
                                            id="age"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={values.age}
                                            onChange={handleChange('age')}
                                        />
                                        <TextField
                                            label="breed"
                                            id="breed"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={values.race}
                                            onChange={handleChange('race')}
                                        />
                                        <TextField
                                            label="color"
                                            id="color"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={values.color}
                                            onChange={handleChange('color')}
                                        />
                                        <button type='submit' className='mt-4 text-xl w-1/2 text-white py-2 rounded-xl shadow-lg bg-gradient-to-r from-baseForGradient to-textColor hover:from-pink-500 hover:to-orange-500'>
                                            Submit
                                        </button>
                                    </Box>
                                </Box>
                            </Modal>
                            {/*add pet modal end*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
