import {
  DateTimeTag,
  NotPops,
  PopLoader,
  WhiteLoader,
} from "@/app/util/ToastLoader";
import {
  Bot,
  ChartArea,
  ChartBar,
  Ellipsis,
  Eye,
  GrapeIcon,
  Grip,
  Hamburger,
  LineChart,
  MessageCircle,
  MessageCircleDashed,
  MessageCircleQuestion,
  Mic,
  MicVocal,
  PieChart,
  Trash2,
  X,
  Calculator,
  HelpCircle,
  ArrowBigLeft,
  ChevronLeft,
  MessageCircleMore,
  BrushCleaning,
  ArrowUp,
} from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Eva from "@/app/assets/images/eva.jpg";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useRef, useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import PlayAudioTwo from "./AudioplayTake";
import { Avatar, Flex, Badge, DropdownMenu } from "@radix-ui/themes";
import Link from "next/link";
import { BotDataLoad, ChatDiplayLoad } from "@/app/util/Loader";
import { CompEmpty } from "../../EmptyComp/CompEmpty";
import { LongBtn } from "../../Buttons/BtnLarge";
import { v4 as uuidv4 } from "uuid";
import { ChatList, ChatListHis } from "@/app/connector/DataListDisplay";
import { ConnectData } from "@/app/connector/CloggerFunc";
import { motion, AnimatePresence } from "framer-motion";
import { ref, remove, set } from "firebase/database";
import { DB } from "@/app/Firebase/AuthHolder";

export const EvaBtn = ({ openChat, DisplayCaller }) => {
  return (
    <button
      onClick={openChat}
      className="fixed bottom-6 right-6 z-50 flex cursor-pointer items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary transition-all duration-200"
    >
      {DisplayCaller ? (
        <Ellipsis className="w-5 h-5" />
      ) : (
        <Bot className="w-5 h-5" />
      )}
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
      <div className="flex items-center gap-3">
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

const TitleDateCard = ({ title, date, onClick }) => {
  return (
    <div
      className="w-full border border-gray-200 cursor-pointer rounded-lg p-4 bg-white"
      onClick={onClick}
    >
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{date}</p>
    </div>
  );
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
  openFloat,
  Floater,
  FloaterTwo,
  OwnData,
  OwnLoad,
}) => {
  const bottomRef = useRef(null);
  const [isFlat, setIsFlat] = useState(false);
  const [isMenu, setIsMenu] = useState(1);

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

  const ClickMenu = (nos) => {
    setIsMenu(nos);
  };

  const FloaterDisplay = (
    <div className="relative inline-block text-left">
      {openFloat && (
        <div
          className={`absolute right-2 mt-2 w-[120px] whitespace-nowrap rounded-md bg-white shadow-lg  z-50 border-[1px] border-gray-300 transition-all duration-200 ease-out ${openFloat ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-95 pointer-events-none"}`}
        >
          <ul className="py-1 text-sm">
            <li className="flex items-center gap-2 px-2 py-2 text-xs text text-black hover:bg-gray-100 cursor-pointer">
              <MessageCircle size={14} />
              Start New Chat
            </li>
            <li
              className="flex items-center gap-2 px-2 py-2 text-xs text-black hover:bg-gray-100 cursor-pointer"
              onClick={closeOpener}
            >
              <X size={14} />
              Close Chat
            </li>
            <li
              className="flex items-center gap-2 px-2 py-2 text-xs hover:bg-red-50 text-red-600 cursor-pointer"
              onClick={closeOpener}
            >
              <Trash2 size={14} />
              Delete Chat
            </li>
          </ul>
        </div>
      )}
    </div>
  );

  const LayData = (
    <>
      {OwnLoad ? (
        <BotDataLoad count={10} />
      ) : (
        <>
          {OwnData.length > 0 ? (
            <>
              {OwnData.map((item) => (
                <TitleDateCard
                  key={item.id}
                  title={item.title}
                  date={item.date}
                />
              ))}
            </>
          ) : (
            <div className="flex justify-center h-full items-center">
              <CompEmpty
                Title={"No Chat Yet"}
                SmallTitle={`${"Start Chatting with EVA."}`}
                Btnn={<LongBtn onClick={openFloat} Title={"Start New Chat"} />}
              />
            </div>
          )}
        </>
      )}
    </>
  );

  const Lefter = (
    <>
      <div className="flex-1 flex-col gap-3 px-2 mt-5 pb-5 space-y-2 text-sm overflow-y-auto h-[calc(100vh-200px)]">
        {isMenu === 1 && LayData}
      </div>
      <div className="border-t z-10 border-gray-200 px-3 pt-[4px] pb-2 gap-2">
        <div className="flex justify-around items-center py-2">
          {/* Chats */}
          <button
            className={`flex flex-col items-center px-3 py-1 rounded-full ${isMenu === 1 ? "bg-gray-200 text-black font-semibold" : "text-gray-600"} gap-1 hover:text-black`}
            onClick={() => ClickMenu(1)}
          >
            <MessageCircleMore size={22} />
            <span className="text-[11px]">Chats</span>
          </button>

          {/* Calculator<button
            className={`flex flex-col items-center px-3 py-1 rounded-full ${isMenu === 2 ? "bg-gray-200 text-black font-semibold" : "text-gray-600"} gap-1 hover:text-black`}
            onClick={() => ClickMenu(2)}
          >
            <Calculator size={22} />
            <span className="text-[11px]">Calculator</span>
          </button> */}

          {/* Help */}
          <button
            className={`flex flex-col items-center px-3 py-1 rounded-full ${isMenu === 3 ? "bg-gray-200 text-black font-semibold" : "text-gray-600"} gap-1 hover:text-black`}
            onClick={() => ClickMenu(3)}
          >
            <HelpCircle size={22} />
            <span className="text-[11px]">Help</span>
          </button>
        </div>
      </div>
    </>
  );

  const Switch = (
    <>
      <div
        ref={bottomRef}
        className="flex-1 flex-col gap-3 px-2 mt-5 pb-5 space-y-2 text-sm overflow-y-auto h-[calc(100vh-200px)]"
      >
        <div className="self-start bg-gray-100 px-3 py-2 rounded-lg w-fit">
          Hi {Username} 👋
        </div>
        <div className="self-start bg-gray-100 px-3 py-2 rounded-lg w-fit">
          Welcome to Elpis Academy, I'm EVA your trading virtual advisor, What
          will you like me to help you with today ?{" "}
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
    </>
  );

  return (
    <>
      {opener && (
        <div className="fixed bottom-24 right-6 w-96 h-160 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary text-white px-4 py-3 rounded-t-2xl">
            <div className="flex gap-x-2 items-center">
              <div className="flex items-center">
                {isFlat && (
                  <button
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => {
                      ClickMenu(1);
                      setIsFlat(false);
                    }}
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                )}
                <div className="relative w-6 h-6 overflow-hidden rounded-full">
                  <Image src={Eva} alt="Eva" fill className="object-cover" />
                </div>
              </div>

              <h3 className="font-semibold text-sm">Chat With EVA</h3>
            </div>
            <button
              onClick={Floater}
              className="text-white hover:text-gray-200 cursor-pointer"
            >
              <Grip className="w-5 h-5" />
            </button>
          </div>
          {FloaterDisplay}
          {isFlat ? Switch : Lefter}
        </div>
      )}
    </>
  );
};

