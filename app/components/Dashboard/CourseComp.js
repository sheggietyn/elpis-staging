import Image from "next/image";
import Stack from "@/app/assets/images/stack.png";
import { Book, Pencil, Trash2 } from "lucide-react";
import { TinyGrayBtn } from "../Buttons/BtnLarge";
import Link from "next/link";
import { myPosition } from "@/app/data/BankListData";

const courseList = [
  {
    id: 1,
    title: "Foundations of Forex",
    subtitle: "Lesson 1",
  },
  {
    id: 2,
    title: "Market Structure",
    subtitle: "Lesson 2",
  },
  {
    id: 3,
    title: "Risk Management",
    subtitle: "Lesson 3",
  },
  {
    id: 4,
    title: "Faith & Trading",
    subtitle: "Lesson 4",
  },
  {
    id: 5,
    title: "Smart Money Concepts",
    subtitle: "Lesson 5",
  },
  {
    id: 6,
    title: "Technical Analysis",
    subtitle: "Lesson 6",
  },
  {
    id: 7,
    title: "Psychology & Mindset",
    subtitle: "Lesson 7",
  },
  {
    id: 8,
    title: "Live Trading Breakdown",
    subtitle: "Lesson 8",
  },
];

export const EACMCourseBoxes = ({ courseList, course }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {courseList.map((item) => (
        <Link href={`/module/${item.id}`} key={item.id}>
          <div className="relative bg-[#FFF9F6] rounded-xl p-4 h-50 overflow-hidden shadow group">
            {/* Background image with overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src={Stack}
                alt={"course image"}
                fill
                className="opacity-6 w-30 h-30"
              />
            </div>

            {/* Overlay content */}
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="overflow-y-auto md:pb-0 pb-6 my-scroll-container">
                <div>
                  <h4 className="text-sm text-gray-600 font-medium mb-1">
                    {item.SubText}
                  </h4>
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.CourseTitle}
                  </h3>
                </div>
                <span className="text-xs text-eggplant font-semibold">
                  {item.CourseTag}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export const EACMCourseBoxesTwoSSSS = ({ courseList, course }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {courseList.map((course) => (
        <div
          key={course.id}
          className="relative bg-[#FFF9F6] rounded-xl p-4 h-40 overflow-hidden shadow group"
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={Stack}
              alt={course.title}
              fill
              className="opacity-6 w-30 h-30"
            />
          </div>

          {/* Overlay content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h4 className="text-sm text-gray-600 font-medium mb-1">
                {course.subtitle}
              </h4>
              <h3 className="text-lg font-bold text-gray-800">
                {course.title}
              </h3>
            </div>
            <span className="text-xs text-eggplant font-semibold">
              {course.tag}
            </span>
          </div>
          <div className="flex justify-between items-center bottom-5 w-full">
            <Link href={`https://digitalmogulacademy.com/module/${course.id}`}>
              <button className="text-sm px-2 py-1 bg-primary rounded-lg flex items-center justify-center">
                <Book className={"w-2 h-2"} />
                Add Modules
              </button>
            </Link>

            <button className="text-sm px-2 py-1 bg-primary rounded-lg flex items-center justify-center">
              <Pencil className={"w-2 h-2"} />
              Edit Title
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const EACMCourseBoxesTwoSS = ({
  courseList,
  onClickEdit,
  onClickDel,
  course,
  Team_Member,
  Team_Dept,
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {courseList.map((item) => (
        <div
          key={item.id}
          className="relative bg-[#FFF9F6] rounded-xl p-4 h-50 overflow-hidden shadow group"
        >
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src={Stack}
              alt={"course"}
              fill
              className="opacity-6 w-30 h-30"
            />
          </div>

          {/* Overlay content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="overflow-y-auto md:pb-0 pb-6">
              <div>
                <h4 className="text-sm md:text-xs text-gray-600 font-medium mb-[1px]">
                  {item.SubText}
                </h4>

                <h3 className="text-md font-bold text-gray-800">
                  {item.CourseTitle}
                </h3>
              </div>
              <span className="text-xs text-eggplant font-semibold">
                {item.CourseTag}
              </span>
            </div>
            {Team_Member &&
            (Team_Dept === myPosition.Ceo ||
              Team_Dept === myPosition.Tech ||
              Team_Dept === myPosition.Educator) ? (
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bottom-5 w-full gap-2">
                {/* Add Modules */}
                <Link href={`/adminpanel/curriculum/${item.id}`}>
                  <button className="text-xs px-2 py-1 bg-primary hover:bg-yellow-500 font-medium gap-x-2 rounded-lg flex items-center justify-center w-full sm:w-auto">
                    <Book className={"w-3 h-3"} />
                    Add Modules
                  </button>
                </Link>

                {/* Edit + Delete group for mobile */}
                <div className="flex gap-2 justify-center sm:justify-start">
                  <button
                    className="text-xs px-2 py-1 bg-primary hover:bg-yellow-500 font-medium gap-x-2 rounded-lg flex items-center justify-center"
                    onClick={() => onClickEdit(item)}
                  >
                    <Pencil className={"w-3 h-3"} />
                    Edit
                  </button>

                  <button
                    className="text-xs px-2 py-1 bg-primary hover:bg-yellow-500 font-medium gap-x-2 rounded-lg flex items-center justify-center"
                    onClick={() => onClickDel(item)}
                  >
                    <Trash2 className={"w-3 h-3"} />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export const ElpisSwitchBar = ({
  active,
  onClickOne,
  onClickTwo,
  Title,
  Subtext,
  BtnOne,
  BtnTwo,
}) => {
  const buttonClass = (level) =>
    `px-4 py-1.5 text-sm rounded-full border transition font-semibold ${
      active === level
        ? "bg-[#D4AF3F] text-white border-[#D4AF3F]"
        : "border-gray-300 text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-white rounded-md mb-5 shadow-sm">
      {/* Title and Subtext */}
      <div>
        <h3 className="text-base font-semibold text-gray-800">{Title}</h3>
        <p className="text-sm text-gray-500">{Subtext}</p>
      </div>

      {/* Switch Buttons */}
      <div className="flex gap-2">
        <button onClick={onClickOne} className={buttonClass("Beginner")}>
          {BtnOne}
        </button>
        <button onClick={onClickTwo} className={buttonClass("Intermediate")}>
          {BtnTwo}
        </button>
      </div>
    </div>
  );
};

export const ElpisSwitchBarTwo = ({
  active,
  onClickOne,
  onClickTwo,
  Title,
  Subtext,
  BtnOne,
  BtnTwo,
  SecondContent,
}) => {
  const buttonClass = (level) =>
    `px-4 py-1.5 text-sm rounded-full border transition font-semibold ${
      active === level
        ? "bg-[#D4AF3F] text-white border-[#D4AF3F]"
        : "border-gray-300 text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-white rounded-md mb-5 shadow-sm">
      {/* Title and Subtext */}
      <div className="flex items-center justify-between space-x-6">
        <div>
          <h3 className="text-base font-semibold text-gray-800">{Title}</h3>
          <p className="text-sm text-gray-500">{Subtext}</p>
        </div>
        {SecondContent}{" "}
      </div>

      {/* Switch Buttons */}
      <div className="flex gap-2">
        <button onClick={onClickOne} className={buttonClass("Beginner")}>
          {BtnOne}
        </button>
        <button onClick={onClickTwo} className={buttonClass("Intermediate")}>
          {BtnTwo}
        </button>
      </div>
    </div>
  );
};

export const ElpisSwitchBarII = ({
  active,
  onClickOne,
  onClickTwo,
  Title,
  Subtext,
  BtnOne,
  BtnTwo,
}) => {
  const buttonClass = (level) =>
    `px-4 py-1.5 text-sm rounded-full border transition font-semibold ${
      active === level
        ? "bg-[#D4AF3F] text-white border-[#D4AF3F]"
        : "border-gray-300 text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-white rounded-md md:mb-5 shadow-sm">
      {/* Title and Subtext */}
      <div>
        <h3 className="text-base font-semibold text-gray-800">{Title}</h3>
        <p className="text-sm text-gray-500">{Subtext}</p>
      </div>

      {/* Switch Buttons */}
      <div className="flex gap-2">
        <button onClick={onClickOne} className={buttonClass("Student")}>
          {BtnOne}
        </button>
        <button onClick={onClickTwo} className={buttonClass("Affiliate")}>
          {BtnTwo}
        </button>
      </div>
    </div>
  );
};

export const TopChanger = ({
  active,
  onClickOne,
  onClickTwo,
  Title,
  Subtext,
  BtnOne,
  BtnTwo,
  levelOne,
  levelTwo,
}) => {
  const buttonClass = (level) =>
    `px-4 py-1.5 text-sm rounded-full border transition font-semibold ${
      active === level
        ? "bg-[#D4AF3F] text-white border-[#D4AF3F]"
        : "border-gray-300 text-gray-700 hover:bg-gray-100"
    }`;
  return (
    <div className="flex gap-2">
      <button onClick={onClickOne} className={buttonClass(levelOne)}>
        {BtnOne}
      </button>
      <button onClick={onClickTwo} className={buttonClass(levelTwo)}>
        {BtnTwo}
      </button>
    </div>
  );
};

export const TopChangerII = ({
  active,
  onClickOne,
  onClickTwo,
  onClickTree,
  Title,
  Subtext,
  BtnOne,
  BtnTwo,
  levelOne,
  levelTwo,
  levelTree,
  BtnTree,
}) => {
  const buttonClass = (level) =>
    `px-4 py-1.5 text-sm rounded-full border transition font-semibold ${
      active === level
        ? "bg-[#D4AF3F] text-white border-[#D4AF3F]"
        : "border-gray-300 text-gray-700 hover:bg-gray-100"
    }`;
  return (
    <div className="flex gap-2">
      <button onClick={onClickOne} className={buttonClass(levelOne)}>
        {BtnOne}
      </button>
      <button onClick={onClickTwo} className={buttonClass(levelTwo)}>
        {BtnTwo}
      </button>
      <button onClick={onClickTree} className={buttonClass(levelTree)}>
        {BtnTree}
      </button>
    </div>
  );
};

export const PriceCompHold = ({ contentIn }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full md:w-1/2 rounded-lg px-4 mb-16 mt-4 md:px-0 md:mb-5 md:mt-0">
        <div className="w-full bg-white rounded-lg mb-3 mt-10 p-6">
          <h1 className="font-cinzel font-semibold text-lg text-center text-gray-900">
            Become an Elpis Student
          </h1>
          <p className="text-sm text-center text-gray-500">
            Unlock Elpis Trading Courses,Academy,Tools & Signal Room
          </p>
          {contentIn}
        </div>
      </div>
    </div>
  );
};

export const PriceCompHoldII = ({ contentIn }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full md:w-1/2 rounded-lg px-4 mb-16 mt-4 md:px-0 md:mb-5 md:mt-0">
        <div className="w-full bg-white rounded-lg mb-3 mt-10 p-6">
          {contentIn}
        </div>
      </div>
    </div>
  );
};

export const ElpisSwitchBarTop = ({ active, SecondTile, Title, Subtext }) => {
  const buttonClass = (level) =>
    `px-4 py-1.5 text-sm rounded-full border transition font-semibold ${
      active === level
        ? "bg-[#D4AF3F] text-white border-[#D4AF3F]"
        : "border-gray-300 text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex items-center justify-between flex-wrap gap-4 p-4 bg-white rounded-md mb-5 shadow-sm">
      {/* Title and Subtext */}
      <div>
        <h3 className="text-base font-semibold text-gray-800">{Title}</h3>
        <p className="text-sm text-gray-500">{Subtext}</p>
      </div>
      {SecondTile ? <div>{SecondTile}</div> : null}
    </div>
  );
};
