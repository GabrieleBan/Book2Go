import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Context} from "@/components/context-provider.jsx";
import {Input} from "@/components/ui/input.js";
import User from "@/classes/User.js";
import {API} from "@/utils/api.js";


export function LoginComponent({ setShowLogin }) {
    const [doingRegistration, setDoingRegistration] = useState(false);
    const [showRegistrationSuccess, setShowRegistrationSuccess] = useState(false);
    let { user, login } =Context()
    const navigate= useNavigate();
    const { saveTokens }=Context();
    function handleLogin(usrname,pssword) {
        fetch(`${API.AUTH}/auth/login`,{
            method:"POST",
            body: JSON.stringify({
                username:usrname,
                password:pssword
            }),
            headers:{
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            if(!response.ok){
                document.getElementById("genericError").innerText="Credenziali errate"

            }
            else{
                response.json().then((tokenData)=>{
                    saveTokens({
                        accessToken: tokenData.accessToken,
                        refreshToken: tokenData.refreshToken,
                    })
                    console.log("token received correctly");
                    retrieveUserData(tokenData.accessToken)
                    setShowLogin(false);
                })


            }

        }).catch((error)=>{document.getElementById("genericError").innerText=error})



    }
    async function retrieveUserData(token) {

        if (!token) return;

        const user = await User.fetchMe(token);

        if (user) {
            console.log("Utente loggato:", user);
            login(user)
        }
    }
    function showError2User(errData) {
        const userError=document.getElementById("userError");
        const emailError=document.getElementById("emailError");
        const pwError=document.getElementById("pwError");
        let err;
        try{
            err=JSON.parse(errData)
        }catch {err=null}
        if(err && typeof err === "object") {
            if (err.password)
                pwError.innerText = err.password;
            else
                pwError.innerText = "";
            if (err.email)
                emailError.innerText = err.email;
            else
                emailError.innerText = ""
            if (err.username)
                userError.innerText = err.username;
            else
                userError.innerText = "";
        }
        else
        {
            emailError.innerText="";
            pwError.innerText="";
            userError.innerText="";
            document.getElementById("genericError").innerText=errData;
        }
        console.log(err)

    }

    function handleRegistration(username, pwd, email) {
        if(username.trim()==="" || pwd.trim()===""||email.trim()==="")
            return
        fetch("http://localhost:8090/auth/register", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: pwd,
                email: email
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if(response.ok){
                    setShowRegistrationSuccess(true)
                }
                else{
                    response.text().then(err=>{
                        showError2User(err)
                    })
                }
            })

    }

    const { updateUser } = Context();

    const handleGoogleLogin = (location) => {

        const width = 500, height = 600;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const popup = window.open(
            `${API.AUTH}/oauth2/authorization/google`,
            "googleLogin",
            `width=${width},height=${height},left=${left},top=${top}`
        );

        const listener = (event) => {
            if (event.origin !== "http://localhost:8090") {
                console.log("Bad :Token from" ,event.origin)
                return;
            }

            if (event.data?.accessToken) {
                // Save tokens
                saveTokens({
                    accessToken: event.data.accessToken,
                    refreshToken: event.data.refreshToken,
                })

                console.log(event.data.refreshToken)
                // Close popup
                retrieveUserData(event.data.accessToken)
                setShowLogin(false)

            }else{console.log("ho ricevuto",event)}
            window.removeEventListener("message", listener);

            popup?.close();
        };

        window.addEventListener("message", listener);
    };

    return (
        <>
            <Card className="w-full relative">
                <button
                    onClick={() => setShowLogin(false)}
                    className="absolute round top right-2 text-gray-500 hover:text-gray-800 text-lg font-bold"
                >
                    ×
                </button>
                <CardHeader >

                    {!doingRegistration && <CardTitle>Login to your account</CardTitle>}
                    {doingRegistration &&
                        <CardTitle>Create an account</CardTitle>
                    }
                    <Input id="user"  placeholder="mariorossi24"></Input>
                    <p className="text-red-800" id="userError"></p>
                    {doingRegistration && <><Input id="email" placeholder="mail@example.com"></Input>
                    <p  className="text-red-800" id="emailError"></p></>}
                    <Input  id="password" placeholder="password"></Input>
                    <p className="text-red-800" id="pwError"></p>
                    <p className="text-red-800" id="genericError"></p>

                </CardHeader>
                <CardContent className="flex flex-col  gap-4">
                    {!doingRegistration &&<Button
                        variant="outline"
                        className="w-full  bg-[#F5E7D2]"
                        onClick={()=>{
                            let username= document.getElementById("user").value
                            let pwd= document.getElementById("password").value
                            handleLogin(username, pwd)
                        }
                    }
                    >
                        Login
                    </Button>}
                </CardContent>
                <CardFooter  className="flex flex-col  gap-4">
                    <Button className="w-full  bg-[#ECE6F0]" variant="link" onClick={() => {
                        if(doingRegistration)
                        {
                            const user= document.getElementById("user").value;
                            const pwd =document.getElementById("password").value;
                            const email =document.getElementById("email").value;
                            handleRegistration(user,pwd,email);

                        }
                        else
                            setDoingRegistration(true);}}>
                        Sign Up
                    </Button>
                    <CardDescription>Or choose a login method below</CardDescription>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={()=>{ handleGoogleLogin(location)}}
                    >
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
            {showRegistrationSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <Card className="w-96 p-6 text-center relative">
                        {/* Chiudi con X in alto a destra */}
                        <button
                            onClick={() => setShowLogin(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg font-bold"
                        >
                            ×
                        </button>

                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-green-600">Successo</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-gray-700">
                                Registrazione avvenuta con successo! Controlla la tua email per attivare l’account.
                            </p>
                        </CardContent>

                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full bg-green-100 text-green-800 hover:bg-green-200"
                                onClick={() => setShowLogin(false)}
                            >
                                Chiudi
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    );
}