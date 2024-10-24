// import { useChatProvider } from "@/providers/ChatProvider";
import { Message } from "ai";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";

const useToolCall = (message: Message) => {
  const [loading, setLoading] = useState(false);
  // const { finalCallback } = useChatProvider();
  // const [answer, setAnswer] = useState("");
  // const { clearQuery } = useChatProvider();
  // const [isCalled, setIsCalled] = useState(false);
  const isCalled = false;
  const answer = "";
  const toolInvocations = [...(message.toolInvocations || [])];
  const toolInvocationResult = toolInvocations?.filter(
    (toolInvocation) => toolInvocation.state === "result",
  )?.[0];

  const { handleSubmit, messages, append } = useChat({
    api: "/api/tool_call",
    body: {
      question: toolInvocationResult?.result?.question || "",
      context: toolInvocationResult?.result?.context || "",
    },
  });

  console.log("ZIAD", messages);
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      // let answer = "";
      const question = toolInvocationResult.result?.question || "";
      const context = toolInvocationResult.result?.context || "";
      console.log("ZIAD Submit");
      if (question && context) {
        append({
          id: uuidV4(),
          content: "",
          role: "user",
        });
      }

      // if (question && context) {
      //   setIsCalled(true);
      //   const response = await fetch(`/api/tool_call`, {
      //     method: "POST",
      //     body: JSON.stringify({
      //       context,
      //       question,
      //     }),
      //   });
      //   const data = await response.json();
      //   answer = data.answer;
      //   await finalCallback({
      //     role: "assistant",
      //     content: answer,
      //     id: "",
      //   });
      //   setAnswer(answer);
      // }
      // clearQuery();
      setLoading(false);
    };

    if (!toolInvocationResult) return;

    console.log("ZIAD isAssistant", toolInvocationResult);
    const isAssistant = message.role === "assistant";

    if (!isAssistant) {
      setLoading(false);
      return;
    }

    console.log("ZIAD isCalled", isCalled, loading);
    if (isCalled || loading) return;

    console.log("ZIAD passed");
    init();
  }, [toolInvocationResult, isCalled]);

  return {
    loading,
    answer,
  };
};

export default useToolCall;
