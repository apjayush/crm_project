import React, { useState } from 'react';
import { MessageCircle, Send, Bot, TrendingUp, Users, Zap, CheckCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send form data to your backend endpoint
      const response = await fetch('http://localhost:8000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/1234567890', '_blank');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">Incoweb</span>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#features" className="text-gray-700 hover:text-green-600 transition">Features</a>
              <a href="#benefits" className="text-gray-700 hover:text-green-600 transition">Benefits</a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 transition">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSignIn}
                className="text-gray-700 hover:text-green-600 transition font-medium"
              >
                Sign In
              </button>
              <button 
                onClick={openWhatsApp}
                className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Get Started</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Automate Your WhatsApp <span className="text-green-600">Marketing</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your customer engagement with intelligent WhatsApp bots. Broadcast messages, automate responses, and grow your business effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={openWhatsApp}
              className="bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition text-lg font-semibold flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Start Free Trial</span>
            </button>
            <a 
              href="#contact"
              className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-full hover:bg-green-50 transition text-lg font-semibold"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to succeed with WhatsApp marketing</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Chatbots</h3>
              <p className="text-gray-600">
                Build intelligent bots that handle customer queries 24/7 with natural conversations and automated responses.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bulk Broadcasting</h3>
              <p className="text-gray-600">
                Send promotional messages, offers, and updates to thousands of customers instantly with high delivery rates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics & Insights</h3>
              <p className="text-gray-600">
                Track message delivery, read rates, and customer engagement with detailed real-time analytics dashboards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Management</h3>
              <p className="text-gray-600">
                Organize and segment your audience for targeted campaigns. Import contacts easily and manage groups efficiently.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-pink-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Automation</h3>
              <p className="text-gray-600">
                Set up automated workflows for order updates, appointment reminders, and customer notifications effortlessly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Official API</h3>
              <p className="text-gray-600">
                Built on WhatsApp Business API for reliable, secure messaging. Get verified green tick for your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600">Simple, effective, and built for growth</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Easy Setup</h3>
                <p className="text-gray-600">Get started in minutes with our simple onboarding process. No technical expertise required.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Cost Effective</h3>
                <p className="text-gray-600">Reach thousands of customers at a fraction of traditional marketing costs.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Higher Engagement</h3>
                <p className="text-gray-600">WhatsApp messages have 98% open rates compared to 20% for emails.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">24/7 Support</h3>
                <p className="text-gray-600">Our team is always ready to help you succeed with dedicated support.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">Have questions? We'd love to hear from you.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">support@whatsbot.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">+1 (234) 567-890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">Available Worldwide</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone *"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none"
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
                {submitted && (
                  <div className="bg-green-50 text-green-700 p-3 rounded-lg text-center">
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {error && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg text-center">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <MessageCircle className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold">Incoweb</span>
            </div>
            <p className="text-gray-400 mb-4">Transform your business with intelligent WhatsApp automation</p>
            <p className="text-gray-500 text-sm">© 2025 Incoweb. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
