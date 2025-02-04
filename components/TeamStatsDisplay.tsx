import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  const formatPercentage = (value: number): string => `${value.toFixed(1)}%`;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-primary font-bold mb-4">
          Match Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
              <StatItem label="Wins" value={teamStats.matchPerformance.wins} />
              <StatItem label="Draws" value={teamStats.matchPerformance.draws} />
              <StatItem label="Losses" value={teamStats.matchPerformance.losses} />
              <StatItem
                label="Goals Scored"
                value={teamStats.matchPerformance.goalsScored}
              />
              <StatItem
                label="Goals Conceded"
                value={teamStats.matchPerformance.goalsConceded}
              />
              <StatItem
                label="Clean Sheets"
                value={teamStats.matchPerformance.cleanSheets}
              />
        </div>

        <div className="border-t border-border pt-6">
          <CardTitle className="text-primary font-bold mb-4">
            Match Statistics
          </CardTitle>
          <div className="space-y-2">
              <StatItem
                label="Possession"
                value={formatPercentage(teamStats.matchStatistics.possession)}
              />
              <StatItem
                label="Shots"
                value={teamStats.matchStatistics.shots}
              />
              <StatItem
                label="Shots on Target"
                value={teamStats.matchStatistics.shotsOnTarget}
              />
              <StatItem
                label="Corners"
                value={teamStats.matchStatistics.corners}
              />
              <StatItem
                label="Free Kicks"
                value={teamStats.matchStatistics.freeKicks}
              />
              <StatItem
                label="Penalties"
                value={teamStats.matchStatistics.penalties}
              />
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <CardTitle className="text-primary font-bold mb-4">
            Disciplinary Records
          </CardTitle>
          <div className="space-y-2">
              <StatItem
                label="Yellow Cards"
                value={teamStats.disciplinaryRecords.yellowCards}
              />
              <StatItem
                label="Red Cards"
                value={teamStats.disciplinaryRecords.redCards}
              />
              <StatItem
                label="Fouls"
                value={teamStats.disciplinaryRecords.fouls}
              />
              <StatItem
                label="Offsides"
                value={teamStats.disciplinaryRecords.offsides}
              />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamStatsDisplay;
