import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            JB
          </div>
          <div>
            <h2 className="text-xl font-semibold">Joshua Basumatary</h2>
            <p className="text-gray-500">Admin Account • FMCG Organisation</p>
          </div>
        </div>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Full Name</label>
            <input type="text" defaultValue="Joshua Basumatary" className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Email Address</label>
            <input type="email" defaultValue="joshua@fmcg.com" className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium w-fit hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;