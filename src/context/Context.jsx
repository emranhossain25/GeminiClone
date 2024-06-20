import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context= createContext();

const ContextProvider = (props) =>{

    const [input,setInput] =useState("");
    const [recentPrompt,setRecentPromt] = useState("");
    const [prevPrompts,setPrevPrompts]=useState([]);
    const [showResult,setShowResult]=useState(false)
    const [loading,setLoading]=useState("")
    const [resultData,setResultData] = useState("")


    // const delayPara = (index,nextWord) =>{

    // }

    const newChat = () =>{
        setLoading(false);//great a card screen will be visible 
        setShowResult(false)
    }
    const onSent = async (prompt) =>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {// if prompt already defined then generate response using promt
            response = await runChat(prompt);
            setRecentPromt(prompt);
        }else{// other response generate using input field
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPromt(input);
            response=await runChat(input);
        }
        //setRecentPromt(input)
        // setPrevPrompts(prev=>[...prev,input]);
        // const response = await runChat(input)

        let responseArray= response.split("**");//when we have two start replace it in a nold text
        let newResponse="";
        for (let i = 0; i < responseArray.length; i++) {
            if(i===0 || i%2!==1){
                newResponse +=responseArray[i];// if start is odd then add in the newresponse it will create a new line

            }else{
                 newResponse += "<br>"+responseArray[i]+"</br>"  //if start is even then underline those in bold colour         
            }
        }
        let newResponse2=newResponse.split("*").join("</br>")//when one start then join it in a bold line or splitthe new line
        setResultData(newResponse2);
        setLoading(false);
        setInput("")
        
    }
    
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPromt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;