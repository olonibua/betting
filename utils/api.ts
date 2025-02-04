import { League, Match, Team } from "@/types/api";

// utils/api.ts
const API_BASE = "https://api.openligadb.de";

export const api = {
  async getLeagues() {
    const response = await fetch(`${API_BASE}/getavailableleagues`);
    const leagues = await response.json() as League[];
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 7;
    const maxYear = currentYear;
    
    return leagues.filter(league => {
      const season = Number(league.leagueSeason);
      return !isNaN(season) && season >= minYear && season <= maxYear;
    });
  },

  async getTeams(leagueShortcut: string, season: number) {
    const response = await fetch(
      `${API_BASE}/getavailableteams/${leagueShortcut}/${season}`
    );
    return response.json() as Promise<Team[]>;
  },

  async getMatches(leagueShortcut: string, season: number) {
    const response = await fetch(
      `${API_BASE}/getmatchdata/${leagueShortcut}/${season}`
    );
    return response.json() as Promise<Match[]>;
  },

  async getTeamMatches(teamId: number, pastWeeks: number, futureWeeks: number) {
    const response = await fetch(
      `${API_BASE}/getmatchesbyteamid/${teamId}/${pastWeeks}/${futureWeeks}`
    );
    return response.json() as Promise<Match[]>;
  },

  async getHeadToHead(team1Id: number, team2Id: number) {
    const response = await fetch(
      `${API_BASE}/getmatchdata/${team1Id}/${team2Id}`
    );
    return response.json() as Promise<Match[]>;
  },
};
