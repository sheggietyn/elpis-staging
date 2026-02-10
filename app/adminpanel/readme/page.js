// app/readme/page.tsx (Next.js 13+ with App Router)
"use client";

export default function page() {
  const pages = [
    {
      name: "Admin Panel Home",
      description:
        "Displays Statistics of Activities on the website and link shortcut",
      features: [
        "All User: Displays count of all signed up users on the website",
        "All Affiliate: Displays count of all users that become an affiliate",
        "All Active Student:Displays count of all users that become student",
        "All Signal AddOns:Displays count of all users that purchased Addons",
        "All Subscription: Displays total subcription cash sales",
        "All Affiliate Sales: Displays total affiliate cash sales",
        "All Signal AddOns Sales:Displays total signal addon cash sales",
        "All Affiliate CashOut:Displays all Cashout from affiliate",
        "Other Shortcut Links:(Add Course, Add Resources,Add Qoutes, Add News) ",
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
      name: "Add Resources",
      description: "Add/Display Affiliate and Student Resources",
      features: [
        "Button One: Create Resources:(Resources Title, Resources Description, Resources Categories, Resources File Upload)",
        "Button Two: View/ Delete Resources Info",
      ],
    },
    {
      name: "All Transactions",
      description: "Display Recent and Waitlist Transactions",
      features: [
        "Button One: Drop Down: switch between transaction status",
        "Button Two: Search for transaction by first name",
        "Button Three: Displays transaction info onclick",
      ],
    },

    {
      name: "Affiliate/ Payout",
      description:
        "Display Affiliate Cashouts, Affiliate Earning Per sales & Affiliate Lists",
      features: [
        "Affiliate Cash Out: Button One: View Affiliate Payout Info(Includes Bank Account Info)",
        "Affiliate Cash Out: Button Two: Initiate Affiliate Payout, for both bank and USDT ",
        "Affiliate Earning List: List of Earning Per Affiliate and Button to View Complete Info",
        "Affiliate List: List of all Affiliate, Coming on the website and who reffered them info",
      ],
    },
    {
      name: "Create Qoutes",
      description: "Display Qoutes and Bible Verse",
      features: [
        "Create Qoute: Button One: Create New Qoute",
        "Create Qoute: Button Two: View/Delete Qoute Info",
        "Create Bible Verse: Button One: Create New Verse",
        "Create Bible Verse: Button Two: View/Delete Verse Info",
      ],
    },

    {
      name: "Create Events",
      description: "Create Upcoming Events/ Webinar",
      features: [
        "Button One: Create Events Button",
        "Button Two: View/ Delete Info of Events Created",
      ],
    },

    {
      name: "Create News",
      description: "Create News and Updates for users",
      features: [
        "Button One: View All News/ Edit and Delete News",
        "Button Two: Clickto Create News",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">
        📘 Project Readme (Admin Panel)
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
