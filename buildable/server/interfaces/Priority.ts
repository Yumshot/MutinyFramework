export interface Priority {
  name: string;
  hex: string;
  ip: string;
  steam: string;
  discord: string;
  priority?: number;
  is_banned?: boolean;
  first_join?: boolean;
  permission_level?: number;
  characters?: [];
  last_character?: number;
  ban_info?: [];
}
