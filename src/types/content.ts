export interface Service {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: string;
  accentColor: "magenta" | "teal";
}

export interface Reference {
  id: string;
  client: string;
  category: string;
  title: string;
  description: string;
  image: string;
  result?: string;
}

export interface MethodeStep {
  step: number;
  title: string;
  description: string;
  details: string[];
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}
