"use client";
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowRight, Flame, BookMarked, Quote as QuoteIcon, Github, Play, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

const FeatureCard = ({ icon: Icon, title, description }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-800/50 p-6 rounded-lg border border-zinc-800"
    >
        <Icon className="w-8 h-8 text-amber-400 mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
        <p className="text-zinc-400">{description}</p>
    </motion.div>
);

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-zinc-900 text-white">
            {/* Hero Section */}
            <nav className="flex justify-between items-center p-7">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-bold"
                >
                    STOIRIC
                </motion.h1>
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com/aditya-borse/stoiric"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-amber-400 transition-colors"
                    >
                        <Github className="h-5 w-5" />
                    </a>
                    {/* <Button
                        variant="outline"
                        onClick={() => navigate('/app')}
                        className="border-zinc-700 text-zinc-400 hover:text-amber-400 hover:border-amber-400/50 transition-colors"
                    >
                        Enter App
                    </Button> */}
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-7 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                    Live a Stoic Life,<br />Every Day
                    </h2>
                    <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
                        Stoiric is your daily companion that helps you practice Stoic principles
                        through daily tasks, reflections, and inspiring quotes.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            onClick={() => navigate('/app')}
                            className="bg-amber-400 hover:bg-amber-500 text-black font-medium px-8 py-6 w-full sm:w-auto"
                        >
                            Begin Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => window.open('YOUR_VIDEO_DEMO_URL', '_blank')}
                            className="border-zinc-700 bg-zinc-800 text-zinc-300 px-8 py-6 w-full sm:w-auto"
                        >
                            Watch Demo <Play className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <FeatureCard
                        icon={Flame}
                        title="Set Daily Goals"
                        description="Get work done by setting daily goals and tracking your progress."
                    />
                    <FeatureCard
                        icon={BookMarked}
                        title="Reflection Journal"
                        description="Document your thoughts, feelings, and experiences in a private journal."
                    />
                    <FeatureCard
                        icon={QuoteIcon}
                        title="Ancient Wisdom"
                        description="Draw inspiration from timeless Stoic quotes and teachings everyday."
                    />
                </div>

                {/* Open Source Section
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-zinc-800/30 border border-zinc-800/50 rounded-lg p-8 mb-16 text-center"
                >
                    <h3 className="text-xl font-medium text-amber-400 mb-4">Open Source Project</h3>
                    <p className="text-zinc-300 mb-6">
                        Stoiric is completely open source. Feel free to contribute, suggest improvements,
                        or use it as inspiration for your own projects.
                    </p>
                    <Button
                        variant="outline"
                        onClick={() => window.open('https://github.com/aditya-borse/stoiric', '_blank')}
                        className="border-zinc-700 hover:border-zinc-600"
                    >
                        <Github className="mr-2 h-4 w-4" />
                        View on GitHub
                    </Button>
                </motion.div> */}

                {/* Privacy Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden bg-gradient-to-br from-zinc-800/30 to-zinc-900/50 border border-zinc-800/50 rounded-lg p-8 mb-16"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-12">
                        <div className="flex-shrink-0 bg-gradient-to-br from-amber-400/20 to-amber-400/10 rounded-2xl p-4 backdrop-blur-sm">
                            <Lock className="w-10 h-10 text-amber-400" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-medium text-amber-400 mb-3">Your Data Stays With You</h3>
                            <p className="text-zinc-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
                                All your personal data - including journal entries, 
                                tasks, and progress tracking - are stored locally on your device. 
                                No cloud storage, no data collection, just pure privacy-focused journaling.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Quote Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center max-w-1xl mx-auto py-16 px-4"
                >
                    <blockquote className="text-2xl font-medium text-amber-50 mb-4">
                        "Waste no more time arguing about what a good man should be. Be one."
                    </blockquote>
                    <cite className="text-zinc-400">― Marcus Aurelius</cite>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="border-t border-zinc-800 py-8 px-7">
                <div className="max-w-6xl mx-auto text-center text-zinc-500 text-sm flex items-center justify-center gap-3">
                    <span className="text-white">Designed by{' '}
                        <a href="https://www.instagram.com/shades_of_shivraj/profilecard/?igsh=eWV4cHF4a244eml1" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="text-amber-400 hover:text-amber-300 transition-colors">
                            Shivraj
                        </a>
                    </span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-white">Developed by{' '}
                        <a href="https://github.com/aditya-borse" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="text-amber-400 hover:text-amber-300 transition-colors">
                            Aditya
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    );
}