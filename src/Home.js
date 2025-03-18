import Terminal from "./Terminal";
import TypingText from "./TypingText";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Option = styled.div`
    &:hover {
        cursor: pointer;
        color: red;
        &:before {
            content: "[";
        }
        &:after {
            content: "]";
        }
    }
`;

function Home({entries}) {
    const navigate = useNavigate();

    useEffect(()=>{
        const goto = new URLSearchParams(window.location.href.split("?")[1]).get("goto");
        if (goto) {
            navigate("/" + goto);
        }
    }, [])

    return (
        <div>
            {entries.filter(entry=>!entry.hidden).map((entry, i)=>
                <Option 
                    key={entry.key}
                    onClick={()=>{
                        navigate("/" + (entry.key));
                    }}
                >
                    <TypingText wait={500 * (i)}>{i + ": " + entry.title}</TypingText>
                </Option>
            )}
            <Terminal></Terminal>
        </div>
    );
}

export default Home;