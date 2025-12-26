import { useState } from "react";
import useWebSocket from "react-use-websocket"

const WS_URL = "ws://localhost:8001/ws"

export function useChatSocket() {

    const [messagResp, setMessageAnswer] = useState("");
    const [isDone, setIsDone] = useState(false);

    const {sendMessage} = useWebSocket(WS_URL, {
        onOpen: ()=> console.log("WebSocket geöffnet"),
        shouldReconnect: ()=> true,
        
        onMessage: (event) => {
            if(event.data === "[DONE]") {
                setIsDone(true);
                return;
            }

            const data: string = event.data
            setMessageAnswer((data))
            
        }
    });

    function send(text: string) {
        sendMessage(JSON.stringify({text}));
    }

    function reset() {
        setMessageAnswer("");
        setIsDone(false);
    }

    return {
        send,
        messagResp,
        isDone,
        reset
    }
}