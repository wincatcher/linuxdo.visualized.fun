export interface User {
  id: number;
  username: string;
  name?: string;
  title?: string;
  avatar_template: string;
  last_seen_at: string;
  categories?: string[];
}

export interface AboutData {
  about: {
    title: string;
    description: string;
    extended_site_description: string;
    admin_ids: number[];
    moderator_ids: number[];
    stats: Record<string, number>;
    contact_email?: string;
    version?: string;
    site_creation_date?: string;
  };
  users: User[];
}
