import { Card, CardBody, CardFooter, CardHeader, Divider, ScrollShadow, Textarea } from "@heroui/react";

export function ChatComponent () {
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
                        <ScrollShadow>
                        </ScrollShadow>
                    </CardBody>
                    <Divider/>
                    <CardFooter>
                        <Textarea minRows={1} placeholder="Nachricht eingeben..">

                        </Textarea>
                    </CardFooter>
                </Card>
        </div>
        </>
    );
}