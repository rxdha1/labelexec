"use client";

import { Terminal } from "lucide-react";
import CurrentState from "./CurrentState";
import { useArtistProvider } from "@/providers/ArtistProvider";
import Artists from "./Artists";
import Events from "./Events";
import Approvals from "./Approvals";

const AutoPilot = () => {
  const { selectedArtist } = useArtistProvider();

  return (
    <div className="grow h-screen overflow-hidden md:bg-background md:p-4">
      <div className="size-full bg-white overflow-y-auto rounded-xl flex flex-col justify-center gap-3 p-4 md:p-10">
        <div className="h-full bg-black text-green-400 font-mono p-4 rounded-lg border border-green-900 flex flex-col">
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-green-900">
            <Terminal className="h-5 w-5" />
            <h1 className="text-lg font-bold">Peek Into Recoup&apos; Brain</h1>
            <div className="ml-auto flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
          </div>
          {selectedArtist ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full grow">
              <div className="space-y-4">
                <CurrentState />
                <Events />
              </div>
              <Approvals />
            </div>
          ) : (
            <Artists />
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoPilot;
