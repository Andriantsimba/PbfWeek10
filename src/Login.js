import React, {useState, useContext} from 'react'
import {AuthContext} from "./index"
import firebase from 'firebase'

const Login= () =>{
    const[email, setEmail] = useState("");
    const [passWord, setPassword] = useState("");
    const [error, setErrors] = useState("");

    const Auth = useContext(AuthContext);
    const handleform = e =>{
        e.preventDefault();
        firebase
        .auth()
        .signInWithEmailAndPassword(email, passWord)
        .then(res =>{
            if(res.user)Auth.setLoggedIn(true);
        })
        .catch(e => {
            setErrors(e.messages);
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
            <h1>Login</h1>
            <form onSubmit={e=>handleform(e)}>
                <input 
                value={email}
                onChange={e=>setEmail(e.target.value)}
                name="email" 
                type="email"
                placeholder="email" />

                <input 
                onChange={e => setPassword(e.target.value)}
                name="password"
                value={passWord}
                type="password"
                placeholder="password" />

                <hr/>
                <button class="googleBtn" type="button" onClick={()=>JoinWithGoogle()}>
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="logo"
                    />
                    Login with Google
                </button>
                <button type="submit">Login</button>
                <span>{error}</span>
            </form>
        </div>
    )
}

export default Login;