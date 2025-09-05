import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, MessageCircle, TrendingUp, Shield, Zap, Heart } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Connect with Seniors',
      description: 'Get guidance from experienced students and alumni who have been through the same journey.',
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Ask Questions',
      description: 'Post your doubts about placements, academics, or career choices and get expert answers.',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Stay Updated',
      description: 'Follow trending discussions and stay informed about the latest opportunities.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Verified Community',
      description: 'All members are verified students and alumni, ensuring authentic and reliable advice.',
    },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: '4th Year CSE',
      avatar: '👩‍💻',
      text: 'AskSeniors helped me crack my Amazon interview! The guidance from seniors was invaluable.',
    },
    {
      name: 'Rahul Kumar',
      role: 'Alumni, Google',
      avatar: '👨‍💼',
      text: 'Love helping juniors here. The platform makes it easy to share knowledge and give back.',
    },
    {
      name: 'Anita Patel',
      role: '3rd Year ECE',
      avatar: '⚡',
      text: 'Found amazing study groups and placement tips. My CGPA improved from 7.2 to 8.5!',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="text-center animate-fade-in">
            <div className="bg-orange-500 rounded-full w-20 h-20 flex items-center justify-center text-white font-bold text-3xl mx-auto mb-8 shadow-2xl animate-bounce-slow">
              AS
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Connect with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400"> Seniors</span>
              <br />
              Guide the
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400"> Juniors</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The ultimate platform for college students to connect, share knowledge, and grow together. 
              Get placement guidance, academic help, and career advice from verified seniors and alumni.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 group shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <span>Join Community</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="bg-transparent border-2 border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose AskSeniors?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built by students, for students. Experience the power of peer-to-peer learning.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-orange-500 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <div className="py-16 bg-gradient-to-r from-orange-500/10 to-purple-500/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in-up">
              <div className="text-4xl font-bold text-orange-500 mb-2">50K+</div>
              <div className="text-gray-300">Active Students</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-blue-500 mb-2">15K+</div>
              <div className="text-gray-300">Questions Answered</div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-green-500 mb-2">95%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What Students Say</h2>
            <p className="text-xl text-gray-300">Real stories from our community members</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-500/20 to-purple-500/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-4 mb-8">
            <Zap className="w-8 h-8 text-yellow-500 animate-pulse" />
            <Heart className="w-8 h-8 text-red-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Users className="w-8 h-8 text-blue-500 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join the Community?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your journey today. Connect with thousands of students and alumni who are ready to help you succeed.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;