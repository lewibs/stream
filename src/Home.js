import Terminal from "./Terminal";
import TypingText from "./TypingText";
import entries from "./entries.json";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <TypingText>{0 + ": " + "home"}</TypingText>
            {entries.map((title, i)=>
                <Option 
                    key={i}
                    onClick={()=>{
                        navigate("/" + (i + 1));
                    }}
                >
                    <TypingText wait={500 * (i + 1)}>{i + 1 + ": " + title}</TypingText>
                </Option>
            )}
            <Terminal></Terminal>
        </div>
    );
}

export default Home;