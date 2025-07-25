'use client'
import { db } from '@/utils/db';
import { mockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'

function StartInterview(interviewId) {
    const[interviewData,setInterviewData]=useState();
    const[mockInterviewQuestion,setMockInterviewQuestion]=useState();
    useEffect(()=>{
        GetInterviewDetails
    },[]);
     const GetInterviewDetails = async () => {
        setLoading(true);
        const result = await db
          .select()
          .from(mockInterview)
          .where(eq(mockInterview.mockId, interviewId));
        
        console.log('Interview Data:', result);
        setInterviewData(result[0]);
        const jsonMockResp=JSON.parse(result[0].jsonMockResp)
        console.log(jsonMockResp)
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
        
      };
  return (
    <div>boht aage aagye bhai</div>
  )
}

export default StartInterview