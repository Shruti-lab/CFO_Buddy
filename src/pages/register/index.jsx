import React from 'react';
import BrandHeader from './components/BrandHeader';
import RegistrationForm from './components/RegistrationForm';
import TestimonialCard from './components/TestimonialCard';
import SecurityAssurance from './components/SecurityAssurance';
import LoginPrompt from './components/LoginPrompt';

const Register = () => {
  const testimonials = [
    {
      testimonial: "CFO Buddy transformed how I understand my business finances. No more sleepless nights wondering if I can make payroll!",
      author: "Sarah Chen",
      business: "Chen Marketing Agency",
      rating: 5
    },
    {
      testimonial: "Finally, a financial tool that speaks my language. The cash runway feature alone has saved my business twice.",
      author: "Mike Rodriguez",
      business: "Rodriguez Construction",
      rating: 5
    },
    {
      testimonial: "I went from financial anxiety to financial confidence in just one week. The setup wizard made everything so clear.",
      author: "Lisa Thompson",
      business: "Thompson Consulting",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Registration Form */}
            <div className="max-w-md mx-auto lg:mx-0">
              <BrandHeader />
              
              <div className="bg-card p-8 rounded-xl border border-border card-shadow">
                <RegistrationForm />
                <LoginPrompt />
              </div>
            </div>

            {/* Right Column - Trust Building Content */}
            <div className="space-y-8">
              {/* Security Assurance */}
              <SecurityAssurance />

              {/* Testimonials */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-6">
                  Trusted by Small Business Owners
                </h2>
                <div className="space-y-6">
                  {testimonials?.map((testimonial, index) => (
                    <TestimonialCard
                      key={index}
                      testimonial={testimonial?.testimonial}
                      author={testimonial?.author}
                      business={testimonial?.business}
                      rating={testimonial?.rating}
                    />
                  ))}
                </div>
              </div>

              {/* Additional Trust Signals */}
              <div className="bg-card p-6 rounded-lg border border-border card-shadow">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  Why Choose CFO Buddy?
                </h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>No complex accounting knowledge required</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Plain English financial insights</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>4-step setup wizard gets you started fast</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Visual cash runway tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Automated invoice reminders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date()?.getFullYear()} CFO Buddy. All rights reserved.</p>
            <div className="flex justify-center space-x-6 mt-2">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;