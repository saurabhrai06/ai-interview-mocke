'use client'

import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Header from './_components/Header'


export default function Dashboard() {
  return (
    <div className="text-white p-10">
      <Header />
      <h1 className="text-3xl font-bold mt-4">Welcome to Dashboard</h1>
      <UserButton afterSignOutUrl='/' />
    </div>
  );
}



