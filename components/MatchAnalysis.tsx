// components/MatchAnalysis.tsx
'use client'
import { useEffect, useState } from "react";
import { analyzeTeamPerformance, TeamStats } from "../utils/analysis";
import { Match, Team } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select } from "./ui/select";

interface MatchAnalysisProps {
  matches: Match[];
  teams: Team[];
}

export function MatchAnalysis({ matches, teams }: MatchAnalysisProps) {
  const [selectedTeams, setSelectedTeams] = useState<[number?, number?]>([]);
  const [teamStats, setTeamStats] = useState<[TeamStats?, TeamStats?]>([]);

  useEffect(() => {
    if (selectedTeams[0] && selectedTeams[1]) {
      const stats1 = analyzeTeamPerformance(matches, selectedTeams[0]);
      const stats2 = analyzeTeamPerformance(matches, selectedTeams[1]);
      setTeamStats([stats1, stats2]);
    }
  }, [selectedTeams, matches]);

  const renderStatComparison = (
    label: string,
    value1?: number,
    value2?: number
  ) => (
    <div className="grid grid-cols-3 gap-4 py-2">
      <div className="text-right">{value1?.toFixed(2)}</div>
      <div className="text-center text-sm text-gray-500">{label}</div>
      <div className="text-left">{value2?.toFixed(2)}</div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Head-to-Head Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {matches.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No match analysis available for the selected league and season.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
          <Select
            value={selectedTeams[0]?.toString()}
            onValueChange={(v) =>
              setSelectedTeams([parseInt(v), selectedTeams[1]])
            }
          >
            <option value="">Select Team 1</option>
            {teams.map((team) => (
              <option key={team.teamId} value={team.teamId}>
                {team.teamName}
              </option>
            ))}
          </Select>

          <Select
            value={selectedTeams[1]?.toString()}
            onValueChange={(v) =>
              setSelectedTeams([selectedTeams[0], parseInt(v)])
            }
          >
            <option value="">Select Team 2</option>
            {teams.map((team) => (
              <option key={team.teamId} value={team.teamId}>
                {team.teamName}
              </option>
            ))}
          </Select>
        </div>

        {teamStats[0] && teamStats[1] && (
          <div className="space-y-4">
            {renderStatComparison(
              "Win Rate %",
              teamStats[0].winRate,
              teamStats[1].winRate
            )}
            {renderStatComparison(
              "Avg Goals Scored",
              teamStats[0].averageGoalsScored,
              teamStats[1].averageGoalsScored
            )}
            {renderStatComparison(
              "Avg Goals Conceded",
              teamStats[0].averageGoalsConceded,
              teamStats[1].averageGoalsConceded
            )}
            {renderStatComparison(
              "Clean Sheets",
              teamStats[0].cleanSheets,
              teamStats[1].cleanSheets
            )}

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Form</h4>
                <div className="flex gap-1">
                  {teamStats[0].form.map((result, i) => (
                    <span
                      key={i}
                      className={`w-6 h-6 flex items-center justify-center rounded ${
                        result === "W"
                          ? "bg-green-500"
                          : result === "D"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      } text-white text-sm`}
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Recent Form</h4>
                <div className="flex gap-1">
                  {teamStats[1].form.map((result, i) => (
                    <span
                      key={i}
                      className={`w-6 h-6 flex items-center justify-center rounded ${
                        result === "W"
                          ? "bg-green-500"
                          : result === "D"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      } text-white text-sm`}
                    >
                      {result}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
