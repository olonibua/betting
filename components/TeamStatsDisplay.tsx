import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TeamStats {
  matchPerformance: {
    wins: number;
    draws: number;
    losses: number;
    goalsScored: number;
    goalsConceded: number;
    cleanSheets: number;
  };
  matchStatistics: {
    possession: number;
    shots: number;
    shotsOnTarget: number;
    corners: number;
    freeKicks: number;
    penalties: number;
  };
  disciplinaryRecords: {
    yellowCards: number;
    redCards: number;
    fouls: number;
    offsides: number;
  };
}

interface StatItemProps {
  label: string;
  value: number | string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between py-2">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-semibold">
        {value}
      </span>
    </div>
  );
};

interface TeamStatsDisplayProps {
  teamStats: TeamStats;
}

const TeamStatsDisplay: React.FC<TeamStatsDisplayProps> = ({ teamStats }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Match Performance</h3>
          <StatItem label="Wins" value={teamStats.matchPerformance.wins} />
          <StatItem label="Draws" value={teamStats.matchPerformance.draws} />
          <StatItem label="Losses" value={teamStats.matchPerformance.losses} />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Match Statistics</h3>
          <StatItem label="Possession" value={`${teamStats.matchStatistics.possession}%`} />
          <StatItem label="Shots" value={teamStats.matchStatistics.shots} />
          <StatItem label="Shots on Target" value={teamStats.matchStatistics.shotsOnTarget} />
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamStatsDisplay;
