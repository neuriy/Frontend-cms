import React from 'react';
import { Bot, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-gray-100 p-6 md:p-12 selection:bg-purple-500/30">
            <div className="max-w-3xl mx-auto">
                <nav className="mb-12 flex items-center justify-between">
                    <Link href="/" className="flex items-center text-gray-500 hover:text-purple-600 transition-colors">
                        <ArrowLeft className="mr-2" size={20} />
                        <span className="font-medium">Back to app</span>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                            <Bot size={20} className="text-white" />
                        </div>
                        <span className="font-bold tracking-tight">Neuriy</span>
                    </div>
                </nav>

                <div className="prose prose-purple dark:prose-invert max-w-none">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Terms of Service</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">Ready for Production</p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                            <p className="leading-relaxed text-zinc-700 dark:text-gray-300">
                                By accessing or utilizing the Neuriy platform, you agree to comply with and be bound by these unified Terms of Service. If you do not agree to these terms, you may not access our interactive 3D computing platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">2. Usage Limits & Authentication</h2>
                            <p className="leading-relaxed text-zinc-700 dark:text-gray-300">
                                Neuriy utilizes a frictionless "Anonymous Quota" system for unauthenticated visitors. Visitors operate on an strict query ceiling (presently 5 AI prompts). Exceeding this quota mandates the creation of an official account to prevent automated abuse and secure your persistent context history.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">3. Custom Tool Installations</h2>
                            <p className="leading-relaxed text-zinc-700 dark:text-gray-300">
                                The Neuriy Extension Protocol allows the sideloading of React and JavaScript native mini-applications directly into the chat bubble interface (via the Chat Tool Installer). You are strictly prohibited from loading malicious external URLs or intentionally looping UI processes that destabilize the core client frame.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
