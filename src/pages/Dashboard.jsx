import React from 'react';
import { ArrowRight, BarChart3, Bell, Calendar, CheckCircle, NotebookText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard = () => {

    return (
        <div className="font-sans text-gray-800">
            {/* Navbar */}
            <header className="flex justify-between items-center p-6">
                <h1 className="text-xl font-bold">EMI Manager</h1>
                <nav className="space-x-6 text-sm font-medium">
                    <Link className='bg-black text-white px-6 py-2 rounded-full text-sm' to='/login'>Login</Link>
                    <Link to='/signup' >Sing Up</Link>
                    <Link to='/login' >Contact</Link>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="text-center py-20 pb-30 bg-gray-50">
                <h2 className="text-4xl md:text-5xl font-bold">Simplify your EMI management.</h2>
                <p className="text-xl text-gray-600 mt-2">Track, manage, and stay on top.</p>
                <div className="mt-6 space-x-4">
                    <Link to={'/signup'} className="bg-black text-white px-6 py-2 rounded-full text-sm">Try It Free</Link>
                    <Link className="bg-gray-100 px-6 py-2 rounded-full text-sm">Learn More</Link>
                </div>
            </section>

            {/* Feature Section */}
            <section id="features" className="pb-40 bg-white grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
                {[
                    {
                        link: '/loanlist',
                        icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
                        title: "EMI tracking.",
                        desc: "Monitor all your ongoing loans and EMIs in one dashboard.",
                    },
                    {
                        link: '/paymenthistory',
                        icon: <NotebookText className="w-12 h-12 text-green-600" />,
                        title: "Payments Dashboard.",
                        desc: "View, Make and Manage all your payments in a single place."
                    },
                    {
                        link: '/communications',
                        icon: <Calendar className="w-12 h-12 text-purple-600" />,
                        title: "Communications & Reminders.",
                        desc: "Get timely reminders and updates for your upcoming payments."
                    },
                ].map((feature, idx) => (
                    <Link key={idx} to={feature.link} className="text-center">
                        <div className="w-24 h-24 flex items-center justify-center bg-gray-100 mx-auto mb-4">{feature.icon}</div>
                        <h3 className="text-lg font-semibold">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.desc}</p>                       
                    </Link>                  
                ))}
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-gray-100 to-gray-400 py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-black mb-6">
                        Ready to take control of your EMIs?
                    </h2>
                    <p className="text-xl text-black-100 mb-8">
                        Join thousands of users who never miss a payment.
                    </p>
                    <Link to={'/signup'} className="bg-white text-black-600 px-8 py-4 w-100 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors justify-center  flex items-center gap-2 mx-auto">
                        Get Started Free
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <div className="text-2xl font-bold mb-4">
                                EMI Manager<span className="text-blue-400">®</span>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-gray-300">Navigation</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-gray-300">Resources</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4 text-gray-300">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 EMI Manager. All rights reserved.</p>
                    </div>
                </div>
            </footer>



        </div>
    );
};

