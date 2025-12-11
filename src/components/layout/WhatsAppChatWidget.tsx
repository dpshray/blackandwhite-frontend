"use client";

import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { Button } from "../ui/button";

const WhatsAppChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hovering, setHovering] = useState(false);

    const toggleChat = () => {
        setIsOpen((prev) => !prev);
        setHovering(false);
    };

    const handleWhatsAppClick = () => {
        const phone = process.env.NEXT_PUBLIC_WHATSAPP_CHATBOT;
        window.open(phone, "_blank");
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">

            {/* Tooltip */}
            {!isOpen && hovering && (
                <div className="absolute bottom-12 right-0 px-4 py-2 bg-white text-gray-800 shadow-lg rounded-full border text-sm w-36 sm:w-44 text-center animate-fade-in">
                    Chat with us now! 👋
                </div>
            )}

            {/* Chat Box */}
            {isOpen && (
                <div className="w-full max-w-xs bg-white shadow-xl rounded-xl overflow-hidden mb-4 animate-slide-in-up">
                    {/* Header */}
                    <div className="bg-green-600 text-white p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <FaWhatsapp className="w-6 h-6" />
                            <div>
                                <p className="font-semibold text-sm sm:text-base">Hi there!</p>
                                <p className="text-xs sm:text-sm">Chat with our Bot or Support Team</p>
                            </div>
                        </div>
                        <Button onClick={toggleChat} aria-label="Close Chat" variant="ghost">
                            <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                    </div>

                    {/* Body */}
                    <div className="p-4">
                        <div
                            onClick={handleWhatsAppClick}
                            className="flex items-center gap-4 p-3 border border-gray-200 hover:bg-gray-100 rounded-lg cursor-pointer transition"
                        >
                            <div className="relative">
                                <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                    B&W
                                </div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                                    <FaWhatsapp className="w-3 h-3 text-green-600" />
                                </div>
                            </div>

                            <div className="flex-1">
                                <p className="font-medium text-gray-800 text-sm sm:text-base">Support Team</p>
                                <p className="text-xs text-gray-500">Typically replies in a few minutes</p>
                            </div>

                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                Online
                            </span>
                        </div>
                    </div>

                    <div className="text-center text-xs text-gray-500 pb-4">
                        Powered by WhatsApp Business
                    </div>
                </div>
            )}

            {/* Floating Chat Button */}
            <Button
                onClick={toggleChat}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 sm:px-5 sm:py-4 rounded-full shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
                aria-label="Chat on WhatsApp"
            >
                <FaWhatsapp className="w-5 h-5 sm:w-6 sm:h-6" />
                {!isOpen && <span className="text-sm sm:text-base font-medium">Chat Now</span>}
            </Button>
        </div>
    );
};

export default WhatsAppChatWidget;
