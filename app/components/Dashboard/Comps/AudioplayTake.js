"use client";
import { useAudioPlayer } from "react-use-audio-player";
import { Play, Pause, RotateCcw, RotateCw } from "lucide-react";
import { useEffect, useState } from "react";

export default function PlayAudioTwo({ audioUrl }) {
  const [currentTime, setCurrentTime] = useState(0);
  const { togglePlayPause, isPlaying, getPosition, seek, duration } =
    useAudioPlayer(audioUrl, {
      format: ["mp3", "wav"],
      autoplay: false,
    });

  // Function to rewind 10 seconds
  const rewind10 = () => {
    const current = getPosition(); // current time in seconds
    seek(Math.max(current - 10, 0)); // go back 10 seconds but not below 0
  };

  // Function to forward 10 seconds
  const forward10 = () => {
    const current = getPosition();
    seek(Math.min(current + 10, duration)); // go forward 10 seconds but not past end
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getPosition());
    }, 1000);

    return () => clearInterval(interval);
  }, [getPosition]);

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-between gap-3">
      {/* Play / Pause */}
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlayPause}
          className="bg-primary hover:bg-primary text-white px-3 py-3 rounded-full shadow-md flex items-center justify-center"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>

        <div className="text-sm text-gray-700 font-semibold">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Rewind */}
      <div className="flex items-center gap-3">
        <button
          onClick={rewind10}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full shadow-md"
        >
          <RotateCcw size={10} />
        </button>

        {/* Forward */}
        <button
          onClick={forward10}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-full shadow-md"
        >
          <RotateCw size={10} />
        </button>
      </div>
    </div>
  );
}
