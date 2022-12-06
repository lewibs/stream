import React, { useState, useEffect } from 'react';
import htmlize from './functions/htmlize';

function TypingText({ children, onDone=()=>{} }) {
  const [text, setText] = useState("");

  let ranWrite = false;
  useEffect(() => {
    if (ranWrite === false) {
      let total = 0
      let string = Array.from(children)
      string.forEach(char => {
        total = total + Math.floor(Math.random() * 12)  * 10;
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