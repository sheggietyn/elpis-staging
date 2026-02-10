// app/readme/page.tsx (Next.js 13+ with App Router)
"use client";

export default function page() {
  const pages = [
    {
      name: "Home",
      description:
        "Displays Statistics of Activities on the website and link shortcut",
      features: [
        "All User: Displays count of all signed up users on the website",
        "All Affiliate: Displays count of all users that become an affiliate",
        "All Active Student:Displays count of all users that become student",
      ],
    },
    {
      name: "All Users",
      description:
        "Displays all users and functions on how to control users as an admin",
      features: [
        "Top Search: Search by Subcription Status, Search by Email",
        "Button One: View user sign up Info",
        "Button Two: Manually give user access to Subcription, Signal Plan, Affiliate Plan",
        "Button Three: Manually Assign/switch a user to an Affiliate, if they signed up with or without an affiliate link",
        "Button Four: Upgrade a User to an Admin position on the dashboard",
      ],
    },
    {
      name: "Create Courses",
      description: "All courses upload and display",
      features: [
        "Create Course: (Course Title,Course Description, Course Tag, Course Instructor)",
        "Add Module: Add Course Module (Course Videos, Course Description)",
        "Edit: Edit/Update Course Description",
        "Delete Button: Deletes Course Description",
      ],
    },
    {
      name: "Profile",
      description: "User account settings and personal information.",
      features: [
        "Editable profile details",
        "Change password option",
        "Subscription details",
        "Logout button",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        📘 Project Readme (User Dashboard)
      </h1>

      <div className="max-w-4xl mx-auto space-y-6 h-[70vh] overflow-y-auto pr-2">
        {pages.map((page) => (
          <div
            key={page.name}
            className="bg-white rounded-2xl shadow p-6 border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {page.name}
            </h2>
            <p className="text-gray-600 mb-4">{page.description}</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {page.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
