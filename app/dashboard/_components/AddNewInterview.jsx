'use client'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false)
  const [jobRole, setJobRole] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [experience, setExperience] = useState('')
  const [questions, setQuestions] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simulate a result (optional)
    const sampleQuestions = [
      "What are the core features of React?",
      "How does the virtual DOM work?",
      "Can you explain useEffect and its dependencies?",
    ]

    setQuestions(sampleQuestions)
    setOpenDialog(false)
  }

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
              <label className="block text-sm font-medium text-gray-300 mb-1">Job Role / Position</label>
              <input
                type="text"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
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
                type="submit"
                className="px-4 py-2 text-sm bg-[#3a77b9] text-white rounded-md hover:bg-[#3165a0]"
              >
                Start Interview
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {questions.length > 0 && (
        <div className="mt-10 bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Generated Interview Questions</h3>
          <ul className="list-disc ml-6 space-y-2 text-gray-200">
            {questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default AddNewInterview
