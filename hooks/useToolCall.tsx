// import { useChatProvider } from "@/providers/ChatProvider";
import { Message } from "ai";
import { useChat } from "ai/react";
import { useEffect, useState } from "react";

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

  const { handleSubmit, messages } = useChat({
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
      if (question && context) {
        handleSubmit();
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

    console.log("ZIAD isAssistant");
    const isAssistant = message.role === "assistant";

    if (!isAssistant) {
      setLoading(false);
      return;
    }

    console.log("ZIAD isCalled");
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
