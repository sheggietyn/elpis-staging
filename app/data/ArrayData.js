import {
  DollarSign,
  GraduationCap,
  Headphones,
  Clock,
  TrendingUp,
  Shield,
  Lightbulb,
  Settings,
  CheckCircle,
  UserCheck,
} from "lucide-react";
import Elpis from "@/app/assets/images/Elpis.png";
import Kodesh from "@/app/assets/images/Kodesh.png";
import Dunamis from "@/app/assets/images/dunamis.png";
import { DateAdder } from "../util/ToastLoader";

export const features = [
  {
    title: "Expert Instructors",
    description:
      "Learn from professional traders with decades of experience in global financial markets.",
    icon: "👨‍🏫",
  },
  {
    title: "Practical Learning",
    description:
      "Hands-on training with real market scenarios and live trading simulations.",
    icon: "📊",
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock mentorship and community support to help you succeed.",
    icon: "🚀",
  },
  {
    title: "Proven Results",
    description:
      "95% of our graduates achieve consistent profitability within their first year.",
    icon: "✅",
  },
];

export const tagItems = [
  {
    label: "Successful Trade",
    icon: CheckCircle,
    color: "bg-green-100 text-green-800",
  },
  {
    label: "Daily Income",
    icon: DollarSign,
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    label: "High Quality Training",
    icon: GraduationCap,
    color: "bg-blue-100 text-blue-800",
  },
  {
    label: "24/7 Support",
    icon: Headphones,
    color: "bg-purple-100 text-purple-800",
  },
  { label: "Timely Signals", icon: Clock, color: "bg-red-100 text-red-800" },
  {
    label: "Market Insights",
    icon: TrendingUp,
    color: "bg-pink-100 text-pink-800",
  },
  {
    label: "Secure Platform",
    icon: Shield,
    color: "bg-gray-100 text-gray-800",
  },
];

export const howItWorksData = [
  {
    icon: Lightbulb,
    title: "Step 1: Learn the Foundations",
    description:
      "Start with beginner-friendly trading lessons. We guide you through key concepts, market analysis, and Bible-based money principles.",
  },
  {
    icon: Settings,
    title: "Step 2: Apply the Strategy",
    description:
      "Put your knowledge to work. Access daily signal guidance, backtested strategies, and real-time support to start executing trades with wisdom.",
  },
  {
    icon: CheckCircle,
    title: "Step 3: Earn with Purpose",
    description:
      "Grow your income by trading or sharing Elpis with others. Build generational wealth with mentorship, affiliate bonuses,and kingdom alignment.",
  },
];

export const Courses = [
  {
    title: "Elpis Plan",
    description:
      "A comprehensive video training series designed for both new and experienced traders. EACM equips you with the full skill set to trade confidently — from the foundations of forex to advanced market execution. Lessons are simplified, strategic, and taught through a biblical lens, so you grow in both skill and spirit.",
    duration: "1 Month",
    SignalType: "Elpis",
    ExpDate: DateAdder(30).toString(),
    Token: 30000,
    pricecall: 100,
    students: "2,500+",
    rating: 4.9,
    price: "$100",
    euro: 87,
    pound: 77,
    bonus: 80,
    level: "The Foundation Builder",
    checklist: [
      "1 Month full access",
      "Core trading education + structured mentorship",
      "Elpis Orim signal room access",
      "Community support &  Traders e-Guide",
    ],
    SmallTitle: "EACM-Elpis Academy Course Modules",
    id: 1,
    image: Elpis,
  },
  {
    title: "Kodesh Elite",
    description:
      "Get refined trade setups, real-time strategy breakdowns, and insight-driven confirmations to trade with deeper conviction.",
    duration: "6 weeks",
    students: "1,800+",
    SignalType: "Kodesh",
    ExpDate: DateAdder(42).toString(),
    Token: 50000,
    pricecall: 150,
    euro: 131.11,
    pound: 115.57,
    rating: 4.8,
    price: "$150",
    bonus: 130,
    level: "The Deep Diver",
    checklist: [
      "6 Weeks advanced access",
      "Everything in Elpis, plus deeper market execution",
      "Kodesh Netivah signal room access",
      "Live trading room access & interactive mentorship",
    ],
    SmallTitle: "Includes everything in Elpis Plan, plus:",
    id: 2,
    image: Kodesh,
  },
  {
    title: "Dunamis Rahab",
    description: "Includes everything in Elpis + Kodesh, plus:",
    duration: "3 Months",
    students: "950+",
    SignalType: "Dunamis",
    ExpDate: DateAdder(90).toString(),
    Token: 100000,
    pricecall: 250,
    rating: 4.9,
    price: "$250",
    euro: 218.53,
    pound: 192.61,
    bonus: 230,
    level: "The Master Builder",
    checklist: [
      "3 Months premium access",
      "Everything in Elpis + Kodesh combined",
      "Dunamis Rahab advanced signal room",
      "Priority mentorship + 1-On-1 onboarding call",
    ],
    SmallTitle: "Includes everything in Elpis + Kodesh, plus:",
    id: 3,
    image: Dunamis,
  },
];

