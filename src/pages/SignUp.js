import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

function SignUp() {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        username: '',
    });
    // const navigate = useNavigate();
    const {login} = useContext( AuthContext )

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("De gebruiker is geregistreerd")
        try {
            const response = await axios.post('http://localhost:3000/register', {
                email: formState.email,
                password: formState.password,
                username: formState.username,
            })
            // waarom werkt dit hier niet??? console.log(response);
            // navigate('/signin');
            login(response.data.accessToken)
        } catch (e) {
            console.error(e)
        }
        // dit hoorde bij stap 3: console.log(`console.log van handlechange ${formState.email} ${formState.password} ${formState.user}`)
    }


    function handleChange(e) {
        const changedFieldName = e.target.name;

        setFormState({
            ...formState,
            [changedFieldName]: e.target.value,
        });
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleSubmit}>
                <label>emailadres:
                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                </label>
                <label>password:
                    <input
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                </label>
                <label>username:
                    <input
                        placeholder="Username"
                        type="text"
                        name="username"
                        value={formState.username}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;