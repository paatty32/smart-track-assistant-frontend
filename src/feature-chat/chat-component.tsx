import { Button, Card, CardBody, CardFooter, CardHeader, Divider, ScrollShadow, Textarea } from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useChatSocket } from "../hooks/useChatSocket";
import { ChatMessages } from "./chat-message-component";


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
    const [isTyping, setIsTyping] = useState(false);

    const onSubmit = (data: ChatFormValues) => {
        console.log(data.message);

        setIsTyping(true);
        send(data.message);

        setChatMessages(prev => [...prev, {text: data.message, sender: 'me'}]);
        setCurrentBotMessage("");

        setValue("message", "");
    };

    //Streaming anzeigen
    useEffect(()=> {
        if(!messagResp) return;

        setIsTyping(false);
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
                <Card className="w-full h-full">
                    <CardHeader>
                        <h4>
                            Smart Track Assistant
                        </h4>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                        <ScrollShadow className="flex flex-col">
                           { chatMessages.map((message, index) => 
                                <ChatMessages key={index} text={message.text} isOwn={message.sender === "me"}/>
                            )}

                            {currentBotMessage && (
                                <ChatMessages key="streaming-bot" text={currentBotMessage} isOwn={false}/>
                            )}

                            {isTyping && (
                                <div className="p-2 max-w-[50%] bg-gray-100 rounded self-start flex gap-1">
                                    <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce delay-150"></span>
                                    <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce delay-300"></span>
                                </div>
                            )}
                        </ScrollShadow>
                    </CardBody>
                    <Divider/>
                    <CardFooter className="w-full">
                        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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