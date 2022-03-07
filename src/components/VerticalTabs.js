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
    Divider, Modal
} from "@mui/material";
import {makeStyles} from "@mui/styles";

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
    const [openEditInfoModal, setOpenEditInfoModal] = useState(false)
    const classes = useStyles()

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

    const handleEditInfo = () => {

    }

    const handleOpen = () => {
        setOpenEditInfoModal(true)
    }

    const handleClose = () => {
        setOpenEditInfoModal(false)
    }

    return (
        <Box sx={{display: 'flex'}}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
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
                    <div className="flex flex-col space-y-8">
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
                        <Modal open={openEditInfoModal}
                               onClose={handleClose}
                               aria-labelledby="modal-modal-title"
                               aria-describedby="modal-modal-description"
                        >
                            <div
                                className=" h-full relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative items-center"
                            >
                                <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
                                    <div className="grid  gap-8 grid-cols-1">
                                        <div className="flex flex-col ">
                                            <div className="flex flex-col sm:flex-row items-center">
                                                <h2 className="font-semibold text-lg mr-auto">Edit information</h2>
                                            </div>
                                            <div className="mt-3">
                                                <div className="form">
                                                    <div className="md:space-y-2 mb-3">
                                                        <div className="flex items-center py-6">
                                                            <div
                                                                className="w-12 h-12 mr-4 flex-none rounded-xl border overflow-hidden">
                                                                <img className="w-12 h-12 mr-4 object-cover"
                                                                     src="https://images.unsplash.com/photo-1611867967135-0faab97d1530?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1352&amp;q=80"
                                                                     alt="Avatar Upload"/>
                                                            </div>
                                                            <label className="cursor-pointer ">
                                                        <span
                                                            className="focus:outline-none text-white text-sm py-2 px-4 rounded-full bg-gradient-to-r from-baseForGradient to-textColor text-white hover:from-pink-500 hover:to-orange-500">Browse</span>
                                                                <input type="file" className="hidden"
                                                                       multiple='multiple'/>
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="md:flex flex-row md:space-x-4 w-full text-xs">
                                                        <div className="mb-3 space-y-2 w-full text-xs">
                                                            <label className="font-semibold text-gray-600 py-2">
                                                                First name <abbr title="required">*</abbr></label>
                                                            <input placeholder="John"
                                                                   className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                                                   required="required" type="text"
                                                                   name="integration[shop_name]"
                                                                   id="integration_shop_name"/>
                                                            <p className="text-red text-xs hidden">Please fill out this
                                                                field.</p>
                                                        </div>
                                                        <div className="mb-3 space-y-2 w-full text-xs">
                                                            <label className="font-semibold text-gray-600 py-2">
                                                                Last name <abbr title="required">*</abbr></label>
                                                            <input placeholder="Doe"
                                                                   className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                                                   required="required" type="text"
                                                                   name="integration[shop_name]"
                                                                   id="integration_shop_name"/>
                                                            <p className="text-red text-xs hidden">Please fill out this
                                                                field.</p>
                                                        </div>
                                                        <div className="mb-3 space-y-2 w-full text-xs">
                                                            <label
                                                                className="font-semibold text-gray-600 py-2">Gender<abbr
                                                                title="required">*</abbr></label>
                                                            <select
                                                                className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4 md:w-full "
                                                                required="required" name="integration[city_id]"
                                                                id="integration_city_id">
                                                                <option value="">Female</option>
                                                                <option value="">Male</option>
                                                                <option value="">Other</option>
                                                            </select>
                                                            <p className="text-sm text-red-500 hidden mt-3"
                                                               id="error">Please
                                                                fill out this field.</p>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 space-y-2 w-full text-xs">
                                                        <label className=" font-semibold text-gray-600 py-2">
                                                            Facebook address
                                                        </label>
                                                        <div
                                                            className="flex flex-wrap items-stretch w-full mb-4 relative">
                                                            <div className="flex">
									<span
                                        className="flex items-center leading-normal bg-grey-lighter border-1 rounded-r-none border border-r-0 border-blue-300 px-3 whitespace-no-wrap text-grey-dark text-sm w-12 h-10 bg-blue-300 justify-center items-center  text-xl rounded-lg text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                   </span>
                                                            </div>
                                                            <input type="text"
                                                                   className="flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border border-l-0 h-10 border-grey-light rounded-lg rounded-l-none px-3 relative focus:border-blue focus:shadow"
                                                                   placeholder="https://"/>
                                                        </div>
                                                    </div>
                                                    <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                                                        <div className="w-full flex flex-col mb-3">
                                                            <label className="font-semibold text-gray-600 py-2">
                                                                City</label>
                                                            <input placeholder="City"
                                                                   className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                                                   type="text" name="integration[street_address]"
                                                                   id="integration_street_address"/>
                                                        </div>
                                                        <div className="w-full flex flex-col mb-3">
                                                            <label className="font-semibold text-gray-600 py-2">
                                                                Country</label>
                                                            <input placeholder="Country"
                                                                   className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                                                   type="text" name="integration[street_address]"
                                                                   id="integration_street_address"/>
                                                        </div>
                                                    </div>
                                                    <div className="md:flex md:flex-row md:space-x-4 w-full text-xs">
                                                        <div className="w-full flex flex-col mb-3">
                                                            <label className="font-semibold text-gray-600 py-2">
                                                                Street</label>
                                                            <input placeholder="Street"
                                                                   className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                                                   type="text" name="integration[street_address]"
                                                                   id="integration_street_address"/>
                                                        </div>
                                                        <div className="w-full flex flex-col mb-3">
                                                            <label className="font-semibold text-gray-600 py-2">
                                                                Number</label>
                                                            <input placeholder="Number"
                                                                   className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                                                   type="text" name="integration[street_address]"
                                                                   id="integration_street_address"/>
                                                        </div>
                                                        <div className="w-full flex flex-col mb-3">
                                                            <label className="font-semibold text-gray-600 py-2">
                                                                Zipcode</label>
                                                            <input placeholder="Zipcode"
                                                                   className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                                                                   type="text" name="integration[street_address]"
                                                                   id="integration_street_address"/>
                                                        </div>

                                                    </div>

                                                    <div className="flex-auto w-full mb-1 text-xs space-y-2">
                                                        <label
                                                            className="font-semibold text-gray-600 py-2">Biography</label>
                                                        <textarea required="" name="message" id=""
                                                                  className="w-full min-h-[100px] max-h-[300px] h-28 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg  py-4 px-4"
                                                                  placeholder="Some words about you"
                                                                  spellCheck="false"></textarea>
                                                    </div>
                                                    <div
                                                        className="mt-5 text-right md:space-x-3 md:block flex flex-col-reverse">
                                                        <button
                                                            onClick={handleClose}
                                                            className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"> Cancel
                                                        </button>
                                                        <button
                                                            onClick={handleEditInfo}
                                                            className="mb-2 md:mb-0 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full bg-gradient-to-r from-baseForGradient to-textColor text-white hover:from-pink-500 hover:to-orange-500">Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal>
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