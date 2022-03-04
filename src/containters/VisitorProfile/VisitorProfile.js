import {authHeader, AuthService} from "pet-project-frontend-sharedcomponents";
import axios from "axios";
import {useEffect, useState} from "react";

export default function VisitorProfile() {
    const [user, setUser] = useState([])
    console.log(AuthService.getCurrentUser())
    const getVisitor = async () => {
        const data = await axios.get(`http://localhost:8080/api/visitors/profile?username=${AuthService.getCurrentUser().username}`, {headers: authHeader()})
        const resp = await data.data
        console.log(resp)
        setUser(resp)
    }

    let address = ""
    if (user.address)
        address = 'city: ' + user.address.city + ', country: ' + user.address.country +
            ', street: ' + user.address.street + ', number: ' + user.address.number +
            ', zip code: ' + user.address.zip


    useEffect(() => {
        getVisitor()
    }, [])

    return (
        <div className="container mx-auto px-40">
            <div
                className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded mt-5 overflow-hidden">
                <div className="top h-64 w-full bg-blue-600 overflow-hidden relative">
                    <img
                        src="https://img.freepik.com/free-vector/early-morning-cartoon-nature-landscape-sunrise_107791-10161.jpg?w=1380"
                        alt="" className="bg w-full h-full object-cover object-center absolute z-0"/>
                    <div
                        className="flex flex-col justify-center items-center relative h-full bg-black bg-opacity-50 text-white">
                        <img
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                            className="h-28 w-28 object-cover rounded-full"/>
                        <h1 className="text-2xl font-semibold">{user.username}</h1>
                        <h4 className="text-sm font-semibold">Joined Since '19</h4>
                    </div>
                </div>
                <div className="grid grid-cols-12 bg-white ">

                    <div
                        className="col-span-12 w-full px-3 py-6 justify-center flex space-x-4 border-b border-solid md:space-x-0 md:space-y-4 md:flex-col md:col-span-2 md:justify-start ">

                        <a href="http://localhost:3001/profile" className="text-sm p-2 text-white text-center rounded font-bold bg-gradient-to-r from-baseForGradient to-textColor hover:from-pink-500 hover:to-orange-500 py-2 rounded-xl shadow-lg">Basic
                            Information</a>
                        {/*TODO: show when button is clicked*/}
                        <a href="http://localhost:3001/profile?pets=true"
                           className="text-sm p-2 bg-indigo-200 text-center rounded font-semibold hover:bg-indigo-700 hover:text-gray-200">Another
                            Information</a>

                        <a href="#"
                           className="text-sm p-2 bg-indigo-200 text-center rounded font-semibold hover:bg-indigo-700 hover:text-gray-200">Another
                            Something</a>

                    </div>

                    <div
                        className="col-span-12 md:border-solid md:border-l md:border-black md:border-opacity-25 h-full pb-12 md:col-span-10">
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
                                               value={user.gender? user.gender : ' '}
                                               className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                                               disabled/>
                                    </div>

                                    <div className="form-item w-full">
                                        <label className="text-xl ">Birthday</label>
                                        <input type="text"
                                               value={user.birthDate? user.birthDate : ' '}
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
                    </div>

                </div>
            </div>
        </div>

    )
}