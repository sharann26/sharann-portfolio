
export interface Experience {
  id: string;
  title: string;
  company: string;
  date: string;
  points: string[];
  icon: string;
  iconBg: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; icon: string }[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  color: string;
}

export interface Stat {
  label: string;
  value: string;
  icon: any;
  color: string;
}

export interface Project {
  title: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  source_code_link: string;
  live_link?: string;
}
