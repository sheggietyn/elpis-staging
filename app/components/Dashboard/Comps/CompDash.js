"use client";
import { useState, useContext, useEffect } from "react";
import {
  Home,
  Menu,
  X,
  Book,
  Folder,
  Settings,
  LogOut,
  Hamburger,
  MenuIcon,
  Trophy,
  UserRound,
  UsersRound,
  Cross,
  ChartNoAxesCombined,
  MessageSquareDot,
  Backpack,
  Lock,
  LockIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, Flex, Badge, DropdownMenu } from "@radix-ui/themes";
import { TinyBtn } from "../../Buttons/BtnLarge";
import { child, ref, remove } from "firebase/database";
import { DB, auth } from "@/app/Firebase/AuthHolder";
import { clearSession } from "@/app/Libs/Session";
import { redirect, usePathname, useRouter } from "next/navigation";
import { AuthContext } from "@/app/auth/AuthProvider";
import Elpis from "@/app/assets/images/ElpisLogo.png";
import Image from "next/image";
import { ConnectData } from "@/app/connector/CloggerFunc";
import { NotPops } from "@/app/util/ToastLoader";
import { VerifyTnx } from "@/app/Libs/TxChecker";
import { EvaBtn, PopUpChat } from "./EvaBtn";
import { ChatList } from "@/app/connector/DataListDisplay";
import { v4 as uuidv4 } from "uuid";

