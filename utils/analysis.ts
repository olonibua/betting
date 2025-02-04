import { Match } from "@/types/api";

// utils/analysis.ts
export interface TeamStats {
  totalMatches: number;
  wins: number;
  draws: number;
  losses: number;
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
  averageGoalsScored: number;
  averageGoalsConceded: number;
  winRate: number;
  form: string[]; // Last 5 matches: W/D/L
  
  // Additional statistics
  corners: number;
  averageCorners: number;
  freeKicks: number;
  averageFreeKicks: number;
  shotsOnTarget: number;
  averageShotsOnTarget: number;
  possession: number;
  averagePossession: number;
  yellowCards: number;
  averageYellowCards: number;
  redCards: number;
  averageRedCards: number;
}

export function analyzeTeamPerformance(
  matches: Match[],
  teamId: number,
  matchLimit?: number
): TeamStats {
  const stats: TeamStats = {
    totalMatches: 0,
    wins: 0,
    draws: 0,
    losses: 0,
    goalsScored: 0,
    goalsConceded: 0,
    cleanSheets: 0,
    averageGoalsScored: 0,
    averageGoalsConceded: 0,
    winRate: 0,
    form: [],
    corners: 0,
    averageCorners: 0,
    freeKicks: 0,
    averageFreeKicks: 0,
    shotsOnTarget: 0,
    averageShotsOnTarget: 0,
    possession: 0,
    averagePossession: 0,
    yellowCards: 0,
    averageYellowCards: 0,
    redCards: 0,
    averageRedCards: 0
  };

  const finishedMatches = matches
    .filter((m) => m.matchIsFinished)
    .sort((a, b) => new Date(b.matchDateTime).getTime() - new Date(a.matchDateTime).getTime())
    .slice(0, matchLimit);
  stats.totalMatches = finishedMatches.length;

  finishedMatches.forEach((match) => {
    const isTeam1 = match.team1.teamId === teamId;
    const finalResult = match.matchResults.find((r) => r.resultTypeID === 2);

    if (!finalResult) return;

    const goalsScored = isTeam1
      ? finalResult.pointsTeam1
      : finalResult.pointsTeam2;
    const goalsConceded = isTeam1
      ? finalResult.pointsTeam2
      : finalResult.pointsTeam1;

    stats.goalsScored += goalsScored;
    stats.goalsConceded += goalsConceded;

    if (goalsConceded === 0) stats.cleanSheets++;

    if (goalsScored > goalsConceded) {
      stats.wins++;
      stats.form.push("W");
    } else if (goalsScored === goalsConceded) {
      stats.draws++;
      stats.form.push("D");
    } else {
      stats.losses++;
      stats.form.push("L");
    }
  });

  // Calculate averages for all metrics
  stats.averageGoalsScored = stats.goalsScored / stats.totalMatches;
  stats.averageGoalsConceded = stats.goalsConceded / stats.totalMatches;
  stats.winRate = (stats.wins / stats.totalMatches) * 100;
  stats.form = stats.form.slice(-5);
  
  // Calculate averages for new metrics
  stats.averageCorners = stats.corners / stats.totalMatches;
  stats.averageFreeKicks = stats.freeKicks / stats.totalMatches;
  stats.averageShotsOnTarget = stats.shotsOnTarget / stats.totalMatches;
  stats.averagePossession = stats.possession / stats.totalMatches;
  stats.averageYellowCards = stats.yellowCards / stats.totalMatches;
  stats.averageRedCards = stats.redCards / stats.totalMatches;

  return stats;
}
