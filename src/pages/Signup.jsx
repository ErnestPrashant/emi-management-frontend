import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";
import { BottomWar } from "../components/BottomWar";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export const Signup = () => {
    const [firstname, setfirstname] = useState("")
    const [lastname, setlastname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    return <div className="h-screen bg-gray-500">
        <div className="flex items-center justify-center h-full">
            <div className="bg-white px-8 py-2 rounded-lg shadow-lg w-full max-w-sm">
                <Heading label="Sign Up" />
                <SubHeading label="Enter your information to create an account" />
                <InputBox onChange={e => { setfirstname(e.target.value) }} label="First Name" />
                <InputBox onChange={e => { setlastname(e.target.value) }} label="Last Name" />
                <InputBox onChange={e => { setemail(e.target.value) }} label="E-mail" />
                <InputBox onChange={e => { setpassword(e.target.value) }} label="Password" />
                <Button onpress={async () => {
                    const response = await axios.post('http://localhost:4500/api/users/register/',
                        {
                            firstname,
                            lastname,
                            email,
                            password
                        });
                    //localStorage.setItem("token",response.data.token)
                }} label="Sign Up" />
                <BottomWar label="Already have an account ?" to={'/login'} buttonText="Sign In" />
            </div>
        </div>
    </div>
}
