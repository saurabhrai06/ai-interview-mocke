'use client';
import { db } from '@/utils/db';
import { mockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

function InterviewPage() {
  const { interviewId } = useParams(); 
  const [interviewData, setInterviewData] = useState(null);

  useEffect(() => {
    if (!interviewId) return;

    console.log('Interview ID:', interviewId);
    GetInterviewDetails();
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterview)
      .where(eq(mockInterview.mockId, interviewId));
    console.log('Interview Data:', result);
    setInterviewData(result[0]);
  };

  return (
    <div>
     loading interiew detaisl
    </div>
  );
}

export default InterviewPage;
