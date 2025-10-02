import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PlayerOption } from "@/lib/services/injury-prediction";

interface PlayerSelectorProps {
  players: PlayerOption[];
  selectedPlayerId: number | null;
  onPlayerChange: (playerId: string) => void;
  className?: string;
}

export function PlayerSelector({
  players,
  selectedPlayerId,
  onPlayerChange,
  className = ""
}: PlayerSelectorProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor="player-select">Select Player</Label>
      <Select
        value={selectedPlayerId?.toString() || ""}
        onValueChange={onPlayerChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a player" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto">
          {players.map((player) => (
            <SelectItem key={player.player_id} value={player.player_id.toString()}>
              {player.player_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {players.length > 0 && (
        <p className="text-sm text-muted-foreground">
          Showing {players.length} players
        </p>
      )}
    </div>
  );
}
