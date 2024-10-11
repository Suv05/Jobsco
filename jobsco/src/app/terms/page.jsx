import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

function TermsPage() {
  const termsData = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing or using JobSco, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our service."
    },
    {
      title: "2. Use of Service",
      content: "You may use JobSco for your personal, non-commercial use only. You must not use JobSco for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction."
    },
    {
      title: "3. User Accounts",
      content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password."
    },
    {
      title: "4. Content",
      content: "Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the Service, including its legality, reliability, and appropriateness."
    },
    {
      title: "5. Intellectual Property",
      content: "The Service and its original content, features and functionality are and will remain the exclusive property of JobSco and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-200">Terms and Conditions</h1>
        
        <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg">
          <CardContent className="p-6">
            <p className="mb-6 text-gray-300">
              Welcome to JobSco. These terms and conditions outline the rules and regulations for the use of JobSco&apos;s website and services.
            </p>
            
            <Accordion type="single" collapsible className="space-y-4">
              {termsData.map((term, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-700">
                  <AccordionTrigger className="text-left text-lg font-semibold text-purple-300 hover:text-purple-200">
                    {term.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-300 pt-2">
                    {term.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <p className="mt-6 text-gray-300">
              By using JobSco, you agree to these terms. Please read them carefully. If you do not agree to these terms, please do not use our service.
            </p>
          </CardContent>
        </Card>
        
        <p className="mt-8 text-center text-gray-400 text-sm">
          Last updated: October 11, 2024
        </p>
      </div>
    </div>
  );
}

export default TermsPage;