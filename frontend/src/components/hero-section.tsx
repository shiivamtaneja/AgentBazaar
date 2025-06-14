import React from 'react'

import WalletButton from './wallet-button'

import { Sparkles, Users, Zap } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12 sm:pt-0">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-blue-900/20 to-emerald-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,58,237,0.1),transparent_50%)] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse" />

      <div className="hero-section-dots top-20 left-20 bg-purple-400" style={{ animationDelay: '0s' }} />
      <div className="hero-section-dots top-40 right-32 bg-blue-400" style={{ animationDelay: '1s' }} />
      <div className="hero-section-dots bottom-32 left-16 bg-emerald-400" style={{ animationDelay: '2s' }} />
      <div className="hero-section-dots bottom-32 right-32 bg-orange-400 " style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Badge variant="secondary" className="mb-6 bg-purple-900/20 text-purple-300 border-purple-600/30 hover:bg-purple-800/30 transition-all duration-300">
          <Sparkles className="w-3 h-3 mr-1" />
          Web3 AI Agent Hub
        </Badge>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent mb-6 leading-tight">
          AgentBazaar
        </h1>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-300 mb-6">
          Curate, Vote & Run AI Agents — Together.
        </h2>

        <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          An open Web3 playground where the community decides which AI agents rise to the top.
          Discover, interact with, and govern the future of AI through decentralized collaboration.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Users className="w-5 h-5 mr-2" />
            Explore Agents
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-purple-600/50 text-purple-500 hover:bg-purple-600/10 hover:border-purple-500 hover:text-white px-8 py-6 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <Zap className="w-5 h-5 mr-2" />
            Submit Yours
          </Button>
        </div>

        <WalletButton />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">999+</div>
            <div className="text-gray-400">Active Agents</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">999K+</div>
            <div className="text-gray-400">Community Votes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">999+</div>
            <div className="text-gray-400">Contributors</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection