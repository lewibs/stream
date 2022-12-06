import React, { useEffect, useState } from 'react';
import TypingText from './TypingText';
import htmlize from "./functions/htmlize";

const App = () => {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState("");

  //these are the actions which the user is inputing
  let ranListen = false;
  useEffect(()=>{
    if (ranListen === false) {
      window.addEventListener('keyup', (e)=>{
        if (e.key === "Backspace") {
          setUser(p=>p.substring(0, p.length - 1));
        } else if (e.key === "Enter") {
          setUser(p=>p + '\n');
        } else if (e.key === "Shift") {
          
        } else if (e.key === "Control") {

        } else {
          setUser(p=>p+e.key);
        }
      });
    }
    ranListen = true;
  }, []);

  //this is used to handle user logic since the scope is bad on the other
  useEffect(()=>{
    if (user[user.length - 1] === '\n') {
      setHistory(p=>[...p, htmlize(user)]);
      setUser("");
    }
  }, [user]);

  return (
    <>
      {history}
      <TypingText onDone={()=>{
        console.log("done typing");
      }}>
        this is benjamin
      </TypingText>
      <div style={{display:"flex", flexDirection:"row", alignItems:"end"}}>
        {htmlize(user)}
        <div style={{
          height: "1rem",
          width: "10px",
          background: "#4AF626",
        }}/>
      </div>
    </>
  )
};

export default App;