import React from 'react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
                <p className="text-lg text-slate-600 mb-10">
                    Have questions, feedback, or want to partner with us? We'd love to hear from you! Reach out to us using the information below.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                    <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">
                            @
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</h3>
                            <a href="mailto:support@nowoncampus.com" className="text-lg font-medium text-slate-900 hover:text-blue-600 transition-colors break-all">
                                support@nowoncampus.com
                            </a>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl shrink-0">
                            📍
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Office</h3>
                            <p className="text-lg font-medium text-slate-900">
                                Campus Hub, Block A<br/>
                                University Road
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100/50">
                    <h2 className="text-2xl font-bold text-blue-950 mb-6">Send us a message</h2>
                    <form className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-blue-900 mb-2">Name</label>
                                <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white transition-all shadow-sm" placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-2">Email</label>
                                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white transition-all shadow-sm" placeholder="you@example.com" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-blue-900 mb-2">Message</label>
                            <textarea id="message" rows={5} className="w-full px-4 py-3 rounded-xl border border-blue-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white transition-all shadow-sm resize-none" placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="button" className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-sm hover:bg-blue-700 hover:shadow transition-all active:scale-[0.98] w-full sm:w-auto">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
