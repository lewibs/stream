import Terminal from "./Terminal";
import TypingText from "./TypingText";
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

function Home({entries}) {
    const navigate = useNavigate();

    return (
        <div>
            {entries.map((title, i)=>
                <Option 
                    key={i}
                    onClick={()=>{
                        navigate("/" + (i));
                    }}
                >
                    <TypingText wait={500 * (i)}>{i + ": " + title}</TypingText>
                </Option>
            )}
            <Terminal></Terminal>
        </div>
    );
}

export default Home;