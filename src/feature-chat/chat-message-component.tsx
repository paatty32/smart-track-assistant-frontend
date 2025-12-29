import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
    text: string;
    isOwn?: boolean;
    streaming?: boolean;
};

export function ChatMessages({text, isOwn}: Props) {
    return(
        <>
             <div className={`p-1 mb-1 w-max max-w-[75%] rounded ${
                                        isOwn ? 'bg-blue-100 self-end' : ' bg-gray-100 self-start'
                                    }`}>

                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {text}
                </ReactMarkdown>
            </div>
        </>
    )
}