import { Match, Team } from "@/types/api";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { analyzeTeamPerformance } from "@/utils/analysis";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

// components/UpcomingMatches.tsx
interface UpcomingMatchesProps {
  matches: Match[];
  teams: Team[];
}

export function UpcomingMatches({ matches, teams }: UpcomingMatchesProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [analysisRange, setAnalysisRange] = useState("5");
  
  const formatMatchDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
  };

  const getTeamAnalysis = (teamId: number) => {
    const teamMatches = matches.filter(m => 
      m.matchIsFinished && (m.team1.teamId === teamId || m.team2.teamId === teamId)
    ).slice(0, parseInt(analysisRange));
    
    return analyzeTeamPerformance(teamMatches, teamId);
  };
  const upcomingMatches = matches
    .filter((match) => {
      const matchDate = new Date(match.matchDateTime);
      const now = new Date();
      return !match.matchIsFinished && matchDate > now;
    })
    .sort(
      (a, b) =>
        new Date(a.matchDateTime).getTime() -
        new Date(b.matchDateTime).getTime()
    );

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingMatches.map((match) => (
              <div
                key={match.matchID}
                className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleMatchClick(match)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{match.team1.teamName}</span>
                  <span className="text-gray-500">vs</span>
                  <span className="font-medium">{match.team2.teamName}</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {formatMatchDateTime(match.matchDateTime)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={selectedMatch !== null}
        onOpenChange={(open) => !open && setSelectedMatch(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Match Analysis</DialogTitle>
          </DialogHeader>

          {selectedMatch && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {selectedMatch.team1.teamName} vs{" "}
                  {selectedMatch.team2.teamName}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Analysis range:</span>
                  <Select
                    value={analysisRange}
                    onValueChange={setAnalysisRange}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Last 5</SelectItem>
                      <SelectItem value="10">Last 10</SelectItem>
                      <SelectItem value="15">Last 15</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {/* Team 1 Analysis */}
                <div className="space-y-3">
                  <h4 className="font-medium">
                    {selectedMatch.team1.teamName}
                  </h4>
                  {(() => {
                    const stats = getTeamAnalysis(selectedMatch.team1.teamId);
                    return (
                      <div className="space-y-2">
                        <p>Matches: {stats.totalMatches}</p>
                        <p>Win Rate: {stats.winRate.toFixed(1)}%</p>
                        <p>
                          Goals Scored (Avg):{" "}
                          {stats.averageGoalsScored.toFixed(2)}
                        </p>
                        <p>
                          Goals Conceded (Avg):{" "}
                          {stats.averageGoalsConceded.toFixed(2)}
                        </p>
                        <p>Clean Sheets: {stats.cleanSheets}</p>
                        <p>Form: {stats.form.join(" ")}</p>
                      </div>
                    );
                  })()}
                </div>

                {/* Team 2 Analysis */}
                <div className="space-y-3">
                  <h4 className="font-medium">
                    {selectedMatch.team2.teamName}
                  </h4>
                  {(() => {
                    const stats = getTeamAnalysis(selectedMatch.team2.teamId);
                    return (
                      <div className="space-y-2">
                        <p>Matches: {stats.totalMatches}</p>
                        <p>Win Rate: {stats.winRate.toFixed(1)}%</p>
                        <p>
                          Goals Scored (Avg):{" "}
                          {stats.averageGoalsScored.toFixed(2)}
                        </p>
                        <p>
                          Goals Conceded (Avg):{" "}
                          {stats.averageGoalsConceded.toFixed(2)}
                        </p>
                        <p>Clean Sheets: {stats.cleanSheets}</p>
                        <p>Form: {stats.form.join(" ")}</p>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