export const CoursesII = [
  {
    title: "Elpis Plan",
    description:
      "A comprehensive video training series designed for both new and experienced traders. EACM equips you with the full skill set to trade confidently — from the foundations of forex to advanced market execution. Lessons are simplified, strategic, and taught through a biblical lens, so you grow in both skill and spirit.",
    duration: "1 Month",
    students: "500+",
    rating: 4.9,
    price: "$100",
    pricecall: 100,
    level: "The Foundation Builder",
    checklist: ["1 Month", "Mentorship & Community access", "Trade Guide"],
    SmallTitle: "EACM-Elpis Academy Course Modules",
    id: 1,
    image: Elpis,
  },
];

export const dataTray = [
  {
    icon: "Banknote",
    title: "Faith-Led Framework",
    desc: "We don’t just teach markets. We align strategies with kingdom principles — so you build wealth with purpose, not pressure.",
  },
  {
    icon: "GraduationCap",
    title: "Mentorship & Strategic Guidance",
    desc: "Get daily trading support through mentorship, signal access, and strategy breakdowns. Elpis equips you to grow with clarity, not confusion.",
  },
  {
    icon: "Cpu",
    title: "Digital Tools & Journals",
    desc: "From our trading journal to bonus eGuides, Elpis gives you downloadable tools to track, reflect, and trade like a mogul.",
  },
  {
    icon: "Trophy",
    title: "Affiliate Income Stream",
    desc: "Earn as you learn by referring others to Elpis. Our affiliate program pays you for every signup — no experience required.",
  },
];

const color = "bg-white text-darkgold";
export const testimonials = [
  {
    name: "Chizoba, Nigeria 🇳🇬",
    comment:
      "Trading changed my life. I went from dreaming about financial freedom to actually living it. I've withdrawn over $15,000 flown business class, and invested in my future - and it all started from saying yes to mentorship- under mentorship Favour Ayemere.",
    color: color,
    rating: 4.9,
  },
  {
    name: "Jesse, Kenya 🇰🇪",
    comment:
      "This Mentorship changed everything.I built my mum a retirement home,fixed our family's electricity, and i'm now building my own house - all from trading. Godled me here when i was praying about my finances, under mentorship of coach Favour Ayemere",
    color: color,
    rating: 4.9,
  },
  {
    name: "Jaden, Nigeria 🇳🇬",
    comment:
      "I started with zero trading knowledge. By Day 4, I'd already made over $1,000 in profit. I'm still in shock - I never imagined i could do this, Thanks You Coach",
    color: color,
    rating: 4.5,
  },
  {
    name: "Clement, Lagos 🇳🇬",
    comment:
      "I’m really happy I said yes to your coaching — I’m making thousands of dollars in trading now. I started with just $200 and grew it to $500 in one morning with zero losses.This month alone, I’ve made over $3,000 and I didn’t even post half my results. I’m making money consistently all thanks to your mentorship.",
    color: color,
    rating: 4.5,
  },

  {
    name: "— Teemah, Lagos 🇳🇬",
    comment:
      "I used to sell gas, but God used this opportunity to change my life. I’ve never made a single loss since I started trading.My first $272 profit came and I cashed it out immediately. I literally shouted, ‘See what God did!’ El-Roi sees me. What God cannot do does not exist. Thank you so much for this chance to rise.",
    color: color,
    rating: 4.5,
  },
  {
    name: "— Elizabeth, Oman 🇳🇬",
    comment:
      "Coach, this is the first time I’ve made real money online. I made $3,000 in one week — and withdrew $1,000 successfully.I used to be scared of trading. I abandoned it for 4 months because of losses. But after joining this mentorship, I finally understand the market.Gold used to frustrate me… now I’m frustrating it. I’m just so happy. God bless you",
    color: color,
    rating: 4.5,
  },
];
