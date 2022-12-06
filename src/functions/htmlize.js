export default function htmlize(str) {
    return Array.from(str).map((char)=>{
      if (char === "\n") {
        return <br/>;
      } else if (char === " ") {
        return <span>&nbsp;</span>;
      } else {
        return char;
      }
    });
  }