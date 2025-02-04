// types/api.ts
export interface League {
  leagueId: number;
  leagueName: string;
  leagueShortcut: string;
  leagueSeason: number;
}

export interface Team {
  teamId: number;
  teamName: string;
  shortName: string;
  teamIconUrl: string;
}

export interface MatchStats {
  corners: number;
  freeKicks: number;
  shotsOnTarget: number;
  shotsOffTarget: number;
  possession: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
  offsides: number;
  saves: number;
  tackles: number;
}

export interface Match {
  matchID: number;
  matchDateTime: string;
  team1: Team;
  team2: Team;
  matchResults: MatchResult[];
  goals: Goal[];
  location?: string;
  numberOfViewers?: number;
  matchIsFinished: boolean;
  statistics?: {
    team1Stats: MatchStats;
    team2Stats: MatchStats;
  };
}

export interface MatchResult {
  resultID: number;
  resultName: string;
  pointsTeam1: number;
  pointsTeam2: number;
  resultOrderID: number;
  resultTypeID: number;
  resultDescription: string;
}

export interface Goal {
  goalID: number;
  scoreTeam1: number;
  scoreTeam2: number;
  matchMinute: number;
  goalGetterName: string;
  isPenalty: boolean;
  isOwnGoal: boolean;
  isOvertime: boolean;
}
