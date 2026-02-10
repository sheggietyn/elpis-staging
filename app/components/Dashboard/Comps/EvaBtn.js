import { PopLoader, WhiteLoader } from "@/app/util/ToastLoader";
import {
  Bot,
  ChartArea,
  ChartBar,
  GrapeIcon,
  LineChart,
  MessageCircle,
  MessageCircleDashed,
  MessageCircleQuestion,
  Mic,
  MicVocal,
  PieChart,
} from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Eva from "@/app/assets/images/eva.jpg";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useRef, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import PlayAudioTwo from "./AudioplayTake";

export const EvaBtn = ({ openChat }) => {
  return (
    <button
      onClick={openChat}
      className="fixed bottom-6 right-6 z-50 flex cursor-pointer items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary transition-all duration-200"
    >
      <Bot className="w-5 h-5" />
    </button>
  );
};
{
  /*
  id: 3,
  name: "Chart Display",
  icon: <ChartArea className="w-3 h-3 text-purple-800" />,
  type: "chart",
  */
}
const BtnLazer = ({ PassDataFunc, IdChecker, ...rest }) => {
  const GPtArray = [
    {
      id: 1,
      name: "In Depth Chat",
      icon: <MessageCircleQuestion className="w-3 h-3 text-green-800" />,
      type: "chat",
    },
    {
      id: 2,
      name: "Text to Speech",
      icon: <Mic className="w-3 h-3 text-pink-800" />,
      type: "voice",
    },

    {
      id: 3,
      name: "Calculate Pip,Lots",
      icon: <ChartArea className="w-3 h-3 text-purple-800" />,
      type: "chart",
    },
  ];
  return (
    <div className="overflow-x-auto hide-scrollbar">
      <div className="flex items-center  gap-3 pb-[4px]">
        {GPtArray.map((item) => (
          <button
            className={`bg-gray-200 whitespace-nowrap ${
              item.id === IdChecker ? `border-primary border-1` : ""
            } px-2 py-1 cursor-pointer font-medium rounded-full items-center flex justify-center text-xs text-gray-600`}
            key={item.id}
            {...rest}
            onClick={() => PassDataFunc(item)}
          >
            {item.icon}
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const FlyOver = ({ DisplayFly, IdChecker, PushDataFunc, ...rest }) => {
  const ChartArray = [
    {
      id: 1,
      name: "Pips",
      icon: <ChartArea className="w-3 h-3 text-orange-600" />,
      type: "pip",
    },
    {
      id: 2,
      name: "Lot Size",
      icon: <PieChart className="w-3 h-3 text-purple-600" />,
      type: "lot",
    },

    {
      id: 3,
      name: "Break Even",
      icon: <LineChart className="w-3 h-3 text-yellow-600" />,
      type: "reward",
    },
  ];
  return (
    <div className="flex items-center w-full px-3 my-2 bg-transparent z-10">
      <div className="bg-gray-50 px-2 py-2 select-text rounded-md text-sm shadow-md text-black w-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
          {ChartArray.map((item) => (
            <button
              className={`bg-gray-200 whitespace-nowrap ${
                item.id === IdChecker ? `border-primary border-1` : ""
              } px-2 py-1 cursor-pointer font-medium rounded-full items-center flex justify-center text-xs text-gray-600`}
              key={item.id}
              {...rest}
              onClick={() => PushDataFunc(item)}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const PlayAudio = ({ audioUrl }) => {
  return <AudioPlayer hasDefaultKeyBindings={false} src={audioUrl} />;
};

export const PopUpChat = ({
  opener,
  closeOpener,
  onChange,
  value,
  funcSend,
  Reply,
  Message,
  loading,
  AllChats,
  PassDataFunc,
  disabled,
  disabledII,
  IdChecker,
  loader,
  Username,
  DisplayFly,
}) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
  }, [Message]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "auto" });
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {opener && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary text-white px-4 py-3 rounded-t-2xl">
            <div className="flex gap-x-2 items-center">
              <div className="relative w-6 h-6 overflow-hidden rounded-full">
                <Image src={Eva} alt="Eva" fill className="object-cover" />
              </div>

              <h3 className="font-semibold text-sm">Chat With EVA</h3>
            </div>
            <button
              onClick={closeOpener}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div
            ref={bottomRef}
            className="flex-1 flex-col gap-3 px-2 mt-5 pb-5 space-y-2 text-sm overflow-y-auto h-[calc(100vh-200px)]"
          >
            <div className="self-start bg-gray-100 px-3 py-2 rounded-lg w-fit">
              Hi {Username} 👋
            </div>
            <div className="self-start bg-gray-100 px-3 py-2 rounded-lg w-fit">
              Welcome to Elpis Academy, I'm EVA your trading virtual advisor,
              What will you like me to help you with today ?{" "}
            </div>

            {/* User Message */}
            {AllChats.map((chat, index) => (
              <div key={chat.id || index}>
                {/* User Message */}
                <div className="bg-primary px-3 py-2 selection:bg-gray-300 rounded-md text-sm select-all text-white w-fit mb-2 ml-auto">
                  {chat.request}
                </div>

                {/* Eva Message */}
                {chat.loading ? (
                  <div className="bg-gray-200 px-3 py-2 rounded-md text-sm text-black w-fit mr-auto">
                    {WhiteLoader}
                  </div>
                ) : (
                  <>
                    <>
                      {chat.reply && (
                        <div className="bg-gray-100 px-3 py-2 select-text rounded-md text-sm text text-black w-fit prose prose-invert prose-p:py-2 prose-li:py-1 max-w-none mr-auto">
                          {chat.audioUrl ? (
                            <div className="bg-gray-100 px-3 py-2 select-text shadow-sm w-full rounded-md text-sm mb-2 text text-black prose prose-invert prose-p:py-2 prose-li:py-1 max-w-none mr-auto">
                              <PlayAudioTwo audioUrl={chat.audioUrl} />
                            </div>
                          ) : null}

                          <ReactMarkdown
                            components={{
                              p: ({ children }) => (
                                <p className="my-2">{children}</p>
                              ),
                              li: ({ children }) => (
                                <li className="my-1">{children}</li>
                              ),
                            }}
                          >
                            {chat.reply}
                          </ReactMarkdown>
                        </div>
                      )}
                    </>
                  </>
                )}
              </div>
            ))}
          </div>
          {/*DisplayFly && <FlyOver />*/}

          {/* Chat Input */}

          <div className="border-t z-10 border-gray-200 px-3 pt-[4px] pb-2 gap-2">
            <BtnLazer
              PassDataFunc={PassDataFunc}
              disabled={disabledII}
              IdChecker={IdChecker}
            />

            <div className="flex items-center gap-2">
              <input
                type="text"
                onChange={onChange}
                value={value}
                placeholder="Type a message..."
                className="flex-1 border border-gray-400 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                className="bg-primary text-white px-3 py-2 rounded-full hover:bg-primary"
                disabled={disabled}
                onClick={funcSend}
              >
                {loader ? PopLoader : "➤"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const PopUpChatNew = ({
  opener,
  closeOpener,
  Message,
  Username,
  loading,
  AllChats,
}) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
    }
  }, [Message]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "auto" });
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {opener && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary text-white px-4 py-3 rounded-t-2xl">
            <div className="flex gap-x-2 items-center">
              <div className="relative w-6 h-6 overflow-hidden rounded-full">
                <Image src={Eva} alt="Eva" fill className="object-cover" />
              </div>

              <h3 className="font-semibold text-sm">Chat With EVA</h3>
            </div>
            <button
              onClick={closeOpener}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          <div
            ref={bottomRef}
            className="flex-1 flex-col gap-3 px-2 mt-5 pb-5 space-y-2 text-sm overflow-y-auto h-[calc(100vh-200px)]"
          >
            <div className="self-start bg-gray-100 px-3 py-2 rounded-lg w-fit">
              Hi {Username} 👋
            </div>
            <div className="self-start bg-gray-100 px-3 py-2 rounded-lg w-fit">
              Welcome to Elpis Academy, I'm EVA your trading virtual advisor,
              What will you like me to help you with today ?{" "}
            </div>

            {/* User Message */}
            {loading ? (
              <div className="bg-gray-200 px-3 py-2 rounded-md text-sm text-black w-fit mr-auto">
                {WhiteLoader}
              </div>
            ) : (
              <>
                {AllChats.map((item) => (
                  <div key={item.id}>
                    {/* User Message */}
                    <div className="bg-primary px-3 py-2 selection:bg-gray-300 rounded-md text-sm select-all text-white w-fit mb-2 ml-auto">
                      {item.request}
                    </div>

                    {/* Eva Message */}

                    <>
                      <>
                        {item.reply && (
                          <div className="bg-gray-100 px-3 py-2 select-text rounded-md text-sm text text-black w-fit prose prose-invert prose-p:py-2 prose-li:py-1 max-w-none mr-auto">
                            {item.audioUrl ? (
                              <div className="bg-gray-100 px-3 py-2 select-text shadow-sm w-full rounded-md text-sm mb-2 text text-black prose prose-invert prose-p:py-2 prose-li:py-1 max-w-none mr-auto">
                                <PlayAudioTwo audioUrl={item.audioUrl} />
                              </div>
                            ) : null}

                            <ReactMarkdown
                              components={{
                                p: ({ children }) => (
                                  <p className="my-2">{children}</p>
                                ),
                                li: ({ children }) => (
                                  <li className="my-1">{children}</li>
                                ),
                              }}
                            >
                              {item.reply}
                            </ReactMarkdown>
                          </div>
                        )}
                      </>
                    </>
                  </div>
                ))}
              </>
            )}
          </div>
          {/*DisplayFly && <FlyOver />*/}
        </div>
      )}
    </>
  );
};
