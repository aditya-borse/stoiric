import Layout from "./Layout"
import { Github, Twitter, Instagram } from "lucide-react"

const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors"
  >
    <Icon size={16} />
    <span className="text-sm">{label}</span>
  </a>
);

export default function AboutUs() {
  return (
    <Layout>
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-zinc-800/50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-amber-400 mb-6">About Stoiric</h2>
          <p className="text-zinc-300 mb-4">
            Stoiric is your daily companion that helps you practice Stoic principles
            through daily tasks, reflections, and inspiring quotes.
          </p>
          <a 
            href="https://github.com/aditya-borse/stoiric" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Github size={16} />
            <span className="text-sm">View Project on GitHub</span>
          </a>
        </div>

        <div className="space-y-8 mb-8">
          <div className="bg-zinc-800/50 rounded-lg p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <div className="flex items-center gap-3">
                <span className="text-white">Designed by{' '}
                  <a 
                    href="https://www.instagram.com/shades_of_shivraj/profilecard/?igsh=eWV4cHF4a244eml1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Shivraj
                  </a>
                </span>
              </div>
              <span className="hidden sm:block text-zinc-500">•</span>
              <div className="flex items-center gap-3">
                <span className="text-white">Developed by{' '}
                  <a 
                    href="https://github.com/aditya-borse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Aditya
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
