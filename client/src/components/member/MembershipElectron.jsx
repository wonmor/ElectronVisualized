import React, { useState } from 'react';

export default function MembershipElectron() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('https://electronvisual.org/login');
        setCopied(true);
    };

    return (
        <div className="min-h-screen w-full text-white flex flex-col items-center" style={{ width: "-webkit-fill-available" }}>
            <div className="bg-gray-700 p-10 rounded-lg shadow-lg">
                <h1 className="text-5xl font-thin mb-6 text-center">Upgrade Your Membership</h1>
                <p className="text-xl mb-8 text-center text-gray-400">Follow these instructions to access exclusive membership benefits:</p>
                <ol className="list-decimal list-outside px-8 mb-8 text-lg leading-8">
                    <li className="mb-4">Open the Safari web browser on your device.</li>
                    <li className="mb-4">Visit the following URL:</li>
                    <div className="bg-gray-800 rounded-lg px-6 py-3 mb-4 flex items-center justify-center text-center">
                        <span className="mr-6 text-lg text-blue-200">https://electronvisual.org/login</span>
                        <button
                            onClick={handleCopy}
                            className={`px-6 py-2 border-2 ${copied ? "border-green-200 text-green-200" : "border-blue-200 text-blue-200" } rounded-lg text-lg font-semibold`}
                        >
                            <span>
                            {copied ? 'Copied!' : 'Copy'}
                            </span>
                        </button>
                    </div>
                    <li className="mb-4">Log in or sign up for an account, if you haven't already.</li>
                    <li className="mb-4">Once logged in, navigate to the membership section.</li>
                    <li className="mb-4">Select your desired subscription plan and complete the payment process.</li>
                </ol>
                <p className="text-xl font-thin text-center text-rose-200">Welcome to ElectronVisualized Family.</p>
            </div>
        </div>
    );
}
