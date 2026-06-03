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
  Check,
  Copy,
  Maximize2,
  Minimize2,
  MessageCirclePlusIcon,
  MessageSquare,
  MicIcon,
  Plus,
  CheckIcon,
  XCircle,
  CalculatorIcon,
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
import { CompEmpty, CompEmptySmall } from "../../EmptyComp/CompEmpty";
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

const ChartArray = [
  {
    id: 1,
    name: "Think EVA(2.2)",
    icon: <MessageCircleQuestion size={12} />,
    type: "chat",
    color: "bg-green-100 text-green-700",
    Acolor: "text-green-700",
  },
  {
    id: 2,
    name: "Text to Speech",
    icon: <MicIcon size={12} />,
    type: "voice",
    color: "bg-pink-100 text-pink-700",
    Acolor: "text-pink-700",
  },

  {
    id: 3,
    name: "Calculate",
    icon: <CalculatorIcon size={12} />,
    type: "chart",
    color: "bg-blue-100 text-blue-700",
    Acolor: "text-blue-700",
  },

  {
    id: 4,
    name: "Analyze",
    icon: <ChartArea size={12} />,
    type: "analyze",
    color: "bg-orange-100 text-orange-700",
    Acolor: "text-orange-700",
  },
];

export const EVAChatEngine = (data) => {
  const { userId, Username, opener, closeOpener, userData } = data ? data : {};
  const bottomRef = useRef(null);
  const [isFlat, setIsFlat] = useState(false);
  const [isMenu, setIsMenu] = useState(1);
  const [Message, setMessage] = useState("");
  const [chatId, setChatId] = useState("");
  const [Reply, setReply] = useState("");
  const { ChatListData, LoadListData } = ChatListHis();
  const [wormData, setWormData] = useState([]);
  const chatIdFromStorage = getChatId();
  const { ChatData, LoadData, SendLoader } = ChatList(chatIdFromStorage);
  const [TempChat, setTempChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Recording, setRecording] = useState(false);
  const [SplitLoader, setSplitLoad] = useState(false);
  const [Type, setType] = useState("");
  const [IdChecker, setIdChecker] = useState("");
  const [openFloat, setopenFloat] = useState(false);
  //const { LoaderUser, userData } = ConnectData();
  const [isFocused, setIsFocused] = useState(false);
  //const AllChats = [...ChatData, ...TempChat];
  const [copied, setCopied] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [DataPasser, setDatapasser] = useState("");
  const [Floater, setFloater] = useState(false);
  const recognitionRef = useRef(null);
  const [draftText, setDraftText] = useState("");
  const mediaStreamRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const dataArrayRef = useRef(null);
  const canvasRef = useRef(null);
  const [Typer, setTyper] = useState("");

  const Fullname = userData
    ? `${userData.Firstname} ${userData.Lastname}`
    : "User";
  const PlanType = userData ? `${userData.PlanType}` : "Plan";

  const NameTag = userData
    ? `${userData.Firstname.slice(0, 1)}${userData.Lastname.slice(0, 1)}`
    : "--";

  const drawWave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    const render = () => {
      animationRef.current = requestAnimationFrame(render);

      if (!analyser || !dataArray) return;

      // 🔥 FULL WIDTH RESPONSIVE FIX
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width;
      canvas.height = rect.height;

      // 🔥 reset transform every frame
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;

      // 🔥 BASE LINE
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";

      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(canvas.width, centerY);
      ctx.stroke();

      // 🔥 CHATGPT STYLE BARS
      const bars = 80;
      const spacing = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const value = dataArray[i] || 0;

        // smooth subtle movement
        const height = (value / 255) * (canvas.height * 0.6);

        const x = i * spacing;

        ctx.beginPath();

        ctx.moveTo(x, centerY - height / 2);

        ctx.lineTo(x, centerY + height / 2);

        ctx.stroke();
      }
    };

    render();
  };

  const AllChats = (() => {
    const firebaseRequests = new Set(ChatData.map((c) => c.request));
    return [
      ...ChatData,
      ...TempChat.filter((t) => !firebaseRequests.has(t.request)),
    ].sort((a, b) => (a.DateAdded || 0) - (b.DateAdded || 0));
  })();

  // Compute all chats for display
  const AllChatsOld = (() => {
    const firebaseDocIds = new Set(ChatData.map((c) => c.DocId));
    const filteredTemp = TempChat.filter((t) => {
      const inFirebase = firebaseDocIds.has(t.DocId);
      const hasReply = !!t.reply && !t.error;
      return !inFirebase && (!hasReply || t.error);
    });

    return [...ChatData, ...filteredTemp].sort(
      (a, b) => (a.dateAdded || 0) - (b.dateAdded || 0),
    );
  })();

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
    SendLoader();
    localStorage.setItem("chatId", docId);

    //setSplitLoad(true);
    {
      /*setTimeout(() => {
      setSplitLoad(false);
    }, 4000);*/
    }
  };

  const ExpandScreenChat = () => {
    if (isFlat) {
      setFullScreen(!fullScreen);
    } else {
      if (!fullScreen) {
        StartChat();
        setFullScreen(!fullScreen);
      }
      setFullScreen(!fullScreen);
    }
  };
  const DisplayChat = (item) => {
    setWormData(item);
    localStorage.setItem("chatId", item.ChatId);
    if (fullScreen === false) {
      setIsFlat(true);
    }
    SendLoader();
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

  const handleCopy = async (item) => {
    const textToCopy = item.reply;
    setDatapasser(item.DocId);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };
  // Legacy First version of SendChat, Keep for Reference, Do Not Delete
  const SendChatVV = async (item) => {
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
      //console.log("Error:", err.message);
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

  const requestPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch (err) {
      alert("Microphone permission denied");
      return false;
    }
  };

  const AudioRecording = async () => {
    const Request = await requestPermission();
    if (Request) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert("Speech recognition not supported in this browser");
        return;
      }
      setLoading(true);
      const allowed = await requestPermission();
      if (!allowed) return;

      // 🎤 Speech recognition
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;

      //setStatus("recording");
      setDraftText("");

      recognition.onresult = (event) => {
        let text = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          text += event.results[i][0].transcript;
        }

        setDraftText(text);
      };

      recognition.start();

      // 🔥 AUDIO WAVE SETUP (NEW)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const audioContext = new AudioContext();

      // ✅ fix browser audio block
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 128;

      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      dataArrayRef.current = dataArray;

      source.connect(analyser);

      setTimeout(() => {
        drawWave();
      }, 100);
      setRecording(true);
    }
  };

  const StopRecording = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;

    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());

    cancelAnimationFrame(animationRef.current);

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setDraftText("");
    setLoading(false);
    setRecording(false);
  };

  const FinishRecording = () => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;

    if (draftText.trim()) {
      setMessage((prev) =>
        prev ? `${prev} ${draftText.trim()}` : draftText.trim(),
      );
    }
    setLoading(false);
    setTimeout(() => {
      setDraftText("");
    }, 500);
    setRecording(false);
  };

  // Instead of removing immediately on success, update it to show the reply

  const TypeChecker = (item) => {
    setTyper(item);
  };
  // and let the Firebase sync naturally replace it

  const SendChat = async (item) => {
    if (!Message.trim()) return;
    setIdChecker(Typer ? Typer.id : "");
    setTempChat([]);

    const tempId = Date.now();
    const newChat = {
      id: tempId,
      request: Message,
      reply: "",
      loading: true,
      error: false,
      type: Typer ? Typer.type : "chat",
      dateAdded: tempId, // ✅ add this
    };

    setLoading(true);
    setTempChat((prev) => [...prev, newChat]);
    setMessage("");

    try {
      const Data = {
        msg: newChat.request,
        userId: userId,
        token_charge: 2000,
        type: Typer ? Typer.type : "chat",
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

      // ✅ Update temp chat with reply — stays visible until Firebase takes over
      setTempChat((prev) =>
        prev.map((chat) =>
          chat.id === tempId
            ? { ...chat, reply: data.response || data.reply, loading: false }
            : chat,
        ),
      );
    } catch (err) {
      // ❌ Error: keep temp chat visible with error message (Firebase won't save this)
      setTempChat((prev) =>
        prev.map((chat) =>
          chat.id === tempId
            ? {
                ...chat,
                reply: err.message || "❌ Network error. Please try again.",
                loading: false,
                error: true,
              }
            : chat,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const BottomUIInfo = (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 rounded-full flex justify-center items-center bg-gray-200 p-2 text-md font-bold text-gray-700">
        {NameTag}
      </div>
      <div className="pl-2">
        <div className="text-sm font-semibold text-gray-900">{Fullname}</div>
        <div className="text-xs font-medium text-gray-600">{PlanType}</div>
      </div>
    </div>
  );

  const AudioRecoder = (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex items-center w-[100%]"
    >
      <canvas
        ref={canvasRef}
        className={`${Typer ? "w-[55%]" : "w-[70%]"} flex-1 h-[30px] pr-1`}
      />
      <button
        className="bg-gray-100 text-white px-2 py-2 mr-2 rounded-full hover:bg-primary hover:text-white"
        onClick={() => {
          StopRecording();
        }}
      >
        <X className="w-5 h-5 text-gray-700" />
      </button>
      <button
        className="bg-gray-100 text-white px-2 py-2 mr-1 rounded-full hover:bg-primary hover:text-white"
        onClick={() => {
          FinishRecording();
        }}
      >
        <CheckIcon className="w-5 h-5 font-extrabold text-gray-700 hover:text-white" />
      </button>
    </motion.div>
  );

  const FloatingUI = (
    <>
      <div className="z-30">
        <div className="relative inline-block text-left">
          {/* POP OUT */}
          <div
            className={`absolute bottom-full mb-2 w-[130px] rounded-md bg-white shadow-lg border border-gray-300 z-50 transition-all duration-200 ease-out
        ${
          Floater
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95 pointer-events-none"
        }`}
          >
            <ul className="py-1 text-sm">
              {ChartArray.map((item) => (
                <li
                  key={item.id}
                  onClick={() => !loading && TypeChecker(item)}
                  className={`flex items-center gap-2 px-2 py-2 text-xs text-black ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100 cursor-pointer"
                  }
`}
                >
                  {item.icon}
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* BUTTON (MOVED INSIDE, STYLE UNCHANGED) */}
          <div className="flex items-center gap-2">
            <button
              className="bg-gray-100 text-white px-2 py-2 mr-1 rounded-full hover:bg-primary hover:text-white"
              disabled={loading}
              onClick={() => setFloater(!Floater)}
            >
              <Plus className="w-4 h-4 text-gray-700" />
            </button>
            {Typer && (
              <div
                className={`text-[12px] font-medium ${Typer.color} px-3 py-2 rounded-lg flex items-center gap-1`}
              >
                {Typer.name}
                <button onClick={() => setTyper("")}>
                  <XCircle size={12} className={`${Typer.Acolor}`} />
                </button>
              </div>
            )}
          </div>
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
        <div className="self-start bg-gray-100 px-3 py-2 rounded-lg w-fit text-gray-900">
          Hi {Username} 👋
        </div>
        <div className="self-start bg-gray-100 px-3 py-2 rounded-lg w-fit text-gray-900">
          Welcome to Elpis Academy, I'm EVA your Elpis Virtual Analyst, What
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
                        <div className="mr-auto max-w-fit">
                          {/* Message Bubble */}
                          <div className="bg-gray-100 px-3 py-2 select-text rounded-md text-sm text-black prose prose-p:py-2 prose-li:py-1 max-w-none">
                            {chat.audioUrl && (
                              <div className="bg-gray-100 px-3 py-2 select-text shadow-sm w-full rounded-md text-sm mb-2 text-black">
                                <PlayAudioTwo audioUrl={chat.audioUrl} />
                              </div>
                            )}

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

                          {/* Copy Button – BELOW bubble */}
                          <button
                            onClick={() => handleCopy(chat)}
                            className="mt-2 ml-2 flex items-center gap-1 text-xs text-gray-500 hover:text-black transition"
                            title="Copy"
                          >
                            {copied && DataPasser === chat.DocId ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
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
        className={`${isFocused ? "border-[2px] border-primary" : "border-[1px] border-gray-300"} mx-2 mb-1 shadow-md rounded-2xl px-3"}`}
      >
        <textarea
          rows={1}
          type="text"
          placeholder="Type a message…"
          className="w-full px-2 pt-4 my-2 rounded-xl text-[14px] border-0
             focus:outline-none focus:ring-0
             resize-none text-gray-900"
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
          {/*<div className="w-[85%] items-start">
            <BtnLazer
              PassDataFunc={(item) => SendChat(item)}
              disabled={loading}
              IdChecker={Type.id}
            />
          </div>*/}
          {FloatingUI}

          {Recording ? (
            AudioRecoder
          ) : (
            <motion.div
              key="action"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center"
            >
              {" "}
              <button
                className="bg-gray-100 text-white px-2 py-2 mr-2 rounded-full hover:bg-primary hover:text-white"
                disabled={loading}
                onClick={() => {
                  AudioRecording();
                }}
              >
                <MicIcon className="w-5 h-5 text-gray-700 hover:text-white" />
              </button>
              <button
                className="bg-black text-white px-2 py-2 rounded-full hover:bg-primary"
                disabled={loading}
                onClick={() => {
                  SendChat();
                }}
              >
                {loading ? PopLoader : <ArrowUp className="w-5 h-5" />}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );

  const FloaterDisplay = (
    <div className="relative inline-block text-left">
      {openFloat && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          className="absolute right-2 mt-[2px] w-[120px] whitespace-nowrap rounded-md bg-white shadow-lg z-50 border border-gray-300"
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
              className="md:flex items-center gap-2 px-2 hidden py-2 text-xs text-black hover:bg-gray-100 cursor-pointer"
              onClick={() => ExpandScreenChat()}
            >
              {fullScreen ? (
                <>
                  <Minimize2 size={14} />
                  Normal Screen
                </>
              ) : (
                <>
                  <Maximize2 size={14} />
                  Full Screen
                </>
              )}
            </li>

            <li
              className="flex items-center gap-2 px-2 py-2 text-xs text-black hover:bg-gray-100 cursor-pointer"
              onClick={closeflyer}
            >
              <X size={14} />
              Close Chat
            </li>
            {(isFlat || fullScreen) && (
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
        </motion.div>
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

  {
    /* Full Screen Components */
  }

  const ChatlistData = (
    <>
      {LoadListData ? (
        <BotDataLoad count={10} />
      ) : (
        <>
          {ChatListData.length > 0 ? (
            <>
              {ChatListData.map((item) => (
                <div
                  className="p-2 rounded-lg hover:bg-gray-200 cursor-pointer text-sm text-gray-900"
                  onClick={() => DisplayChat(item)}
                  key={item.id}
                >
                  {item.Title
                    ? item.Title.length > 28
                      ? (
                          item.Title.charAt(0).toUpperCase() +
                          item.Title.slice(1)
                        ).substring(0, 28) + "..."
                      : item.Title.charAt(0).toUpperCase() + item.Title.slice(1)
                    : ""}
                </div>
              ))}
            </>
          ) : (
            <div className="flex justify-center h-full items-center">
              <div>
                <MessageCircleMore className="w-12 h-12 text-gray-300 mx-auto pb-2" />
                <CompEmpty
                  Title={"No Chat History"}
                  SmallTitle={`${"Chat History Displays here"}`}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );

  // Sidebar and Data Switcher

  const fullScreenData = (
    <div className="flex flex-1 overflow-hidden">
      {fullScreen && (
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-60 border-r border-r-gray-200  flex flex-col"
        >
          <div className="p-3 space-y-2 border-b border-b-gray-200 text-sm font-medium pt-5 text-gray-900">
            <button
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
              onClick={() => StartChat()}
            >
              <MessageCirclePlusIcon className="w-4 h-4" />
              Start New Chat
            </button>
            <div className="px-3 py-2 flex items-center gap-2">
              <MessageCircleMore className="w-4 h-4" />
              Previous Chats
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {ChatlistData}
          </div>
          <div className="p-3 space-y-1 border-t border-t-gray-200 text-sm font-medium pt-5">
            {BottomUIInfo}
          </div>
        </motion.div>
      )}
      <div className="flex-1 flex justify-center overflow-hidden">
        <div className="w-full max-w-3xl flex flex-col">
          <div className="flex-1 overflow-y-auto overscroll-contain px-4 md:px-6">
            {Switch}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {opener && (
        <motion.div
          layout
          initial={{ scale: 0.92, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`fixed z-60 bg-white shadow-2xl border border-gray-200 flex flex-col
      ${
        fullScreen
          ? "inset-0 w-full h-full rounded-none"
          : "inset-0 w-full h-full rounded-none md:inset-auto md:bottom-24 md:right-6 md:w-96 md:h-[40rem] md:rounded-2xl"
      }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between bg-gray-100 text-white px-4 py-3 ${
              fullScreen ? "rounded-none" : "rounded-t-2xl"
            }`}
          >
            <div className="flex gap-x-2 items-center">
              <div className="flex items-center">
                {isFlat && !fullScreen && (
                  <button
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => {
                      ClickMenu(1);
                      setIsFlat(false);
                    }}
                  >
                    <ChevronLeft className="w-5 h-5 text-black" />
                  </button>
                )}
                <div className="relative w-6 h-6 overflow-hidden rounded-full">
                  <Image src={Eva} alt="Eva" fill className="object-cover" />
                </div>
              </div>

              <h3 className="font-semibold text-sm text-black">
                Chat With EVA
              </h3>
            </div>
            <button
              onClick={() => setopenFloat(!openFloat)}
              className="text-black hover:text-primary cursor-pointer"
            >
              <Grip className="w-5 h-5" />
            </button>
          </div>
          {FloaterDisplay}
          {fullScreen ? fullScreenData : null}
          {fullScreen ? null : <>{isFlat ? Switch : Lefter}</>}
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
