'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

const faqs = [
  {
    question: "What is Jobsco?",
    answer: "Jobsco is a cutting-edge job search platform that connects job seekers with their ideal career opportunities. We use advanced AI technology to match candidates with the most suitable job listings based on their skills, experience, and preferences."
  },
  {
    question: "How do I create an account?",
    answer: "To create an account, click on the 'Sign-in' button in the top right corner of the page. From there, you'll be guided through the registration process. You'll need to provide some basic information and verify your email address to complete the setup."
  },
  {
    question: "Is Jobsco free to use?",
    answer: "Yes, Jobsco offers a free basic account for all users. However, we also offer a premium subscription that provides additional features such as advanced job matching, priority application submissions, and exclusive career resources."
  },
  {
    question: "How does the job matching algorithm work?",
    answer: "Our job matching algorithm uses machine learning to analyze your profile, including your skills, experience, and preferences. It then compares this information with job listings in our database to find the most relevant opportunities for you. The more you use Jobsco, the better our algorithm becomes at finding suitable matches."
  },
  {
    question: "Can employers post job listings on Jobsco?",
    answer: "Yes, employers can create an account and post job listings on Jobsco. We offer various packages to suit different hiring needs, from one-time job postings to ongoing recruitment campaigns. Employers can also use our AI-powered candidate matching to find the best applicants for their positions."
  }
]

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h1>
        
        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 bg-gray-800 text-white border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <AnimatePresence>
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AccordionItem value={`item-${index}`} className="border border-gray-700 rounded-lg overflow-hidden">
                    <AccordionTrigger className="px-4 py-3 bg-gray-800 hover:bg-gray-700 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3 bg-gray-800">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-400"
            >
              No matching FAQs found. Please try a different search term.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}