export type ActionType = 'time' | 'feed' | 'water' | 'sunlight' | 'none';

export interface GameAction {
  id: ActionType;
  label: string;
  icon: string; // Emoji or image path
}

export interface OrganismStage {
  id: string;
  image: string; // Path to image asset
  requireAction: ActionType; // Action needed to progress FROM this stage TO the next
  name: string; // e.g. "ไข่กบ", "ลูกอ๊อด"
}

export interface SequencingLevelData {
  id: string;
  theme: string; // e.g. "วงจรชีวิตของกบ"
  stages: OrganismStage[];
  availableActions: GameAction[];
}
