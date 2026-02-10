import Image from "next/image";

export const ProfileLayout = () => {
  const user = {
    firstName: "Favour",
    lastName: "Ayemere",
    email: "favour@elpisacademy.com",
    phone: "+234 801 234 5678",
    role: "Founder, Elpis Academy",
    location: "Lagos, Nigeria",
    profileImage: "/images/profile-placeholder.png", // Replace with real image
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="relative w-28 h-28">
            <Image
              src={user.profileImage}
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-600">{user.role}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-sm">
          <div>
            <p className="text-xs text-gray-500 mb-1">First Name</p>
            <p className="font-semibold">{user.firstName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Last Name</p>
            <p className="font-semibold">{user.lastName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="font-semibold">{user.email}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Phone</p>
            <p className="font-semibold">{user.phone}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Location</p>
            <p className="font-semibold">{user.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfilerDi = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 font-sans">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-2xl border border-gray-200 relative overflow-hidden">
        <div className="relative">
          <img
            src="/avatar.png"
            alt="User Avatar"
            className="w-28 h-28 rounded-full object-cover border-4 border-[#D4AF3F] shadow-lg"
          />
          <div className="absolute -top-2 -right-2 bg-[#D4AF3F] w-5 h-5 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">
            Mazi Chinonso Collins
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Premium Digital Creator | Member since Jan 2024
          </p>
          <div className="mt-4 flex gap-3">
            <button className="px-5 py-2 text-sm bg-[#D4AF3F] text-white rounded-md hover:bg-[#a9882c] transition">
              ✏️ Edit Profile
            </button>
            <button className="px-5 py-2 text-sm border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition">
              ⚙️ Settings
            </button>
          </div>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl  border border-gray-100 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">
            👤 Profile Details
          </h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Username:</strong> mazi_collins
            </p>
            <p>
              <strong>Email:</strong> mazi@email.com
            </p>
            <p>
              <strong>Phone:</strong> +234 810 000 0000
            </p>
            <p>
              <strong>Country:</strong> Nigeria
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            🔒 Security Info
          </h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <strong>Password:</strong> ********
            </p>
            <button className="text-[#D4AF3F] text-sm hover:underline">
              Change Password
            </button>
          </div>
          <div className="pt-3">
            <p className="text-sm text-gray-600">
              <strong>2FA:</strong> Enabled
            </p>
            <button className="text-[#D4AF3F] text-sm hover:underline">
              Manage 2FA
            </button>
          </div>
        </div>
      </div>

      {/* Subscription + Account Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subscription Box */}
        <div className="bg-gradient-to-br from-[#fff9ec] to-white rounded-2xl border-l-4 border-[#D4AF3F] p-6 relative">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            🌟 Your Subscription
          </h2>
          <p className="text-sm text-gray-600">
            Plan: <span className="font-medium text-gray-900">Pro Access</span>
          </p>
          <p className="text-sm text-gray-600">
            Next Billing:{" "}
            <span className="font-medium text-gray-900">Oct 5, 2025</span>
          </p>
          <button className="absolute top-4 right-4 text-xs px-3 py-1 bg-[#D4AF3F] text-white rounded-md hover:bg-[#a9882c] transition">
            Upgrade
          </button>
        </div>

        {/* Account Details Form */}
        <div className="bg-gradient-to-br from-[#fff6e0] to-white rounded-2xl border-l-4 border-[#A97A22] p-6 relative">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🏦 Account Details
          </h2>
          <form className="space-y-4">
            {[
              { label: "Bank Name", placeholder: "Enter bank name" },
              { label: "Account Number", placeholder: "Enter account number" },
              { label: "Account Name", placeholder: "Enter account name" },
            ].map((item, i) => (
              <div key={i}>
                <label className="block text-sm font-medium text-gray-600">
                  {item.label}
                </label>
                <input
                  type="text"
                  placeholder={item.placeholder}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4AF3F] text-sm"
                />
              </div>
            ))}
            <button
              type="submit"
              className="absolute top-4 right-4 text-xs px-3 py-1 bg-[#A97A22] text-white rounded-md hover:bg-[#805f1a] transition"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
