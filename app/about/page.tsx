import React from 'react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-4xl mx-auto bg-white p-12 rounded-2xl shadow-sm border border-slate-100">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b pb-4">About Us</h1>
                <div className="max-w-none">
                    <p className="text-xl text-slate-700 leading-relaxed mb-8">
                        Welcome to <span className="font-semibold text-blue-700">NowOnCampus</span>! We are dedicated to bringing you the best events, hackathons, cultural festivals, and sports competitions happening across campuses. Our mission is to connect students and foster a vibrant college community.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl border border-blue-100">
                            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-3">
                                🎯 Our Mission
                            </h2>
                            <p className="text-blue-800/90 leading-relaxed">
                                To create a centralized platform that bridges the gap between students and life-changing campus events, empowering them to discover, engage, and excel in their academic and extracurricular pursuits.
                            </p>
                        </div>
                        <div className="p-8 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-2xl border border-indigo-100">
                            <h2 className="text-2xl font-bold text-indigo-900 mb-4 flex items-center gap-3">
                                👁️ Our Vision
                            </h2>
                            <p className="text-indigo-800/90 leading-relaxed">
                                Envisioning a connected student ecosystem where every campus activity is easily accessible, driving holistic personal growth, professional development, and lifelong memories.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
