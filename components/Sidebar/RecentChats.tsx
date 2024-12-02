import { getRandomHexColor } from "@/lib/getRandomColor";
import { useConversationsProvider } from "@/providers/ConverstaionsProvider";
import { Conversation } from "@/types/Stack";
import { useRouter } from "next/navigation";

const RecentChats = ({ toggleModal }: { toggleModal: () => void }) => {
  const { conversations, streamingTitle } = useConversationsProvider();
  const { push } = useRouter();

  const handleClick = (conversation: Conversation) => {
    toggleModal();
    if (conversation.isTikTokAnalysis) {
      push(
        `/funnels/tiktok-account-analysis/${conversation.metadata.conversationId}`,
      );
      return
    }
    push(`/${conversation.metadata.id}`);
  };

  return (
    <div>
      <p className="text-md mb-2">Recent Chats</p>
      <div className="max-h-[110px] md:max-h-[140px] overflow-y-auto space-y-2">
        {conversations.map((conversation: Conversation, index: number) => (
          <button
            className="flex gap-2 items-center"
            key={conversation.metadata.id}
            type="button"
            onClick={() => handleClick(conversation)}
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{
                background: `${getRandomHexColor()}`,
              }}
            />
            <p className="text-sm truncate max-w-[200px]">
              {index === 0
                ? streamingTitle
                : conversation?.title || `${conversation?.metadata.content}`}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentChats;
