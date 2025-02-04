// pages/index.
'use client'
import { useState, useEffect } from "react";
import { League, Team, Match } from "../types/api";
import { api } from "../utils/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UpcomingMatches } from "@/components/UpcomingMatches";
import { MatchAnalysis } from "@/components/MatchAnalysis";
import TeamStatsDisplay from "@/components/TeamStatsDisplay";

export default function Home() {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<string>("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [noMatchesAvailable, setNoMatchesAvailable] = useState(false);

  useEffect(() => {
    const fetchLeagues = async () => {
      const data = await api.getLeagues();
      setLeagues(data);
      setLoading(false);
    };
    fetchLeagues();
  }, []);

  useEffect(() => {
    if (selectedLeague) {
      const [shortcut, season] = selectedLeague.split("-");
      const fetchData = async () => {
        setLoading(true);
        const [teamsData, matchesData] = await Promise.all([
          api.getTeams(shortcut, parseInt(season)),
          api.getMatches(shortcut, parseInt(season)),
        ]);
        setTeams(teamsData);
        setMatches(matchesData);
        setNoMatchesAvailable(matchesData.length === 0);
        setLoading(false);
      };
      fetchData();
    }
  }, [selectedLeague]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Football Match Analyzer</h1>

      <div className="mb-6 space-y-2">
        <Input
          type="text"
          placeholder="Search leagues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-2"
        />
        <Select
          value={selectedLeague}
          onValueChange={setSelectedLeague}
          disabled={loading}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a League" />
          </SelectTrigger>
          <SelectContent>
            {leagues.filter(league => 
              league.leagueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              league.leagueSeason.toString().includes(searchQuery)
            ).length === 0 ? (
              <SelectItem value="no-results" disabled>
                No leagues found
              </SelectItem>
            ) : (
              leagues
              .filter(league => 
                league.leagueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                league.leagueSeason.toString().includes(searchQuery)
              )
              .map((league) => (
              <SelectItem
                key={`${league.leagueShortcut}-${league.leagueSeason}`}
                value={`${league.leagueShortcut}-${league.leagueSeason}`}
              >
                {league.leagueName} {league.leagueSeason}
              </SelectItem>
            )))}

          </SelectContent>
          
        </Select>
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : noMatchesAvailable ? (
        <div className="text-center text-gray-600 p-4 border rounded">
          No matches available for the selected league and season.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <UpcomingMatches 
              matches={matches} 
              teams={teams}
              leagueShortcut={selectedLeague ? selectedLeague.split('-')[0] : ''}
              leagueSeason={selectedLeague ? parseInt(selectedLeague.split('-')[1]) : 0}
            />
            <MatchAnalysis matches={matches} teams={teams} />
          </div>
          {selectedLeague && teams.length > 0 && (
            <div className="space-y-4">
              {teams.map(team => (
                <TeamStatsDisplay
                  key={team.teamId}
                  teamStats={{
                    matchPerformance: {
                      wins: matches.filter(m => {
                        if (!m.matchIsFinished || !m.matchResults) return false;
                        const finalResult = m.matchResults.find(r => r.resultTypeID === 2);
                        if (!finalResult) return false;
                        return (m.team1.teamId === team.teamId && finalResult.pointsTeam1 > finalResult.pointsTeam2) ||
                               (m.team2.teamId === team.teamId && finalResult.pointsTeam2 > finalResult.pointsTeam1);
                      }).length,
                      draws: matches.filter(m => {
                        if (!m.matchIsFinished || !m.matchResults) return false;
                        const finalResult = m.matchResults.find(r => r.resultTypeID === 2);
                        if (!finalResult) return false;
                        return (m.team1.teamId === team.teamId || m.team2.teamId === team.teamId) &&
                               finalResult.pointsTeam1 === finalResult.pointsTeam2;
                      }).length,
                      losses: matches.filter(m => {
                        if (!m.matchIsFinished || !m.matchResults) return false;
                        const finalResult = m.matchResults.find(r => r.resultTypeID === 2);
                        if (!finalResult) return false;
                        return (m.team1.teamId === team.teamId && finalResult.pointsTeam1 < finalResult.pointsTeam2) ||
                               (m.team2.teamId === team.teamId && finalResult.pointsTeam2 < finalResult.pointsTeam1);
                      }).length,
                      goalsScored: matches.reduce((acc, m) => {
                        if (!m.matchIsFinished || !m.matchResults) return acc;
                        const finalResult = m.matchResults.find(r => r.resultTypeID === 2);
                        if (!finalResult) return acc;
                        return acc + (m.team1.teamId === team.teamId ? finalResult.pointsTeam1 : 
                                    m.team2.teamId === team.teamId ? finalResult.pointsTeam2 : 0);
                      }, 0),
                      goalsConceded: matches.reduce((acc, m) => {
                        if (!m.matchIsFinished || !m.matchResults) return acc;
                        const finalResult = m.matchResults.find(r => r.resultTypeID === 2);
                        if (!finalResult) return acc;
                        return acc + (m.team1.teamId === team.teamId ? finalResult.pointsTeam2 : 
                                    m.team2.teamId === team.teamId ? finalResult.pointsTeam1 : 0);
                      }, 0),
                      cleanSheets: matches.filter(m => {
                        if (!m.matchIsFinished || !m.matchResults) return false;
                        const finalResult = m.matchResults.find(r => r.resultTypeID === 2);
                        if (!finalResult) return false;
                        return (m.team1.teamId === team.teamId && finalResult.pointsTeam2 === 0) ||
                               (m.team2.teamId === team.teamId && finalResult.pointsTeam1 === 0);
                      }).length,
                    },
                    matchStatistics: {
                      possession: 50, // Default values since this data isn't available
                      shots: 0,
                      shotsOnTarget: 0,
                      corners: 0,
                      freeKicks: 0,
                      penalties: 0,
                    },
                    disciplinaryRecords: {
                      yellowCards: 0,
                      redCards: 0,
                      fouls: 0,
                      offsides: 0,
                    },
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
