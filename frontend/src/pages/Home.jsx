import React from 'react';
import { MessageSquare, Users, FileText, Bot, Zap, Shield, ArrowRight, CheckCircle, Star } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Real-time Chat',
      description: 'Connect with your team in private or group chats with instant messaging and status updates.',
      gradient: 'from-primary-50 to-primary-100',
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-600'
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Get AI-powered help with coding, writing, debugging, and brainstorming to boost productivity.',
      gradient: 'from-secondary-50 to-secondary-100',
      iconBg: 'bg-secondary-100',
      iconColor: 'text-secondary-600'
    },
    {
      icon: FileText,
      title: 'Collaborative Workspace',
      description: 'Work together on documents in real-time with version control and collaborative features.',
      gradient: 'from-accent-50 to-accent-100',
      iconBg: 'bg-accent-100',
      iconColor: 'text-accent-600'
    },
    {
      icon: Zap,
      title: 'Blazing Fast',
      description: 'Built with modern technologies for optimal speed, performance, and responsiveness.',
      gradient: 'from-indigo-50 to-indigo-100',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with end-to-end encryption to protect your data.',
      gradient: 'from-green-50 to-green-100',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Perfect for teams of all sizes with role-based permissions and access controls.',
      gradient: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Engineering Lead',
      company: 'TechCorp',
      content: 'Collab-Talk has transformed how our remote team collaborates. The AI assistance has been a game-changer.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'StartupHub',
      content: 'The real-time features and collaborative workspace have increased our productivity by 40%.',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      role: 'Team Lead',
      company: 'DesignStudio',
      content: 'Seamless integration with our workflow. The UI is intuitive and user-friendly for everyone.',
      rating: 5
    }
  ];

  return (
    <div className="w-full space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 opacity-50"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Your <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">Team Collaboration</span> Experience
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              The ultimate platform for real-time communication, collaborative work, and AI-powered productivity enhancement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl border-2 border-primary-200 hover:border-primary-300 transition-all shadow-sm hover:shadow-md">
                View Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to collaborate effectively and boost your team's productivity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${feature.gradient} rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`${feature.iconBg} ${feature.iconColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Trusted by Teams Worldwide</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied users who have transformed their workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 sm:p-12 text-center text-white mx-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Boost Your Team's Productivity?</h2>
          <p className="text-primary-100 mb-6 text-lg">
            Join thousands of teams already using Collab-Talk to enhance their collaboration and achieve better results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-all">
              Schedule a Demo
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-primary-200" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-primary-200" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-primary-200" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;