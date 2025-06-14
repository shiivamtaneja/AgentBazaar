'use client'

import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import { ArrowUp, Play, Star, Users } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface AgentCardProps {
  name: string;
  description: string;
  votes: number;
  category: string;
}

const AgentCard = ({ name, description, votes, category }: AgentCardProps) => {
  const [userVoted, setUserVoted] = useState(false);
  const [currentVotes, setCurrentVotes] = useState(votes);

  const handleVote = () => {
    if (!userVoted) {
      setCurrentVotes(prev => prev + 1);
      setUserVoted(true);
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 transform hover:scale-105">
      {votes > 1000 &&
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
            <Star className="w-3 h-3 mr-1" />
            Popular
          </Badge>
        </div>
      }

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
              {name}
            </CardTitle>
            <Badge variant="secondary" className="bg-purple-900/30 text-purple-300 border-purple-600/30 mb-3">
              {category}
            </Badge>
          </div>
        </div>

        <CardDescription className="text-gray-400 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVote}
              className={cn(
                "p-2 transition-all duration-200 bg-purple-900/20 ",
                userVoted ?
                  "text-purple-400 bg-purple-900/20 hover:bg-purple-800/30"
                  : "text-gray-400 hover:text-purple-300 hover:bg-purple-900/20"
              )}
              disabled={userVoted}
            >
              <ArrowUp
                className={cn(
                  "w-4 h-4 mr-1",
                  userVoted && 'transform rotate-0'
                )}
              />
              {currentVotes}
            </Button>

            <div className="flex items-center text-gray-500 text-sm">
              <Users className="w-3 h-3 mr-1" />
              {Math.floor(votes / 10)}k runs
            </div>
          </div>

          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 transition-all duration-300 transform hover:scale-105"
          >
            <Play className="w-3 h-3 mr-1" />
            Run Agent
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default AgentCard