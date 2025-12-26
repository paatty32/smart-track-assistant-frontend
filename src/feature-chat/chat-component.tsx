import { Button, Card, CardBody, CardFooter, CardHeader, Divider, ScrollShadow, Textarea } from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useChatSocket } from "../hooks/useChatSocket";


type ChatFormValues = {
    message: string;
}

type ChatMessages = {
    text: string;
    sender: 'me' | 'bot';
}

export function ChatComponent () {

    const {send, messagResp, isDone, reset} = useChatSocket();

    const {register, handleSubmit, setValue} = useForm<ChatFormValues>();

    const [chatMessages, setChatMessages] = useState<ChatMessages[]>([]);
    const [currentBotMessage, setCurrentBotMessage] = useState("");

    const onSubmit = (data: ChatFormValues) => {
        console.log(data.message);

        send(data.message);

        setChatMessages(prev => [...prev, {text: data.message, sender: 'me'}]);
        setCurrentBotMessage("");

        setValue("message", "");
    };

    //Streaming anzeigen
    useEffect(()=> {
        if(!messagResp) return;

        setCurrentBotMessage(oldMsg => oldMsg + messagResp);
    }, [messagResp])

    //Fertige Nachricht anzeigen
    useEffect(()=> {
        if(!isDone || !currentBotMessage) return;

        setChatMessages(prev => [...prev, {text: currentBotMessage, sender: "bot"}])
        setCurrentBotMessage("");
        reset();
    }, [isDone])

    return(
        <>
        <div className="flex flex-row h-screen items-center justify-center ">
                <Card className="w-96 h-96">
                    <CardHeader>
                        <h4>
                            Smart Track Assistant
                        </h4>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <ScrollShadow className="flex flex-col">
                           { chatMessages.map((message, index) => {
                                const isOwnMessage = message.sender === 'me'
                                return (
                                    <div key={index} className={`p-1 mb-1 w-max max-w-[75%] rounded ${
                                        isOwnMessage ? 'bg-blue-100 self-end' : ' bg-gray-100 self-start'
                                    }`}>
                                        {message.text}
                                    </div>
                                )  
                            })}

                            {currentBotMessage && (<div className="p-1 mb-1 w-max max-w-[75%] rounded bg-gray-100 self-start">
                                    {currentBotMessage}
                                </div>
)}
                        </ScrollShadow>
                    </CardBody>
                    <Divider/>
                    <CardFooter>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-row gap-1">
                                <Textarea {...register("message")} minRows={1} placeholder="Nachricht eingeben.."/>
                                <Button type="submit">Senden</Button>
                            </div>
                    
                        </form>
                       
                    </CardFooter>
                </Card>
        </div>
        </>
    );
}