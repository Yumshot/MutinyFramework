export interface Priority {
  name: string;
  steam: string;
  discord: string;
  priority?: number;
  is_banned?: boolean;
  first_join?: boolean;
  permission_level?: number;
  characters?: [];
  ban_info?: [];
}
