import { Heading } from "../components/Heading"
import {SubHeading} from '../components/Subheading'
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWar } from "../components/BottomWar"
import { useState } from "react"
import axios from "axios"

export const Login = () => {
    const [email,setEmail] = useState("")
    const [password,setpassword] = useState("")

    return <div className="h-screen bg-gray-500">
        <div className="flex items-center justify-center h-full">
            <div className="bg-white px-8 py-2 rounded-lg shadow-lg w-full max-w-sm">
                <Heading label="Sign in" />
                <SubHeading label="Enter Crediantials to access your account "/>
                <InputBox onChange={e => {setEmail(e.target.value)}} label="E-mail"/>
                <InputBox onChange={e => {setpassword(e.target.value)}} label="Password"/>
                <Button onpress={async () => {
                    const response  = await axios.post('http://localhost:4500/api/users/login/',
                        {
                            email,
                            password
                        }
                    )
                    localStorage.setItem("token",response.data.token)
                }} label="Login" />
                <BottomWar label="Don't have an account" buttonText="Sign Up" to={'/signup'}/>
            </div>
        </div>
    </div>
}