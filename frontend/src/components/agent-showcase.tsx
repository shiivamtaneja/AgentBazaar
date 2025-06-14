import React from 'react'

import AgentCard from './agent-card'

import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from './ui/button'

// TODO: Replace with actual agents
const sampleAgents = [
  {
    name: "DevGPT",
    description: "AI-powered code reviewer and debugging assistant that helps developers write better, more secure code.",
    votes: 1247,
    category: "Development",
    isPopular: true
  },
  {
    name: "DocGenie",
    description: "Intelligent document analyzer that can summarize, extract insights, and answer questions from any document.",
    votes: 892,
    category: "Productivity"
  },
  {
    name: "MarketMind",
    description: "Advanced trading assistant that analyzes market trends and provides investment recommendations.",
    votes: 2156,
    category: "Finance",
    isPopular: true
  },
  {
    name: "DesignBot",
    description: "Creative AI that generates UI/UX designs, color palettes, and provides design feedback.",
    votes: 674,
    category: "Design"
  },
  {
    name: "DataWizard",
    description: "Data analysis expert that transforms raw data into actionable insights and visualizations.",
    votes: 1389,
    category: "Analytics"
  },
  {
    name: "ContentCraft",
    description: "Versatile content creator for social media, blogs, and marketing materials with brand consistency.",
    votes: 758,
    category: "Content"
  }
];

const AgentShowCaseSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-900/20 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-purple-400 mr-2" />
            <span className="text-purple-400 font-semibold">Featured Agents</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Discover Powerful AI Agents
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our curated collection of community-driven AI agents, each designed to solve specific problems and enhance productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sampleAgents.map((agent, index) => (
            <AgentCard key={index} {...agent} />
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            View All Agents
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default AgentShowCaseSection