import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from 'lucide-react';

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-purple-200">Contact JobSco</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-purple-300">Get in Touch</h2>
              <form className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    className="w-full bg-gray-700 border-gray-600 focus:border-purple-500 text-white"
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white transition duration-300">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg">
              <CardContent className="p-6 flex items-start space-x-4">
                <Mail className="w-6 h-6 text-purple-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-300">Email Us</h3>
                  <p className="text-gray-300">contact@jobsco.com</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg">
              <CardContent className="p-6 flex items-start space-x-4">
                <Phone className="w-6 h-6 text-purple-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-300">Call Us</h3>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg">
              <CardContent className="p-6 flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-purple-400 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-purple-300">Visit Us</h3>
                  <p className="text-gray-300">123 Job Street, Career City, WK 12345</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;