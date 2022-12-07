import React, { useState, useEffect } from 'react';
import htmlize from './functions/htmlize';

function TypingText({ children, wait=0, onDone=()=>{} }) {
  const [text, setText] = useState("");

  let ranWrite = false;
  useEffect(() => {
    if (ranWrite === false) {
      let total = wait;
      let string = Array.from(children)
      string.forEach(char => {
        total = total + Math.floor(Math.random() * 5)  * 10;
        setTimeout(()=>{
          setText(text=>text+char);
        }, total);
      });
      setTimeout(()=>{onDone()}, total);
    }
    ranWrite = true;
  }, []);

  return htmlize(text);
}

export default TypingText