import React, {createContext, useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

//zie https://www.npmjs.com/package/jwt-decode
import jwt_decode from "jwt-decode";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [Auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // haal de JWT op uit Local Storage
        const storedToken = localStorage.getItem('token')
        console.log(storedToken)
        // als er WEL een token is, haal dan opnieuw de gebruikersdata op
        if (storedToken && Math.floor(Date.now() / 1000) < decodedToken.exp){
            console.log("de gebruiker is nog steeds ingelogd")
            const decodedToken = jwt_decode(storedToken);
            void fetchUserData(storedToken, decodedToken.sub)

            // } else {
            //     console.log("De token is verlopen")
            //     localStorage.removeItem('token')
            // }
        } else {
            // als er GEEN token is doen we niks
            setAuth({
                ...Auth,
                isAuth: false,
                user: null,
                status: "done"
            })
        }
    }, [])

// jwt als argument meegegeven aan login: regel 29 SignIn. Is response.data.accessToken
    function login(JWT) {

        // console.log(`dit is console.log regel 18 AuthContext ${jwt}`)
        console.log('Gebruiker is ingelogd!');

        //zet token in de local storage bij inloggen
        localStorage.setItem('storedToken', JWT);

        //zie  https://www.npmjs.com/package/jwt-decode. Dit is overigens dezelfde info die je op kunt halen op jwt.io.
        const decodedToken = jwt_decode(JWT);

        // console.log(decodedToken);

        //decodedToken.sub is de id uit regel 65
        void fetchUserData(JWT, decodedToken.sub)
        navigate('/profile');
    }

    async function fetchUserData(JWT, id) {
        try {
            const response = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${JWT}`,
                }
            })
            setAuth({
                isAuthenticated: true,
                user: {

                    //hier mag ook email: response.data.email,
                    email: response.data.email,

                    //hier mag ook id: response.data.id,
                    id: response.data.sub,

                    username: response.data.username
                },
                status: "done",
            });

            console.log(response)
        } catch (e) {
            console.log.error(e)
        }
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        //Verwijdert alleen token (dit gebruiken als je ergens anders in je applicatie ook de local storage nog gaat gebruiken, anders worden die gegevens ook verwijderd, zoals bij regel 68)
        localStorage.removeItem('jwtToken')
        // localStorage.clear()
        // verwijdert alle tokens uit local storage bij uitloggen
        setAuth({
            isAuthenticated: false,
            user: null,
            status: "done",
        });
        navigate('/');
    }

    const contextData = {
        isAuth: Auth.isAuthenticated,
        user: Auth.user,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;