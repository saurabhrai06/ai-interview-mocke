'use client';
import React from 'react';
import { UserButton } from '@clerk/nextjs';
import Header from './_components/Header';
import AddNewInterview from './_components/AddNewInterview';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-200 to-slate-100 text-white">
      {/* Top-right UserButton above Header */}
      <div className="flex justify-end px-6 pt-4">
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              userButtonAvatarBox:
                'transition duration-300 hover:shadow-lg hover:scale-105 cursor-pointer rounded-full',
            },
          }}
        />
      </div>

      {/* Main Header */}
      <Header />

      {/* Dashboard Content */}
      <main className="p-10">
        <div className="bg-white shadow-md rounded-xl p-6 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Welcome to the AI-INTERVIEW-MOCKER
          </h1>
          <p className="text-slate-600">We are here to provide you the best interview mock test!</p>
        </div>
      </main>
      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        <AddNewInterview/>
      </div>
    </div>
  );
}
