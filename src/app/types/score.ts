export interface DataScore {
  id: string;
  score: Score[];
}

export interface Score {
  value: number;
  nbQuestion: number;
  difficulty: string;
  theme: string;
}
