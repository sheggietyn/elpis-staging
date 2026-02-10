"use client";
import { useState, useContext } from "react";
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
  Users,
  Pencil,
  Vault,
  Quote,
  CalendarClockIcon,
  Newspaper,
  UsersRoundIcon,
  CreditCard,
  BookA,
  BookCopyIcon,
  BotIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, Flex, Badge, DropdownMenu } from "@radix-ui/themes";
import { TinyBtn } from "../../Buttons/BtnLarge";
import { child, ref, remove } from "firebase/database";
import { DB, auth } from "@/app/Firebase/AuthHolder";
import { clearSession } from "@/app/Libs/Session";
import { redirect, usePathname, useRouter } from "next/navigation";
import { AuthContext } from "@/app/auth/AuthProvider";
import { ConnectData } from "@/app/connector/CloggerFunc";
import { NotPops } from "@/app/util/ToastLoader";

export const DashboardAdmin = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const user = useContext(AuthContext);
  const userData = ConnectData();
  const Team_Member = userData ? userData.Team_Member || false : false;

  const HomeArray = [
    {
      name: "Home",
      icon: <Home className="w-5 h-5" />,
      href: "/adminpanel/home",
    },
  ];

  const studentResources = [
    {
      name: "All Users",
      icon: <Users className="w-5 h-5" />,
      href: "/adminpanel/users",
    },
    {
      name: "Create Courses",
      icon: <Pencil className="w-5 h-5" />,
      href: "/adminpanel/create",
    },

    {
      name: "Add Resources",
      icon: <Vault className="w-5 h-5" />,
      href: "/adminpanel/resourceshub",
    },
  ];

  const EventArray = [
    {
      name: "Create Qoutes",
      icon: <Quote className="w-5 h-5" />,
      href: "/adminpanel/createqoute",
    },
    {
      name: "Create Events",
      icon: <CalendarClockIcon className="w-5 h-5" />,
      href: "/adminpanel/createevent",
    },

    {
      name: "Create News",
      icon: <Newspaper className="w-5 h-5" />,
      href: "/adminpanel/createnews",
    },
  ];

  const ChatArray = [
    {
      name: "EVA Management",
      icon: <BotIcon className="w-5 h-5" />,
      href: "/adminpanel/eva",
    },
  ];

  const affiliateArena = [
    {
      name: "All Transactions",
      icon: <CreditCard className="w-5 h-5" />,
      href: "/adminpanel/transaction",
    },
    {
      name: "Affiliate/Payout",
      icon: <Trophy className="w-5 h-5" />,
      href: "/adminpanel/affiliate",
    },
  ];

  const readmeArray = [
    {
      name: "Read Me Admin Panel",
      icon: <BookA className="w-5 h-5" />,
      href: "/adminpanel/readme",
    },
  ];
  {
    /*
      name: "Read Me Dashboard",
      icon: <BookCopyIcon className="w-5 h-5" />,
      href: "/adminpanel/readmeUser",
  */
  }
  const SessionDel = child(ref(DB), `Session/${user.uid}`);

  const Signerr = () => {
    window.location.href = "/login"; // Fallback for client-side redirect
  };

  const SignOut = async () => {
    try {
      // Perform session cleanup
      await Promise.all([
        remove(SessionDel), // Assuming this is an async function to remove session data
        clearSession(user.uid), // Assuming this is an async function to clear session
      ]);

      // Sign out from Firebase
      await auth.signOut();

      // Show success notification
      NotPops("success", "Logout Success");

      // Perform redirect after all operations are complete
      Signerr();
    } catch (error) {
      console.error("Error during sign-out:", error.message);
      NotPops("error", "Logout Failed");
    }
  };

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
            href="/adminpanel/news"
            className="w-full px-4 block py-2 text-sm text-left text-gray-700 rounded-md transition-colors duration-200 hover:bg-primary"
          >
            News Update
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );

  return (
    <div className="flex h-[100vh] bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static flex flex-col`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-[#F2E8E8]">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
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

          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-2 px-2">
            EVA Control Panel{" "}
          </p>
          {ChatArray.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 font-medium text-gray-700 hover:bg-gray-200 transition-colors rounded"
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}

          {/* Section: Student & Resources */}
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mb-2 mt-4 px-2">
            Creator / Editor
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
          {/* Section: Affiliate Arena */}
          <p className="text-xs text-gray-600 uppercase font-semibold tracking-wide mt-6 mb-2 px-2">
            Transaction & Payments
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

          {/* Section: Resources Vault */}
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-6 mb-2 px-2">
            News, Qoutes & Events
          </p>
          {EventArray.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 font-medium text-gray-700 hover:bg-gray-200 transition-colors rounded"
            >
              {item.icon}
              <span className="ml-3">{item.name}</span>
            </Link>
          ))}

          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-6 mb-2 px-2">
            Read Me Manual
          </p>
          {readmeArray.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 font-medium text-gray-700 hover:bg-gray-200 transition-colors rounded"
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
            <Link href="/adminpanel/create">
              <TinyBtn
                btnText={
                  <span className="flex gap-1 justify-center items-center">
                    <Pencil className="w-4 h-4" />
                    <div>Add Courses</div>
                  </span>
                }
              />
            </Link>
            <div className="flex items-center space-x-4">{Lefter}</div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-3 md:p-6">{children}</main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-white/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};
