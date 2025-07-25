
'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderCircle } from 'lucide-react'

import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { v4 as uuidv4 } from 'uuid';

import { useRouter } from 'next/navigation'
import Router from 'next/router'
import { db } from '@/utils/db'


import { mockInterview } from '@/utils/schema'




function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobPosition, setJobPosition] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [experience, setExperience] = useState('')
  const generatedId = uuidv4();
  const router = useRouter();
  const[loading,setLoading]=useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);
  const {user}=useUser();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    console.log(jobPosition, jobDesc, experience);
  
    const InputPrompt = `
Act like a technical interviewer and generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers for the following role.

Return the result **strictly as valid JSON**, with the following format:

{
  "questions": [
    {
      "question": "...",
      "answer": "..."
    },
    ...
  ]
}

Details:
- Job Position: ${jobPosition}
- Job Description: ${jobDesc}
- Years of Experience: ${experience}

Respond only with the JSON. No markdown, no explanations, no code blocks.
`;

  
    try {
      const result = await chatSession.sendMessage(InputPrompt);
      
      // Wait for the response text
      let rawText = await result.response.text();
  
      // Strip code block formatting if present
      const cleanedText = rawText.replace('```json', '').replace('```', '').trim();
  
      // Try to parse JSON
      let parsedJson;
      try {
        parsedJson = JSON.parse(cleanedText);
      } catch (err) {
        console.error("Failed to parse response JSON:", cleanedText);
        throw new Error("AI response was not valid JSON.");
      }
  
      console.log("Parsed JSON:", parsedJson);
  
      setJsonResponse(parsedJson);
  
      // Insert into DB
      const resp = await db.insert(mockInterview)
      .values({
        mockId: uuidv4(),
        jsonMockResp: JSON.stringify(parsedJson), // ✅ convert object to string
        jobPosition: jobPosition,
        jobDesc: jobDesc,
        jobExperience: experience, // ✅ match schema
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-YYYY'),
      })
        .returning({ mockId: mockInterview.mockId });
  
      console.log("Inserted ID:", resp);
  
      if (resp?.[0]?.mockId) {
        setOpenDialog(false);
        router.push('/dashboard/interview/' + resp[0].mockId);
      }
    } catch (error) {
      console.error("Submit failed:", error);
    }
  
    setLoading(false);
  };
  
  return (
    <div>
      <div
        className="p-10 border border-gray-800 rounded-lg hover:border-[#3a77b9] hover:shadow-lg transition-all duration-200 cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-gray-800 hover:text-[#3a77b9] transition-colors duration-200">
          + Add New
        </h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Describe your Job</DialogTitle>
            <DialogDescription>
              You are about to initiate a mock interview session. Click 'Start Interview' to proceed or 'Cancel' to exit without starting.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Job Position</label>
              <input
                type="text"
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
                required
                placeholder="e.g., Frontend Developer"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3a77b9]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Job Description / Tech Stack</label>
              <input
                type="text"
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                required
                placeholder="e.g., React, Tailwind, Next.js"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3a77b9]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Years of Experience</label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
                min="0"
                placeholder="e.g., 2"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#3a77b9]"
              />
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <button
                type="button"
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 text-sm border rounded-md text-gray-300 border-gray-600 hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit" disabled={loading}
                className="px-4 py-2 text-sm bg-[#3a77b9] text-white rounded-md hover:bg-[#3165a0]"
              >
                {loading?
                <>
                <LoaderCircle className='animate-spin'/> 'Generating From AI'
                </>:'Start Interview'
              }
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {jsonResponse?.questions?.length > 0 && (
  <div className="mt-6 bg-gray-900 p-4 rounded-lg text-white border border-gray-700">
    <h3 className="text-xl font-semibold mb-2">Generated Questions:</h3>
    <ul className="space-y-4">
      {jsonResponse.questions.map((qa, index) => (
        <li key={index}>
          <p><strong>Q{index + 1}:</strong> {qa.question}</p>
          <p><strong>A:</strong> {qa.answer}</p>
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  )
}

export default AddNewInterview


