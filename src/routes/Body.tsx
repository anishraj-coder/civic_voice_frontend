// src/routes/Body.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function Body() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on mount and window resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(true);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const navItems = [
        {
            name: "Dashboard",
            path: "/",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            name: "Report Issue",
            path: "/form",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
        {
            name: "City Reports",
            path: "/cities",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
        },
    ];

    // Handle navigation for mobile
    const handleNavigation = (path: string) => {
        navigate(path);
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row">
            {/* Mobile Header */}
            <div className="md:hidden bg-[#111] border-b border-[#222] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <span className="text-white font-semibold text-lg">Civic Portal</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-white p-2"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>
            </div>

            {/* Sidebar */}
            <div className={cn(
                "bg-[#111] border-r border-[#222] transition-all duration-300 ease-in-out",
                isMobile ? (
                    isSidebarOpen
                        ? "fixed inset-y-0 left-0 w-64 z-50 translate-x-0"
                        : "fixed inset-y-0 left-0 w-64 z-50 -translate-x-full"
                ) : "w-64 sticky top-0 h-screen"
            )}>
                {/* Desktop Logo */}
                <div className="hidden md:flex items-center gap-3 px-4 py-4 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <span className="text-white font-semibold text-lg">Civic Portal</span>
                </div>

                <nav className="space-y-2 p-4">
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                                "hover:bg-[#222] text-gray-400 hover:text-white",
                                location.pathname === item.path && "bg-[#222] text-white"
                            )}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </button>
                    ))}
                </nav>

                {/* Stats Section */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#161616] rounded-lg border border-[#222]">
                    <div className="text-sm text-gray-400">Quick Stats</div>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        <div className="bg-[#111] p-2 rounded">
                            <div className="text-xs text-gray-500">Total Issues</div>
                            <div className="text-white font-semibold">143</div>
                        </div>
                        <div className="bg-[#111] p-2 rounded">
                            <div className="text-xs text-gray-500">Active Cities</div>
                            <div className="text-white font-semibold">4</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={cn(
                "flex-1 transition-all duration-300",
                isMobile ? "w-full" : "ml-0"
            )}>
                {/* Overlay for mobile when sidebar is open */}
                {isMobile && isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Content */}
                <div className="p-4 md:p-8">
                    {location.pathname === "/" && (
                        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
                            <div className="text-center space-y-6 max-w-2xl px-4">
                                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl mx-auto flex items-center justify-center mb-8">
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>

                                <h1 className="text-3xl md:text-5xl font-bold text-white">
                                    Welcome to Civic Voice
                                </h1>
                                <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
                                    Help improve your city by reporting and tracking civic issues. Together we can make our communities better.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                                    <button
                                        onClick={() => handleNavigation('/form')}
                                        className="group relative px-6 py-4 bg-[#111] rounded-xl border border-[#222] hover:border-purple-500 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                                                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="text-left">
                                                <div className="text-white font-semibold">Report Issue</div>
                                                <div className="text-sm text-gray-400">Submit new problems</div>
                                            </div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => handleNavigation('/cities')}
                                        className="group relative px-6 py-4 bg-[#111] rounded-xl border border-[#222] hover:border-pink-500 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center group-hover:bg-pink-500/20 transition-colors">
                                                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <div className="text-left">
                                                <div className="text-white font-semibold">View Reports</div>
                                                <div className="text-sm text-gray-400">Track city issues</div>
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}