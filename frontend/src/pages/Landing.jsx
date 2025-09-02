import { ArrowRight, Heart, Users, MapPin, Clock, Droplets, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const LandingPage = () => {
  const stats = [
    { icon: Users, label: "Lives Saved", value: "10,000+" },
    { icon: Heart, label: "Blood Units", value: "50,000+" },
    { icon: MapPin, label: "Partner Hospitals", value: "150+" },
    { icon: Clock, label: "Response Time", value: "< 30min" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-red-50">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-red-700 to-red-900 text-white">
        <div className="absolute inset-0 opacity-20"></div>
        <div className="container mx-auto px-4 py-20 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm">
              <Heart className="w-4 h-4" />
              Saving Lives Every Day
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Connect{" "}
              <span className="bg-gradient-to-r from-red-200 to-red-300 bg-clip-text text-transparent">
                Blood Donors
              </span>{" "}
              with Those in Need
            </h1>

            <p className="text-lg md:text-xl text-red-100 mb-8 max-w-2xl mx-auto">
              Our advanced blood bank management system ensures efficient
              donation, storage, and distribution of blood products to save lives
              when every second counts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <button className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-xl bg-white text-red-700 hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
              <Link to="#about">
                <button className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-xl border-2 border-white text-white hover:bg-white/10 transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-16" viewBox="0 0 1200 150" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V150H0V90.83C36.67,85.19,76.33,76,112,69.33C160.67,59.67,224.67,47.33,321.39,56.44Z" 
            className="fill-slate-50"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-6 rounded-xl bg-red-50 hover:bg-red-100 transition-all duration-300">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-200 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-red-700" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-red-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-red-700 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Why Choose Our Blood Bank System?
            </h2>
            <p className="text-lg text-slate-600">
              We provide a comprehensive platform that connects donors, hospitals,
              and blood banks to ensure efficient blood collection and
              distribution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border-t-4 border-red-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">Easy Donor Registration</h3>
              <p className="text-slate-600">
                Simple and secure donor registration process with medical history
                tracking and eligibility verification.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">Real-time Inventory Tracking</h3>
              <p className="text-slate-600">
                Monitor blood inventory levels, expiration dates, and distribution
                in real-time across all partner facilities.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border-t-4 border-green-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Zap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">Quick Response</h3>
              <p className="text-slate-600">
                Emergency request system with automated matching and notification
                to ensure rapid response in critical situations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
            <div className="flex-1">
              <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Secure & Compliant</h2>
              <p className="text-slate-600 mb-6">
                Our system meets all healthcare data security standards with end-to-end encryption 
                and strict compliance with medical regulations to protect donor and patient information.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-slate-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  HIPAA compliant data handling
                </li>
                <li className="flex items-center text-slate-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  End-to-end encryption
                </li>
                <li className="flex items-center text-slate-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                  Regular security audits
                </li>
              </ul>
            </div>
            <div className="flex-1 bg-red-50 rounded-2xl p-8 border border-red-100">
              <div className="aspect-video bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center">
                <div className="text-center p-4">
                  <Shield className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-700 font-medium">Secure Blood Bank Management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-700 to-red-900 text-white relative overflow-hidden">
        <div className="absolute inset-0  opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Save Lives?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join our community of donors and healthcare professionals working
            together to ensure blood is available when and where it's needed most.
          </p>
          <Link to="/auth">
            <button className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium rounded-xl bg-white text-red-700 hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl">
              Join Today <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </Link>
        </div>
        
        {/* Wave divider at bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-full h-16" viewBox="0 0 1200 150" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V150H0V90.83C36.67,85.19,76.33,76,112,69.33C160.67,59.67,224.67,47.33,321.39,56.44Z" 
            className="fill-white"></path>
          </svg>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;