export const Dashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isEvaOpen, setIsEvaOpen] = useState(false);
  const [Message, setMessage] = useState("");
  const [Reply, setReply] = useState("");
  const [Type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const { ChatData, LoadData } = ChatList();
  const [TempChat, setTempChat] = useState([]);
  const [audio, setAudio] = useState("");
  const [IdChecker, setIdChecker] = useState("");
  const [Dismodal, setDismodal] = useState(false);
  const DocID = uuidv4();
  const AllChats = [...ChatData, ...TempChat];

  const pathname = usePathname();
  const router = useRouter();
  const user = useContext(AuthContext);
  const { LoaderUser, userData } = ConnectData();

  const Username = userData ? userData.Username || "User" : "User";

  const HomeArray = [
    { name: "Home", icon: <Home className="w-5 h-5" />, href: "/home" },
  ];

  const studentResources = [
    {
      name: "My Courses",
      icon: <Book className="w-5 h-5" />,
      href: "/courses",
    },
    {
      name: "Signal Rooms",
      icon: <ChartNoAxesCombined className="w-5 h-5" />,
      href: "/signal",
    },

    {
      name: "Community",
      icon: <MessageSquareDot className="w-5 h-5" />,
      href: "/community",
    },

    {
      name: "Faith",
      icon: <Cross className="w-5 h-5" />,
      href: "/faith",
    },
  ];

  const ResourceArray = [
    {
      name: "Resources Vault",
      icon: <Backpack className="w-5 h-5" />,
      href: "/resources",
    },
  ];

  const settingArray = [
    {
      name: "Profile",
      icon: <UserRound className="w-5 h-5" />,
      href: "/profile",
    },
  ];

  const affiliateArena = [
    {
      name: "Affiliate",
      icon: <Trophy className="w-5 h-5" />,
      href: "/affiliate",
    },
  ];

  const SessionDel = child(ref(DB), `Session/${user.uid}`);
  const Signerr = () => {
    // Redirect first
    window.location.href = "/login";
  };

  const SignOut = async () => {
    try {
      await Promise.all([remove(SessionDel), clearSession(user?.uid)]);
      await auth.signOut();
      NotPops("success", "Logout Success");
      Signerr(); // redirect AFTER cleanup
    } catch (error) {
      console.error("Error during logout cleanup:", error.message);
      NotPops("error", "Logout Failed");
    }
  };

  const SendChatII = () => {
    const Data = {
      msg: Message,
      userId: user.uid,
    };

    fetch("/api/chatOsGpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        setReply(data.reply);
      })
      .catch((err) => console.error("Error:", err));
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
        userId: user.uid,
        token_charge: 2000,
        type: item ? item.type : "chat",
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
            : chat
        )
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
            : chat
        )
      );
    }
  };

  const PaceFunc = (item) => {
    if (item.type === "chart") {
      setDismodal(!Dismodal);
    } else {
      SendChat(item);
    }
  };

  const LoremPop = (
    <PopUpChat
      opener={isEvaOpen}
      closeOpener={() => setIsEvaOpen(false)}
      value={Message}
      AllChats={AllChats}
      DisplayFly={Dismodal}
      Message={Message}
      Username={Username}
      Reply={Reply}
      loader={loading}
      IdChecker={Type.id}
      disabled={loading}
      disabledII={loading}
      loading={loading}
      PassDataFunc={(item) => SendChat(item)}
      onChange={(e) => setMessage(e.target.value)}
      funcSend={() => {
        SendChat();
      }}
    />
  );

  const Lefter = (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger variant="light" id="dropdown-basic">
        <div className={"flex items-center gap-1 mr-4"}>
          <UserRound className="w-5 h-5" />
          <span className="font-medium text-sm cursor-pointer">Help & FAQ</span>
          <DropdownMenu.TriggerIcon />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="font-sans custom-dropdown">
        <DropdownMenu.Item>
          <Link
            href="/news"
            className="w-full px-4 block py-2 text-sm text-left text-gray-700 rounded-md transition-colors duration-200 hover:bg-primary"
          >
            News Update
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );

  return (
    <>
      <div className="flex h-[100vh] bg-gray-100">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#FEFAFA] transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static flex flex-col`}
        >
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-[#F2E8E8]">
            <Image
              src={Elpis}
              alt="Elpis Academy Logo"
              width={130}
              height={32}
              className="ml-5"
            />

            <button
              className="md:hidden text-gray-600"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto mt-2 px-4 max-h-[calc(100vh-120px)]">
            {HomeArray.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 font-medium text-gray-700 hover:bg-gray-200 my-5 transition-colors rounded"
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}

            {/* Section: Student & Resources */}
            <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-2 px-2">
              Student & Resources
            </p>
            {studentResources.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 font-medium text-gray-700 hover:bg-gray-200 transition-colors rounded"
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}

            {/* Section: Resources Vault */}
            <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-6 mb-2 px-2">
              Aff & Student Resources
            </p>
            {ResourceArray.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 font-medium text-gray-700 hover:bg-gray-200 transition-colors rounded"
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
            {/* Section: Affiliate Arena */}
            <p className="text-xs text-gray-600 uppercase font-semibold tracking-wide mt-6 mb-2 px-2">
              Affiliate Portal
            </p>
            {affiliateArena.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 text-gray-700 font-medium hover:bg-gray-200 transition-colors rounded"
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}

            {/* Section: Profile and Setings */}
            <p className="text-xs text-gray-600 uppercase font-semibold tracking-wide mt-6 mb-2 px-2">
              Profile & Settings
            </p>

            {settingArray.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 mb-6 text-gray-700 font-medium hover:bg-gray-200 transition-colors rounded"
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Logout pinned to bottom */}
          <div className="border-t border-[#F2E8E8] p-4">
            <div
              href="/logout"
              className="flex items-center text-red-600 cursor-pointer hover:bg-red-100 transition-colors px-4 py-3 rounded"
              onClick={() => SignOut()}
            >
              <LogOut className="w-5 h-5" />
              <span className="ml-3">Log Out</span>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 w-full overflow-hidden flex flex-col min-h-screen">
          {/* Top Bar */}
          <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center">
              <button
                className="md:hidden text-gray-600 mr-4"
                onClick={() => setIsSidebarOpen(true)}
              >
                <MenuIcon className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800"></h1>
            </div>
            <div className="flex w-full justify-between items-center">
              <Link href="/courses">
                <TinyBtn
                  btnText={
                    <span className="flex gap-1 justify-center items-center">
                      <LockIcon className="w-4 h-4" />
                      <div>Unlock Courses</div>
                    </span>
                  }
                />
              </Link>
              <div className="flex items-center space-x-4">{Lefter}</div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-3 md:p-6">
            {children}
            {LoremPop}
            <EvaBtn openChat={() => setIsEvaOpen(true)} />
          </main>
        </div>

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-white/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
};
