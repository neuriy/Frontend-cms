import React from 'react';
import { Bot, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
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
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2">Privacy Policy</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">Last updated: April 13, 2026</p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">1. Data Collection</h2>
                            <p className="leading-relaxed text-zinc-700 dark:text-gray-300">
                                When you utilize Neuriy, we securely process your chat queries natively to provide dynamic intelligent responses. For authenticated users, your chat history is securely encrypted and stored within our Firebase database architecture to allow cross-device thread continuity. Anonymous users generate standard ephemeral session tokens.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">2. Tool Installers & External Packages</h2>
                            <p className="leading-relaxed text-zinc-700 dark:text-gray-300">
                                Neuriy allows the injection and installation of localized third-party Next.js and JavaScript applications. By utilizing the "Chat Tool Installer", you acknowledge that these third-party scripts execute within your local browser context. 
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">3. Cloud Processing</h2>
                            <p className="leading-relaxed text-zinc-700 dark:text-gray-300">
                                AI inference requests are relayed to secure, enterprise-grade cloud LLM endpoints. Your conversation logs are completely stripped of personally identifiable metadata before being broadcast to computational nodes.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
