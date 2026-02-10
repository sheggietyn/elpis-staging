"use client";
import { YellowLoader } from "@/app/util/ToastLoader";
import { Upload, VideoIcon } from "lucide-react";
import dynamic from "next/dynamic";
import ReactPlayer from "react-player";
import videojs from "video.js";
import "video.js/dist/video-js.css";
//const VideoJS = dynamic(() => import("react-video-js-player"), { ssr: false });
import React, { useRef, useEffect, useState } from "react";
import Plyr from "plyr-react";
//import Plyr from "plyr";
import "plyr-react/plyr.css";
import "plyr/dist/plyr.css";
import Image from "next/image";

{
  /* <ReactPlayer
              url={PostImage}
              controls
              autoplay
              width="100%"
              height="100%"
            /> */
}

const options = {
  controls: [
    "play-large",
    "play",
    "progress",
    "current-time",
    "mute",
    "volume",
    "settings",
    "fullscreen",
  ],
  // This hides the native download button on supported browsers
  controlsList: "nodownload",
};
export const VideoUpload = ({
  handleChange,
  id,
  PostImage,
  style,
  styleIn,
  loading,
}) => {
  return (
    <div
      className={`${
        style ? style : "w-full"
      } border-[1px] border-dashed cursor-pointer border-gray-200 h-[230px] md:h-[370px] rounded-lg my-5 flex items-center justify-center`}
    >
      <label
        htmlFor={id}
        className={`bg-gray-100 flex items-center justify-center rounded-lg ${
          styleIn ? styleIn : "w-full"
        } h-[220px] md:h-[360px]`}
      >
        {PostImage ? (
          <div className="w-full h-[220px] md:h-[360px] mb-6 rounded-lg overflow-hidden shadow-md">
            <Plyr
              source={{
                type: "video",
                sources: [
                  {
                    src: PostImage,
                    type: "video/mp4",
                  },
                ],
              }}
              options={options}
            />
          </div>
        ) : (
          <>
            <div className="w-full h-[220px] md:h-[360px] mb-6 rounded-lg bg-gray-100 flex flex-col items-center justify-center text-gray-500">
              {loading ? (
                YellowLoader
              ) : (
                <>
                  <VideoIcon className="w-12 h-12 text-primary mb-2" />
                  <p className="text-sm"> Click Upload Video</p>
                </>
              )}
            </div>
          </>
        )}
      </label>

      <input
        id={id}
        type="file"
        accept="video/mp4"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export const VideoDisplayerII = ({ wormData }) => {
  return (
    <>
      {wormData.CourseVideo ? (
        <div
          className="w-full h-[220px] md:h-[360px] mb-6 rounded-lg overflow-hidden shadow-md"
          onContextMenu={(e) => e.preventDefault()}
        >
          <iframe
            src={wormData.CourseVideo}
            width="100%"
            height="360"
            controlsList="nodownload"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="w-full h-[220px] md:h-[360px] mb-6 rounded-lg bg-gray-100 flex flex-col items-center justify-center text-gray-500">
          <VideoIcon className="w-12 h-12 text-primary mb-2" />
          <p className="text-sm">No video available for this lesson</p>
        </div>
      )}
    </>
  );
};

export const VideoDisplayerVV = ({ src, wormData, type = "video/mp4" }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        controlBar: {
          volumePanel: { inline: false },
        },
      });
    } else {
      playerRef.current.src({ src, type });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, type]);
  return (
    <>
      {wormData.CourseVideo ? (
        <div
          className="w-full h-[220px] md:h-[360px] mb-6 rounded-lg overflow-hidden shadow-md"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div data-vjs-player>
            <video
              id="video-player"
              ref={videoRef}
              className="video-js vjs-default-skin"
              controls
              preload="auto"
              controlsList="nodownload"
              width="640"
              height="360"
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-[220px] md:h-[360px] mb-6 rounded-lg bg-gray-100 flex flex-col items-center justify-center text-gray-500">
          <VideoIcon className="w-12 h-12 text-primary mb-2" />
          <p className="text-sm">No video available for this lesson</p>
        </div>
      )}
    </>
  );
};

