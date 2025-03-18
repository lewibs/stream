import React, { useEffect, useState, useRef } from 'react';
import TypingText from './TypingText';
import htmlize from "./functions/htmlize";
import { useNavigate } from 'react-router-dom';

const Terminal = ({ path, children = "" }) => {
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState("");
  const [buffer, setBuffer] = useState(children);
  const [typing, setTyping] = useState(undefined);
  const [isTyping, setIsTyping] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const navigate = useNavigate();
  const terminalRef = useRef(null);

  useEffect(() => {
    if (path) {
      fetch(path)
        .then(response => response.text())
        .then(data => {
          setBuffer(data);
        });
    }
  }, [path]);

  useEffect(() => {
    let interval;

    function isTypingOn() {
      setIsTyping(true);
      clearTimeout(interval);
    }

    function isTypingOff() {
      interval = setTimeout(() => {
        setIsTyping(false);
      }, 100);
    }

    window.addEventListener('keydown', isTypingOn);
    window.addEventListener('keyup', isTypingOff);

    return () => {
      window.removeEventListener('keydown', isTypingOn);
      window.removeEventListener('keyup', isTypingOff);
    };
  }, []);

  useEffect(() => {
    if (isTyping) {
      setShowInput(true);
    } else {
      const interval = setInterval(() => {
        setShowInput(prevState => !prevState);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isTyping]);

  useEffect(() => {
    function actionToString(e) {
      if (e.key === "Backspace") {
        setUser(p => p.substring(0, p.length - 1));
      } else if (e.key === "Enter") {
        setUser(p => p + '\n');
      } else if (e.key.length === 1) {
        setUser(p => p + e.key);
      }
    }

    window.addEventListener('keydown', actionToString);
    return () => window.removeEventListener("keydown", actionToString);
  }, []);

  useEffect(() => {
    const page = +window.location.pathname.replace("/", "");
    if (user.includes("back\n")) {
      navigate("/" + (page - 1));
    } else if (user.includes("next\n")) {
      navigate("/" + (page + 1));
    } else if (user.includes("goto") && user.includes("\n")) {
      if (user.includes("home")) {
        navigate("/");
      } else {
        const goto = user.match(/\d+/)?.[0];
        if (goto) navigate("/" + goto);
      }
    } else if (user.includes("home\n")) {
      navigate("/");
    } else if (user.includes("help\n")) {
      setBuffer(
        "back - go to the previous entry\n" +
        "next - go to the next entry\n" +
        "goto <stream number> - go to a specific entry\n" +
        "home - go to the home menu\n"
      );
    } else if (user.includes("\n")) {
      setBuffer("Not a valid command. Try using 'help' for info\n");
    }

    if (user.endsWith('\n')) {
      setHistory(p => [...p, htmlize(user)]);
      setUser("");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (buffer.endsWith('\n')) {
      setHistory(p => [...p, htmlize(buffer)]);
      setBuffer("");
    }
  }, [buffer]);

  useEffect(() => {
    setTyping(
      <TypingText onDone={() => {
        setHistory(p => [...p, htmlize(buffer)]);
        setTyping(undefined);
      }}>
        {buffer}
      </TypingText>
    );
  }, [buffer]);

  return (
    <div ref={terminalRef} style={{
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      fontFamily: "monospace",
      background: "black",
      color: "#4AF626",
      padding: "10px",
      minHeight: "100vh"
    }}>
      {history}
      {typing}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "end", flexWrap: "wrap" }}>
        {htmlize(user)}
        {showInput && <div style={{
          height: "1rem",
          width: "10px",
          background: "#4AF626",
          marginLeft: "2px"
        }} />}
      </div>
    </div>
  );
};

export default Terminal;