const getChatId = () => {
  return localStorage.getItem("chatId") || "";
};

export const EVAChatEngine = (data) => {
  const { userId, Username, opener, closeOpener } = data ? data : {};
  const bottomRef = useRef(null);
  const [isFlat, setIsFlat] = useState(false);
  const [isMenu, setIsMenu] = useState(1);
  const [Message, setMessage] = useState("");
  const [chatId, setChatId] = useState("");
  const [Reply, setReply] = useState("");
  const { ChatListData, LoadListData } = ChatListHis();

  const [wormData, setWormData] = useState([]);
  const chatIdFromStorage = getChatId();
  const { ChatData, LoadData } = ChatList(chatIdFromStorage);
  const [TempChat, setTempChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [SplitLoader, setSplitLoad] = useState(false);
  const [Type, setType] = useState("");
  const [IdChecker, setIdChecker] = useState("");
  const [openFloat, setopenFloat] = useState(false);
  const { LoaderUser, userData } = ConnectData();
  const [isFocused, setIsFocused] = useState(false);
  const AllChats = [...ChatData, ...TempChat];

  const closeflyer = () => {
    closeOpener();
    setopenFloat(false);
  };

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

  const ClickMenu = (nos) => {
    setIsMenu(nos);
  };

  const StartChat = () => {
    const docId = uuidv4();
    setChatId(docId);
    setopenFloat(false);
    setWormData([]);
    setIsFlat(true);
    setSplitLoad(true);
    setTimeout(() => {
      setSplitLoad(false);
      localStorage.setItem("chatId", docId);
    }, 4000);
  };

  const DisplayChat = (item) => {
    setWormData(item);
    localStorage.setItem("chatId", item.ChatId);
    setIsFlat(true);
    setSplitLoad(true);
    setTimeout(() => {
      setSplitLoad(false);
    }, 2000);
  };

  const ClearChat = () => {
    setSplitLoad(true);
    const CrsUrlQ = `Eva Request Users/${userId}/${chatIdFromStorage}`;
    set(ref(DB, CrsUrlQ), null)
      .then(() => {
        NotPops("success", "Chat Cleared Successfully");
        setSplitLoad(false);
      })
      .catch((e) => {
        NotPops("error", e.message);
        setSplitLoad(false);
      });
  };

  const DeleteChat = () => {
    setSplitLoad(true);
    const CrsUrlQ = `Eva Request Users/${userId}/${chatIdFromStorage}`;
    const CrsUrlQHis = `Eva Chat List Display/${userId}/${userId}/${chatIdFromStorage}`;
    set(ref(DB, CrsUrlQ), null);
    remove(ref(DB, CrsUrlQHis))
      .then(() => {
        NotPops("success", "Chat Deleted Successfully");
        setSplitLoad(false);
        setIsFlat(false);
      })
      .catch((e) => {
        NotPops("error", e.message);
        setSplitLoad(false);
      });
  };
  const SendChat = async (item) => {
    if (!Message.trim()) return;
    setIdChecker(item ? item.id : "");

    const tempId = Date.now(); // unique id for temporary message
    const newChat = {
      id: tempId,
      request: Message,
      reply: "",
      loading: true,
      type: item ? item.type : "chat",
    };
    setLoading(true);
    setTempChat((prev) => [...prev, newChat]);
    setMessage("");

    try {
      const Data = {
        msg: newChat.request,
        userId: userId,
        token_charge: 2000,
        type: item ? item.type : "chat",
        chatId: chatIdFromStorage,
      };

      const res = await fetch("/api/chatOsGpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Data),
      });

      if (!res.ok)
        throw new Error(`Hey ${Username} 😊, Connection Error, Kindly Retry`);
      const data = await res.json();

      // Update local temporary message
      setTempChat((prev) =>
        prev.map((chat) =>
          chat.id === tempId
            ? { ...chat, reply: data.response || data.reply, loading: false }
            : chat,
        ),
      );

      // Once Firebase updates, ChatData will include this chat,
      // and you can clear TempChat to avoid duplicates
      setTimeout(() => setTempChat([]), 1500);
      setLoading(false);
    } catch (err) {
      console.log("Error:", err.message);
      setLoading(false);
      setTempChat((prev) =>
        prev.map((chat) =>
          chat.id === tempId
            ? {
                ...chat,
                reply: err.message || "❌ Network error. Please try again.",
                loading: false,
              }
            : chat,
        ),
      );
    }
  };

  const FloaterDisplay = (
    <div className="relative inline-block text-left">
      {openFloat && (
        <div
          className={`absolute right-2 mt-2 w-[120px] whitespace-nowrap rounded-md bg-white shadow-lg  z-50 border-[1px] border-gray-300 transition-all duration-200 ease-out ${openFloat ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-1 scale-95 pointer-events-none"}`}
        >
          <ul className="py-1 text-sm">
            <li
              className="flex items-center gap-2 px-2 py-2 text-xs text text-black hover:bg-gray-100 cursor-pointer"
              onClick={() => StartChat()}
            >
              <MessageCircle size={14} />
              Start New Chat
            </li>
            <li
              className="flex items-center gap-2 px-2 py-2 text-xs text-black hover:bg-gray-100 cursor-pointer"
              onClick={closeflyer}
            >
              <X size={14} />
              Close Chat
            </li>
            {isFlat && (
              <>
                <li
                  className="flex items-center gap-2 px-2 py-2 text-xs hover:bg-yellow-50 text-yellow-600 cursor-pointer"
                  onClick={() => ClearChat()}
                >
                  <BrushCleaning size={14} />
                  Clear Chat
                </li>
                <li
                  className="flex items-center gap-2 px-2 py-2 text-xs hover:bg-red-50 text-red-600 cursor-pointer"
                  onClick={() => DeleteChat()}
                >
                  <Trash2 size={14} />
                  Delete Chat
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );

  const LayData = (
    <>
      {LoadListData ? (
        <BotDataLoad count={10} />
      ) : (
        <>
          {ChatListData.length > 0 ? (
            <>
              {ChatListData.map((item) => (
                <TitleDateCard
                  key={item.id}
                  title={
                    item.Title
                      ? item.Title.length > 50
                        ? (
                            item.Title.charAt(0).toUpperCase() +
                            item.Title.slice(1)
                          ).substring(0, 50) + "..."
                        : item.Title.charAt(0).toUpperCase() +
                          item.Title.slice(1)
                      : ""
                  }
                  onClick={() => DisplayChat(item)}
                  date={<DateTimeTag TakeDate={item.DateAdded} />}
                />
              ))}
            </>
          ) : (
            <div className="flex justify-center h-full items-center">
              <CompEmpty
                Title={"No Chat Yet"}
                SmallTitle={`${"Start Chatting with EVA."}`}
                Btnn={
                  <LongBtn
                    onClick={() => StartChat()}
                    Title={"Start New Chat"}
                  />
                }
              />
            </div>
          )}
        </>
      )}
    </>
  );

  const Lefter = (
    <>
      <div className="flex-1 flex-col gap-3 px-2 mt-5 pb-5 space-y-2 text-sm overflow-y-auto h-[calc(100vh-200px)]">
        {isMenu === 1 && LayData}
      </div>
      <div className="border-t z-10 border-gray-200 px-3 pt-[4px] pb-2 gap-2">
        <div className="flex justify-around items-center py-2">
          {/* Chats */}
          <button
            className={`flex flex-col items-center px-3 py-1 rounded-full ${isMenu === 1 ? "bg-gray-200 text-black font-semibold" : "text-gray-600"} gap-1 hover:text-black`}
            onClick={() => ClickMenu(1)}
          >
            <MessageCircleMore size={22} />
            <span className="text-[11px]">Chats</span>
          </button>

          {/* Calculator<button
            className={`flex flex-col items-center px-3 py-1 rounded-full ${isMenu === 2 ? "bg-gray-200 text-black font-semibold" : "text-gray-600"} gap-1 hover:text-black`}
            onClick={() => ClickMenu(2)}
          >
            <Calculator size={22} />
            <span className="text-[11px]">Calculator</span>
          </button> */}

          {/* Help */}
          <button
            className={`flex flex-col items-center px-3 py-1 rounded-full ${isMenu === 3 ? "bg-gray-200 text-black font-semibold" : "text-gray-600"} gap-1 hover:text-black`}
            onClick={() => ClickMenu(3)}
          >
            <HelpCircle size={22} />
            <span className="text-[11px]">Help</span>
          </button>
        </div>
      </div>
    </>
  );

  const Switch = (
    <>
      <div
        ref={bottomRef}
        className="flex-1 flex-col gap-3 px-2 mt-5 pb-5 space-y-2 text-sm overflow-y-auto h-[calc(100vh-200px)]"
      >
        <div className="self-start bg-gray-100 px-3 py-2 rounded-lg w-fit">
          Hi {Username} 👋
        </div>
        <div className="self-start bg-gray-100 px-3 py-2 rounded-lg w-fit">
          Welcome to Elpis Academy, I'm EVA your trading virtual advisor, What
          will you like me to help you with today ?
        </div>

        {/* User Message SplitLoader */}
        {LoadData || SplitLoader ? (
          <ChatDiplayLoad count={4} />
        ) : (
          <>
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
          </>
        )}
      </div>

      <div
        className={`${isFocused ? "border-[2px] border-primary" : "border-[1px] border-gray-300"} mx-2 mb-1  rounded-2xl px-3"}`}
      >
        <textarea
          rows={1}
          type="text"
          placeholder="Type a message…"
          className="w-full px-2 pt-4 my-2 rounded-xl text-[14px] border-0
             focus:outline-none focus:ring-0
             resize-none"
          style={{
            height: "40px",
            maxHeight: "100px",
            resize: "none",
            overflowY: "auto",
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setMessage(e.target.value)}
          value={Message}
        />
        <div className="flex gap-2 items-center pb-2 px-2 justify-between">
          <div className="w-[85%] items-start">
            <BtnLazer
              PassDataFunc={() => SendChat(item)}
              disabled={loading}
              IdChecker={Type.id}
            />
          </div>

          <button
            className="bg-primary text-white px-2 py-2  rounded-full hover:bg-primary"
            disabled={loading}
            onClick={() => {
              SendChat();
            }}
          >
            {loading ? PopLoader : <ArrowUp className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {opener && (
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 8 }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1], // smooth, premium curve
          }}
          className={`fixed z-60 bg-white shadow-2xl border border-gray-200 flex flex-col inset-0 w-full h-full rounded-none md:inset-auto md:bottom-24 md:right-6 md:w-96 md:h-160 md:rounded-2xl`}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-primary text-white px-4 py-3 rounded-t-2xl">
            <div className="flex gap-x-2 items-center">
              <div className="flex items-center">
                {isFlat && (
                  <button
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => {
                      ClickMenu(1);
                      setIsFlat(false);
                    }}
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                )}
                <div className="relative w-6 h-6 overflow-hidden rounded-full">
                  <Image src={Eva} alt="Eva" fill className="object-cover" />
                </div>
              </div>

              <h3 className="font-semibold text-sm">Chat With EVA</h3>
            </div>
            <button
              onClick={() => setopenFloat(!openFloat)}
              className="text-white hover:text-gray-200 cursor-pointer"
            >
              <Grip className="w-5 h-5" />
            </button>
          </div>
          {FloaterDisplay}
          {isFlat ? Switch : Lefter}
        </motion.div>
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
        <div
          className={`fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-xl border menu ${opener ? "open" : ""} border-gray-200 flex flex-col z-50`}
        >
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
