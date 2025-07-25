'use client';

import { db } from '@/utils/db';
import { mockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function InterviewPage() {
  const { interviewId } = useParams(); 
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!interviewId) return;

    console.log('Interview ID:', interviewId);
    GetInterviewDetails();
  }, [interviewId]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(mockInterview)
      .where(eq(mockInterview.mockId, interviewId));
    
    console.log('Interview Data:', result);
    setInterviewData(result[0]);
    setLoading(false);
  };

  return (
    <div className='my-10 '>
      <h2 className='font-bold text-3xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 '>

      
      {loading ? (
        <p className="mt-5 text-muted-foreground">Loading interview details...</p>
      ) : interviewData ? (
        <div className='flex flex-col my-5 text-center gap-5'>
          <div className='flex flex-col p-5 rounded-lg border gap-5'>
          <h2 className='text-lg'>
            Job Position: <strong>{interviewData.jobPosition}</strong>
          </h2>
          <h2 className='text-lg'>
            Job Description: <strong>{interviewData.jobDesc}</strong>
          </h2>
          <h2 className='text-lg'>
            Years Of Experience: <strong>{interviewData.jobExperience
            }</strong>
          </h2>
          </div>
          <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
            <h2 className='flex gap-2 items-center text-yellow-600'><Lightbulb/><strong>Information</strong></h2>
            <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>

          </div>
        </div>
      ) : (
        <p className="mt-5 text-red-500">Interview data not found.</p>
      )}
      <div>
        {webCamEnabled ? (
          <Webcam
            mirrored={true}
            onUserMedia={() => setWebCamEnabled(true)}
            onUserMediaError={() => setWebCamEnabled(false)}
            style={{ height: 300, width: 300 }}
          />
        ) : (
          <>
            <WebcamIcon className='h-72 w-full bg-secondary rounded-lg border' />
            <Button  variant='ghost' className="w-full"  onClick={() => setWebCamEnabled(true)}>
              Enable Web Cam & Microphone
            </Button>
          </>
        )}
      </div>
      
      </div>
      <div className='flex justify-end items-end'>
      <Link href={'/dashboard/interview/interviewId/start'}>
      <Button >
              Start Interview
            </Button>
            </Link>
      </div>

    </div>
  );
}

export default InterviewPage;
