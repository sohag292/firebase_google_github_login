import { useState } from 'react';
import './App.css';
import { getAuth, signInWithPopup, GoogleAuthProvider,GithubAuthProvider, signOut } from "firebase/auth";
import app from './firebase/firebase.init'


const auth =getAuth(app);

function App() {
  const [user, setUser]= useState({})

  const googleProvider =new GoogleAuthProvider();
  const githubProvider =new GithubAuthProvider();

  const handleGoogleSignIn=()=>{
  signInWithPopup(auth, googleProvider)
  .then((result) => {
    const user = result.user;
    setUser(user);
    console.log(user);
  }).catch(error => {
    console.error('error', error)

    });
  }

  const handleGithubSignIn=()=>{
    signInWithPopup(auth, githubProvider)
    .then((result) => {
      const user = result.user;
      setUser(user);
      console.log(user);
    }).catch(error => {
      console.error('error', error)
  
      });
  }

  const handleSignOut=()=>{
    signOut(auth)
    .then(()=>{
      setUser({})
    })
    .catch(()=>{
      setUser({})
    })
  }

  return (
    <div className="App">
      {user.uid ?
      <button onClick={handleSignOut}>Sign out</button>
     :
     <>
     <button onClick={handleGoogleSignIn}>Google sign In</button>
     <button onClick={handleGithubSignIn}>Github Sign In</button>
     </>
     }
     {user.uid && <div>
      <h3>User name: {user.displayName}</h3>
      <p>Email address: {user.email}</p>
      <img src= {user.photoURL} alt="" />
     </div>

     }
    </div>
  );
}

export default App;
