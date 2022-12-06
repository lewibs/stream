import React, { useEffect, useState, useRef } from 'react';
import TypingText from './TypingText';
import htmlize from "./functions/htmlize";

const App = () => {
  //the terminal history
  const [history, setHistory] = useState([]);
  //the users input
  const [user, setUser] = useState("");
  //the string that is being typed
  const [buffer, setBuffer] = useState("hi my name is benjamin\n");
  //the jsx element that is typing
  const [typing, setTyping] = useState(undefined);
  //this is used to keep track of if the user is typing
  const [isTyping, setIsTyping] = useState(false);
  //this is used to flash the input box
  const [showInput, setShowInput] = useState(true);

  let ranChecking = false
  useEffect(() => {
    if (ranChecking === false) {
      let interval;

      function isTypingOn() {
        setIsTyping(true);
        clearTimeout(interval);
      }

      function isTypingOff() {
        interval = setTimeout(()=>{
          setIsTyping(false);
        }, 100);
      }

      window.addEventListener('keydown', isTypingOn);
      window.addEventListener('keyup', isTypingOff);
    }
    ranChecking = true;
  }, []);

  useEffect(()=>{
    if (isTyping) {
      setShowInput(true);
    } else {
      const interval = setInterval(() => {
        setShowInput(prevState => !prevState);
      }, 500);
      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [isTyping])

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

  useEffect(()=>{
    setTyping(
      <TypingText onDone={()=>{
        setHistory(p=>[...p, htmlize(buffer)]);
        setTyping(undefined);
      }}>
        {buffer}
      </TypingText>
    );
  }, [buffer]);

  return (
    <>
      {history}
      {typing}
      <div style={{display:"flex", flexDirection:"row", alignItems:"end"}}>
        {htmlize(user)}
        {showInput && <div style={{
          height: "1rem",
          width: "10px",
          background: "#4AF626",
        }}/>}
      </div>
    </>
  )
};

export default App;