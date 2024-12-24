import { useAgentSocketProvider } from "@/providers/AgentSocketProvider";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import { useSpotifyAnalysisProvider } from "@/providers/SpotifyAnalysisProvider";
import { useTwitterAnalysisProvider } from "@/providers/TwitterAnalysisProvider";
import { Funnel_Type } from "@/types/Funnel";

const AnalysisButton = ({
  className,
  containerClasses,
}: {
  className?: string;
  containerClasses?: string;
}) => {
  const { username, funnelType } = useFunnelAnalysisProvider();
  const { handleAnalyze: handleTwitterAnalysis } = useTwitterAnalysisProvider();
  const { handleAnalyze: handleSpotifyAnalysis } = useSpotifyAnalysisProvider();
  const { openAgentSocket } = useAgentSocketProvider();

  const handleClick = () => {
    if (funnelType === Funnel_Type.TIKTOK) openAgentSocket(Funnel_Type.TIKTOK);
    if (funnelType === Funnel_Type.TWITTER) handleTwitterAnalysis();
    if (funnelType === Funnel_Type.SPOTIFY) handleSpotifyAnalysis();
    if (funnelType === Funnel_Type.INSTAGRAM)
      openAgentSocket(Funnel_Type.INSTAGRAM);
  };
  return (
    <div className={`space-y-3 ${containerClasses}`}>
      <button
        onClick={handleClick}
        disabled={!username}
        className={`bg-black rounded-[10px] pl-5 pr-4 h-9 z-20 flex items-center gap-2 justify-center
        transition-all text-[15px] font-medium text-white hover:bg-black active:bg-white/80
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        Try For Free
      </button>
      <p className="font-inter text-sm text-grey-primary">
        No credit card required.
      </p>
    </div>
  );
};

export default AnalysisButton;
