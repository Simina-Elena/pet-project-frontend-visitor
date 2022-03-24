import {authHeader, AuthService} from "pet-project-frontend-sharedcomponents";
import axios from "axios";
import {useEffect, useState} from "react";
import VerticalTabs from "../../components/VerticalTabs/VerticalTabs";

export default function VisitorProfile() {
    const [user, setUser] = useState([])
    console.log(AuthService.getCurrentUser())
    const getVisitor = async () => {
        const data = await axios.get(`http://localhost:8080/api/visitors/profile?username=${AuthService.getCurrentUser().username}`, {headers: authHeader()})
        const resp = await data.data
        console.log(resp)
        setUser(resp)
    }

    const updateUser = (user) => {
        setUser(user)
    }

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
                        <h1 className="text-2xl font-semibold font-content mt-2">{user.username}</h1>
                        {/*<h4 className="text-sm font-semibold">Joined Since '19</h4>*/}
                    </div>
                </div>

                    {/*<div*/}
                    {/*    className="col-span-12 w-full px-3 py-6 justify-center flex space-x-4 border-b border-solid md:space-x-0 md:space-y-4 md:flex-col md:col-span-2 md:justify-start ">*/}

                    {/*    <a href="http://localhost:3001/profile" className="text-sm p-2 text-white text-center rounded font-bold bg-gradient-to-r from-baseForGradient to-textColor hover:from-pink-500 hover:to-orange-500 py-2 rounded-xl shadow-lg">Basic*/}
                    {/*        Information</a>*/}
                    {/*    /!*TODO: show when button is clicked*!/*/}
                    {/*    <a href="http://localhost:3001/profile?pets=true"*/}
                    {/*       className="text-sm p-2 bg-indigo-200 text-center rounded font-semibold hover:bg-indigo-700 hover:text-gray-200">Another*/}
                    {/*        Information</a>*/}

                    {/*    <a href="#"*/}
                    {/*       className="text-sm p-2 bg-indigo-200 text-center rounded font-semibold hover:bg-indigo-700 hover:text-gray-200">Another*/}
                    {/*        Something</a>*/}

                    {/*</div>*/}
        <VerticalTabs user={user} updateUser={updateUser}/>
            </div>
        </div>

    )
}