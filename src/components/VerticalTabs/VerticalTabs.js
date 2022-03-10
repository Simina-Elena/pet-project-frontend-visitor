import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from "axios";
import {authHeader, AuthService} from "pet-project-frontend-sharedcomponents";
import {useEffect, useState} from "react";
import {
    ListItem,
    List,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider, Modal, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {DatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as yup from "yup";
import {useFormik} from "formik";

const useStyles = makeStyles({
    tabs: {
        "& .MuiTabs-indicator": {
            backgroundColor: "orange",
            height: 3,
        },
        root: {
            color: 'red'
        }
    }
})

const validationSchema = yup.object({
    username: yup
        .string('Enter your username')
        .max(25, 'Username must not be longer that 25 chars')
        .required('Username is required'),
    firstName: yup
        .string('Enter your first name')
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    lastName: yup
        .string('Enter your last name')
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    phoneNumber: yup
        .string('Enter your phone number')
        .matches(/^(\(\d{3}\)|\d{3})-?\d{3}-?\d{4}$/, 'Please enter valid phone number')
        .required('Phone number is required'),
    city: yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    country: yup
        .string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
});

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function VerticalTabs({user, updateUser}) {
    const [value, setValue] = useState(0);
    const [adoptions, setAdoptions] = useState([])
    const [loading, setLoading] = useState(true)
    const [values, setValues] = useState({
        open: false,
        username: '',
        firstName: '',
        lastName: '',
        city: '',
        country: '',
        number: '',
        street: '',
        zip: '',
        email: '',
        phoneNumber: '',
        gender: '',
        date: new Date()
    });
    const classes = useStyles()

    const genders = [
        {
            value: 'FEMALE',
            label: 'female',
        },
        {
            value: 'MALE',
            label: 'male',
        },

        {
            value: 'OTHER',
            label: 'other',
        },
    ];

    const handleChangeTab = (event, newValue) => {
        setValue(newValue);
    };

    let address = ""
    if (user.address)
        address = 'city: ' + user.address.city + ', country: ' + user.address.country +
            ', street: ' + user.address.street + ', number: ' + user.address.number +
            ', zip code: ' + user.address.zip


    const getAdoptions = async () => {
        const data = await axios.get(`http://localhost:8080/api/adoptions/byVisitor?visitorId=${AuthService.getCurrentUser().id}`,
            {headers: authHeader()})
        const res = await data.data
        console.log(res)
        setAdoptions(res)
        setLoading(false)
    }

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
        getAdoptions()
    }, [])

    const formik = useFormik({
        initialValues: {
            username: values.username,
            email: values.email,
            phoneNumber: values.phoneNumber,
            firstName: values.firstName,
            lastName: values.lastName,
            city: values.city,
            country: values.country,
            street: values.street,
            number: values.number,
            zip: values.zip,
            gender: values.gender,
            date: values.date
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            const username = values.username
            const firstName = values.firstName
            const lastName = values.lastName
            const phoneNumber = values.phoneNumber
            const email = values.email
            const gender = values.gender
            const city = values.city
            const country = values.country
            const number = values.number
            const street = values.street
            const zip = values.zip
            const address = {city: city, country: country, number: number, street: street, zip: zip}
            const birthDate = new Date(values.date.getFullYear() + '-' + (values.date.getMonth() + 1) + '-' + (values.date.getDate() + 1)).toISOString().substring(0, 10)
            const data = await axios.patch(`http://localhost:8080/api/visitors/profile-update/${AuthService.getCurrentUser().username}`,
                {
                    username,
                    address,
                    email,
                    phoneNumber,
                    birthDate,
                    gender,
                    firstName,
                    lastName
                }, {headers: authHeader()})
            const resp = data.data
            AuthService.addUserToLocalStorage(resp)
            updateUser(resp)
            handleClose()
        },
    });


    const handleOpen = () => {
        formik.values.username = user.username
        formik.values.email = user.email
        formik.values.phoneNumber = user.phoneNumber
        formik.values.gender = user.gender
        formik.values.date = user.birthDate
        formik.values.firstName = user.firstName
        formik.values.lastName = user.lastName
        if (user.address) {
            formik.values.zip = user.address.zip
            formik.values.street = user.address.street
            formik.values.number = user.address.number
            formik.values.city = user.address.city
            formik.values.country = user.address.country
        }

        setValues({...values, open: true})
    }

    const handleClose = () => {
        setValues({...values, open: false})
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        '& .MuiTextField-root': {m: 1, width: '25ch'},

    };


    return (
        <Box sx={{display: 'flex'}}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChangeTab}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider'}}
                // TabIndicatorProps={{
                //     style: {
                //         backgroundColor: "#fe6d73"
                //     }
                // }}
            >
                <Tab label="Account information" {...a11yProps(0)} />
                <Tab label="Adoptions" {...a11yProps(1)} />
                <Tab label="Reservations" {...a11yProps(2)} />
            </Tabs>

            <TabPanel value={value} index={0}>
                <div className="px-4 pt-4">
                    <div className="flex flex-col space-y-1">
                        <div>
                            <h3 className="text-2xl font-semibold">Basic Information
                                <img onClick={handleOpen}
                                     className="float-right"
                                     width="35px"
                                     src="https://img.icons8.com/cute-clipart/64/000000/edit.png"
                                     alt={'edit info'}/>
                            </h3>
                            <hr/>
                        </div>
                        {/*edit info modal*/}
                        <Modal
                            open={values.open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title-edit"
                            aria-describedby="modal-modal-description-edit"
                        >
                            <Box sx={style} component="form" onSubmit={formik.handleSubmit}>
                                <img width='30px' align='left' className="mr-2"/>
                                <Typography id="modal-modal-title-edit" variant="h6" component="h2" mb='10px'
                                            fontWeight='600'>
                                    Update visitor info
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid container item xs={6} direction="column">
                                        <TextField
                                            label="username"
                                            id="username"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={formik.values.username}
                                            onChange={formik.handleChange}
                                            error={formik.touched.username && Boolean(formik.errors.username)}
                                            helperText={formik.touched.username && formik.errors.username}
                                        />
                                        <TextField
                                            label="first name"
                                            id="firstName"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={formik.values.firstName}
                                            onChange={formik.handleChange}
                                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                            helperText={formik.touched.firstName && formik.errors.firstName}
                                        />
                                        <TextField
                                            label="last name"
                                            id="lastName"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={formik.values.lastName}
                                            onChange={formik.handleChange}
                                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                            helperText={formik.touched.lastName && formik.errors.lastName}
                                        />
                                        <TextField
                                            label="email"
                                            id="email"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                        />
                                        <TextField
                                            label="phone number"
                                            id="phoneNumber"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={formik.values.phoneNumber}
                                            onChange={formik.handleChange}
                                            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                        />
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                label="Birthdate"
                                                value={formik.values.date}
                                                onChange={(newValue) => {
                                                    formik.setFieldValue("date", newValue)
                                                }}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid container item xs={6} direction="column">
                                        <TextField
                                            label="city"
                                            id="city"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={formik.values.city}
                                            onChange={formik.handleChange}
                                            error={formik.touched.city && Boolean(formik.errors.city)}
                                            helperText={formik.touched.city && formik.errors.city}
                                        />
                                        <TextField
                                            label="country"
                                            id="country"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={formik.values.country}
                                            onChange={formik.handleChange}
                                            error={formik.touched.country && Boolean(formik.errors.country)}
                                            helperText={formik.touched.country && formik.errors.country}
                                        />
                                        <TextField
                                            label="number"
                                            id="number"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={formik.values.number}
                                            onChange={formik.handleChange}
                                        />
                                        <TextField
                                            label="street"
                                            id="street"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={formik.values.street}
                                            onChange={formik.handleChange}
                                        />
                                        <TextField
                                            label="zip"
                                            id="zip"
                                            sx={{m: 1, width: '50ch'}}
                                            color="secondary"
                                            size="small"
                                            value={formik.values.zip}
                                            onChange={formik.handleChange}
                                        />
                                        <FormControl>
                                            <InputLabel color="secondary" id="select-gender">gender</InputLabel>
                                            <Select
                                                color="secondary"
                                                sx={{width: '24.5ch', marginLeft: '7px', marginTop: '6px'}}
                                                labelId="select-gender"
                                                id="gender"
                                                value={formik.values.gender}
                                                label="gender"
                                                onChange={formik.handleChange('gender')}>
                                                {genders.map((gender) => (
                                                    <MenuItem key={gender.value} value={gender.value}>
                                                        {gender.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <button
                                    type="submit"
                                    className="mx-40 mt-8 mb-4 py-2 px-14 rounded-full bg-gradient-to-r from-baseForGradient to-textColor text-white hover:from-pink-500 hover:to-orange-500 tracking-widest focus:bg-black transition duration-200">
                                    Update
                                </button>
                            </Box>
                        </Modal>
                        <Grid container rowSpacing={3} columnSpacing={3}>
                            <Grid item md={6} >
                                <div className="mb-4">
                                    <label className="text-xl ">Full Name</label>
                                    <input type="text"
                                           value={user.firstName ? user.firstName + ' ' + user.lastName : ' '}
                                           className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                                           disabled/>
                                </div>
                                <div className="mb-4">
                                    <label className="text-xl ">Username</label>
                                    <input type="text" value={user.username}
                                           className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                                           disabled/>
                                </div>
                                <div className="mb-4">
                                    <label className="text-xl ">Birthday</label>
                                    <input type="text"
                                           value={user.birthDate ? user.birthDate : ' '}
                                           className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                                           disabled/>
                                </div>
                            </Grid>
                            <Grid item md={6}>
                                <div className="mb-4">
                                    <label className="text-xl ">Email</label>
                                    <input type="text" value={user.email}
                                           className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                                           disabled/>
                                </div>
                                <div className="mb-4">
                                    <label className="text-xl ">Phone number</label>
                                    <input type="text"
                                           value={user.phoneNumber}
                                           className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                                           disabled/>
                                </div>
                                <div className="mb-4">
                                    <label className="text-xl ">Gender</label>
                                    <input type="text"
                                           value={user.gender ? user.gender : ' '}
                                           className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                                           disabled/>
                                </div>
                            </Grid>
                        </Grid>
                        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                            <div className="form-item w-full">
                                <label className="text-xl ">Address</label>
                                <input type="text"
                                       value={address}
                                       className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                                       disabled/>
                            </div>
                        </div>
                        <div>
                            <h3 className="mt-8 text-2xl font-semibold ">More About Me</h3>
                            <hr/>
                        </div>
                        <div className="form-item w-full">
                            <label className="text-xl ">Biography</label>
                            <textarea cols="30" rows="10"
                                      className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                                      disabled>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem natus nobis odio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eveniet fugiat? Explicabo assumenda dignissimos quisquam perspiciatis corporis sint commodi cumque rem tempora!</textarea>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold">My Social Media</h3>
                            <hr/>
                        </div>
                        <div className="form-item">
                            <label className="text-xl ">Instagram</label>
                            <input type="text" value="https://instagram.com/"
                                   className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                                   disabled/>
                        </div>
                        <div className="form-item">
                            <label className="text-xl ">Facebook</label>
                            <input type="text" value="https://facebook.com/"
                                   className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                                   disabled/>
                        </div>
                        <div className="form-item">
                            <label className="text-xl ">Twitter</label>
                            <input type="text" value="https://twitter.com/"
                                   className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200  "
                                   disabled/>
                        </div>
                    </div>
                </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <div className="px-4 pt-4">
                    <div>
                        <h3 className="text-2xl font-semibold">Accepted adoptions</h3>
                        <hr/>
                    </div>
                    <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                        {loading === false ? adoptions.map((adoption) =>
                            <List sx={{width: '100%', bgcolor: 'background.paper'}}>
                                <ListItem alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt={adoption.pet.name} src="/static/images/avatar/1.jpg"/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={adoption.pet.name}
                                        secondary={
                                            <Typography
                                                sx={{display: 'inline'}}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Age: {petAge(adoption.pet)},
                                                Gender: {adoption.pet.gender},
                                                Breed: {adoption.pet.race},
                                                Color: {adoption.pet.color}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li"/>
                            </List>
                        ) : <p>No adoptions accepted yet...</p>}
                    </div>
                </div>
            </TabPanel>

            <TabPanel value={value} index={2}>
                Coming soon
            </TabPanel>
        </Box>
    );
}