import React, {useState, useContect, useContext} from 'react'
import {AuthContext} from "./index"
import firebase from 'firebase'

const Join =() =>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");

    const Auth = useContext(AuthContext);
    const handleform = e =>{
        e.preventDefault();
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res =>{
            if (res.user)Auth.setLoggedIn(true);
        })
        .catch(e =>{
            setErrors(e.message);
        });
    };

    const JoinWithGoogle = () => {
        const provider= new firebase.auth.GoogleAuthProvider();
        firebase
        .auth()
        .signInWithPopup(provider)
        .then((response) => {
            console.log(response);
            Auth.setLoggedIn(true);
        });
    }

    return(
        <div>
            <h1>Join</h1>
            <form onSubmit={e =>handleform(e)}>
                <input 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    name="email"
                    type="email"
                    placeholder="email" 
                />
                <input 
                    onChange={e => setPassword(e.target.value)}
                    name="password"
                    value={password}
                    type="password"
                    placeholder="password" 
                />
                <hr/>
                <button class="googleBtn" type="button" onClick={()=>JoinWithGoogle()}>  
                    <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="logo"
                    />
                    Join with Google
                </button>
                <button type="submit">
                    Login
                </button>
                <span>{error}</span>
            </form>
        </div>
    )
}

export default Join;