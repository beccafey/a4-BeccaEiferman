import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AgeSort from './AgeSort.jsx'
import SignIn from './SignIn.jsx'


function App() {
  const [signedIn, setSignedIn] = useState(false);
  if (signedIn) {
    return <AgeSort />
  }
  
  return <SignIn onSignIn={() => setSignedIn(true)}/>

}

export default App;
