import getThoughtStatus from "@/lib/getThoughtStatus";
import { STEP_OF_ANALYSIS } from "@/types/TikTok";
import StreamingThought from "./StreamThought";
import { useFunnelAnalysisProvider } from "@/providers/FunnelAnalysisProvider";
import { useRouter } from "next/navigation";

const ThoughtSteps = () => {
  const { artistHandle, funnelName, thoughts, funnelType, isFinished } =
    useFunnelAnalysisProvider();
  const { push } = useRouter();

  return (
    <div
      className={`font-bold ${funnelType === "wrapped" ? "text-sm" : "text-md"}`}
    >
      {thoughts &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.entries(thoughts)?.map(([key, thought]: any) => (
          <div key={key} className="flex gap-2">
            <span>
              {funnelType === "wrapped" &&
                !isFinished &&
                `${key.toUpperCase()}: `}
            </span>
            {thought.status === STEP_OF_ANALYSIS.PROFILE && (
              <StreamingThought
                text={`Looking at ${artistHandle}’s profile.`}
              />
            )}
            {thought.status === STEP_OF_ANALYSIS.TRACKS && (
              <StreamingThought text={`Looking at ${artistHandle}’s tracks.`} />
            )}
            {thought.status === STEP_OF_ANALYSIS.ALBUMS && (
              <StreamingThought text={`Looking at ${artistHandle}’s albums.`} />
            )}
            {thought.status === STEP_OF_ANALYSIS.POSTURLS && (
              <StreamingThought
                text={`Reviewing ${artistHandle}’s top-performing videos.`}
              />
            )}
            {thought.status === STEP_OF_ANALYSIS.VIDEO_COMMENTS && (
              <StreamingThought text={getThoughtStatus(thought.progress)} />
            )}
            {thought.status === STEP_OF_ANALYSIS.SEGMENTS && (
              <StreamingThought
                text={`Grouping all of the @${artistHandle}'s ${funnelName} Fans into the segments.`}
              />
            )}
            {thought.status === STEP_OF_ANALYSIS.SAVING_ANALYSIS && (
              <StreamingThought text={`Saving video comments scrapped data.`} />
            )}
            {thought.status === STEP_OF_ANALYSIS.CREATING_ARTIST && (
              <StreamingThought text={`Setting up artist mode.`} />
            )}
            {thought.status === STEP_OF_ANALYSIS.ERROR && !isFinished && (
              <span
                onClick={() => push(`/funnel/${key.toLowerCase()}`)}
                className="underline cursor-pointer"
              >
                Click here to retry.
              </span>
            )}
            {thought.status === STEP_OF_ANALYSIS.FINISHED && !isFinished && (
              <StreamingThought
                text={`${key} analysis complete ✅`}
              ></StreamingThought>
            )}
          </div>
        ))}
    </div>
  );
};

export default ThoughtSteps;
