import { Button, Card, CardBody, CardFooter, CardHeader, Divider, ScrollShadow, Textarea } from "@heroui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type ChatFormValues = {
    message: string;
}

type ChatMessages = {
    text: string;
    sender: 'me' | 'bot';
}

export function ChatComponent () {
    const [chatMessages, setChatMessages] = useState<ChatMessages[]>([]);

    const {register, handleSubmit, reset} = useForm<ChatFormValues>();

    const onSubmit = (data: ChatFormValues) => {
        console.log(data.message);

        setChatMessages(prev => [...prev,{text: data.message, sender: 'me'}]);

        reset({message: ''});
    };

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
                                        isOwnMessage ? 'bg-blue-100 self-end' : 'self-start'
                                    }`}>
                                        {message.text}
                                    </div>
                                )  
                            })}
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