export const VideoDisplayer = ({ src, wormData }) => {
  const plyrRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const player = plyrRef.current?.plyr;
    const video = player?.media; // get the actual <video> element

    if (!video) return;

    const onLoadedData = () => setLoading(false);
    const onCanPlay = () => setLoading(false);
    const onCanPlayThrough = () => setLoading(false);
    const onPlaying = () => setLoading(false);
    const onWaiting = () => setLoading(true);

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("canplaythrough", onCanPlayThrough);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("waiting", onWaiting);

    return () => {
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("canplaythrough", onCanPlayThrough);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("waiting", onWaiting);
    };
  }, [src]);

  const handleReady = () => {
    setLoading(false);
  };
  return (
    <>
      {wormData.CourseVideo ? (
        <div
          className="w-full h-[220px] md:h-[360px] mb-6 rounded-lg overflow-hidden shadow-md"
          onContextMenu={(e) => e.preventDefault()}
        >
          <div className="relative w-full h-[220px] md:h-[360px]">
            {/* Loader overlay */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <Plyr
              //ref={plyrRef}
              source={{
                type: "video",
                sources: [
                  {
                    src: src,
                    type: "video/mp4",
                  },
                ],
              }}
              options={options}
              onCanPlay={handleReady}
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-[220px] md:h-[360px] mb-6 rounded-lg bg-gray-100 flex flex-col items-center justify-center text-gray-500">
          <VideoIcon className="w-12 h-12 text-primary mb-2" />
          <p className="text-sm">No video available for this lesson</p>
        </div>
      )}
    </>
  );
};

export const FileUploadPDF = ({
  handleChange,
  id,
  PostFile,
  style,
  styleIn,
  loading,
}) => {
  return (
    <div
      className={`${style ? style : "w-full"} 
        border border-dashed cursor-pointer border-gray-200 
        h-[80px] rounded-lg my-3 flex items-center justify-center`}
    >
      <label
        htmlFor={id}
        className={`bg-gray-100 flex items-center justify-center rounded-lg ${
          styleIn ? styleIn : "w-full"
        } h-[80px]`}
      >
        {PostFile ? (
          <div className="w-full h-[80px] flex items-center justify-center px-3 overflow-hidden shadow-md bg-white rounded-lg">
            {/* Preview based on file type */}
            {PostFile.type?.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(PostFile)}
                alt="Preview"
                className="h-full object-contain"
              />
            ) : PostFile.type === "application/pdf" ? (
              <span className="text-sm text-gray-600 font-medium">
                📄 {PostFile.name}
              </span>
            ) : (
              <span className="text-sm text-gray-600 font-medium truncate">
                📎 {PostFile.name}
              </span>
            )}
          </div>
        ) : (
          <div className="w-full h-[80px] flex flex-col items-center justify-center text-gray-500">
            {loading ? (
              YellowLoader
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-primary mb-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12V4m0 0l-4 4m4-4l4 4"
                  />
                </svg>
                <p className="text-xs">Click to Upload File</p>
              </>
            )}
          </div>
        )}
      </label>

      <input
        id={id}
        type="file"
        accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export const ImageUpload = ({
  handleChange,
  id,
  PostImage,
  style,
  styleIn,
}) => {
  return (
    <div
      className={`${
        style ? style : "w-full"
      } border-[1px] border-dashed cursor-pointer border-gray-300 h-40 rounded-lg flex items-center justify-center`}
    >
      <label
        htmlFor={id}
        className={`bg-gray-100 flex items-center justify-center rounded-lg ${
          styleIn ? styleIn : "w-full"
        } h-38`}
      >
        {PostImage ? (
          <Image
            src={PostImage}
            alt="Img"
            className="h-36 w-36 rounded-lg"
            width={144}
            height={144}
          />
        ) : (
          <Upload size={30} className="text-gray-600" />
        )}
      </label>

      <input
        id={id}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};
