// Defining the `CharacterValues` interface.
export interface CharacterValues {
  _id: string;
  name: string;
  steam: string;
  discord: string;
  priority: number;
  is_banned: boolean;
  first_join: boolean;
  characters: any[];
  ban_info: any[];
}
