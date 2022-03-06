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
    ListItemButton,
    ListItemIcon,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider
} from "@mui/material";

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

export default function VerticalTabs({user}) {
    const [value, setValue] = useState(0);
    const [adoptions, setAdoptions] = useState([])
    const [loading, setLoading] = useState(true)

    const handleChange = (event, newValue) => {
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

    return (
        <Box sx={{flexGrow: 1, display: 'flex'}}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{borderRight: 1, borderColor: 'divider'}}
            >
                <Tab label="Account information" {...a11yProps(0)} />
                <Tab label="Adoptions" {...a11yProps(1)} />
                <Tab label="Reservations" {...a11yProps(2)} />

            </Tabs>
            <TabPanel value={value} index={0}>
                <div className="px-4 pt-4">
                    <form action="#" className="flex flex-col space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold">Basic Information</h3>
                            <hr/>
                        </div>
                        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                            <div className="form-item w-full">
                                <label className="text-xl ">Full Name</label>
                                <input type="text"
                                       value={user.firstName ? user.firstName + ' ' + user.lastName : ' '}
                                       className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                                       disabled/>
                            </div>
                            <div className="form-item w-full">
                                <label className="text-xl ">Username</label>
                                <input type="text" value={user.username}
                                       className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                                       disabled/>
                            </div>
                            <div className="form-item w-full">
                                <label className="text-xl ">Email</label>
                                <input type="text" value={user.email}
                                       className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                                       disabled/>
                            </div>
                            <div className="form-item w-full">
                                <label className="text-xl ">Phone number</label>
                                <input type="text"
                                       value={user.phoneNumber}
                                       className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                                       disabled/>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                            <div className="form-item w-full">
                                <label className="text-xl ">Gender</label>
                                <input type="text"
                                       value={user.gender ? user.gender : ' '}
                                       className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                                       disabled/>
                            </div>
                            <div className="form-item w-full">
                                <label className="text-xl ">Birthday</label>
                                <input type="text"
                                       value={user.birthDate ? user.birthDate : ' '}
                                       className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                                       disabled/>
                            </div>
                            <div className="form-item w-full">
                                <label className="text-xl ">Address</label>
                                <input type="text"
                                       value={address}
                                       className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                                       disabled/>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold ">More About Me</h3>
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
                    </form>
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
                            <List sx={{width: '100%',  bgcolor: 'background.paper'}}>
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