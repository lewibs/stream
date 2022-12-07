import React, { useEffect, useState, useRef } from 'react';
import TypingText from './TypingText';
import htmlize from "./functions/htmlize";
import { useNavigate } from 'react-router-dom';

const Terminal = ({path, children=""}) => {
  //the terminal history
  const [history, setHistory] = useState([]);
  //the users input
  const [user, setUser] = useState("");
  //the string that is being typed
  const [buffer, setBuffer] = useState(children);
  //the jsx element that is typing
  const [typing, setTyping] = useState(undefined);
  //this is used to keep track of if the user is typing
  const [isTyping, setIsTyping] = useState(false);
  //this is used to flash the input box
  const [showInput, setShowInput] = useState(true);
  const navigate = useNavigate();

  //handles loading the buffer
  useEffect(()=>{
    if (path) {
        console.log(path);
        fetch(path)
        .then(response => response.text())
        .then(data => {
            setBuffer(data);
        });
    }
  }, [path])

  //sets the event listenters for user typing
  let ranCheckTyping = false
  useEffect(() => {
    if (ranCheckTyping === false) {
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
    ranCheckTyping = true;
  }, []);

  //checks if the user is typing
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

  //stringify actions
  let ranListen = false;
  useEffect(()=>{
    if (ranListen === false) {
      function actionToString(e) {
        if (e.key === "Backspace") {
          setUser(p=>p.substring(0, p.length - 1));
        } else if (e.key === "Enter") {
          setUser(p=>p + '\n');
        } else if (e.key.length === 1 ) {
          setUser(p=>p+e.key);
        }
      }

      window.addEventListener('keydown', actionToString);
      return ()=>{window.removeEventListener("keydown", actionToString)}
    }
    ranListen = true;
  }, []);

  //this handles user commands
  useEffect(()=>{
    const page = +window.location.pathname.replace("/","");
    if (user.includes("back\n")) {
        navigate("/" + (page - 1));
    } else if (user.includes("next\n")) {
        navigate("/" + (page + 1));
    } else if (user.includes("goto") && user.includes("\n")) {
        const goto = user.match(/\d+/)[0]
        navigate("/" + goto);
    } else if (user.includes("home\n")) {
        navigate("/");
    } else if (user.includes("help\n")) {
        setBuffer(
            "back - used to go to the previous entry if there is one\n"
            + "next - used to go to the next entry if there is one\n"
            + "goto <stream number> - used to go to a specific entry\n"
            + "home - used to get to the home menu\n"
        );
    } else if (user.includes("\n")) {
        setBuffer("Not a valid command. Try using 'help' for info\n");
    }

    if (user[user.length - 1] === '\n') {
      setHistory(p=>[...p, htmlize(user)]);
      setUser("");
    }
  }, [user]);

  //this handles the buffer stream
  useEffect(()=>{
    if (buffer[buffer.length - 1] === '\n') {
        setHistory(p=>[...p, htmlize(user)]);
        setBuffer("");
    }
  }, [buffer]);

  //buffer update
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

export default Terminal;