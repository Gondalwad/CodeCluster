import React from "react";
import Input from "./ui/Input"

export default function Profile() {
  const [newEmail, setNewEmail] = React.useState("DummyEmail@codecluster.com");
  const joinedDate = "22-08-2000";


  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-(--border) rounded-2xl p-8 shadow-2xl shadow-indigo-500/10 transition-transform duration-300">
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
              alt="Profile"
              className="relative w-28 h-28 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-md"
            />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-(--text-h)">Jane Doe</h2>
          <p className="text-sm text-(--text) mt-1">Software Engineer & Tech Enthusiast</p>

          <div className="w-full h-px bg-(--border) my-6"></div>
        
          <div className="w-full space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Email Address</label>
              <Input type={"email"} onChange={(e) => setNewEmail(e.target.value)} placeholder={"Enter Your Email"} value={newEmail} className={"w-full bg-gray-100 py-2 focus:text-white dark:bg-slate-800"} />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">Joined</label>
              <Input type={"text"} value={joinedDate} className={"w-full bg-gray-100 py-2 cursor-not-allowed dark:bg-slate-800"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
