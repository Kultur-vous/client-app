export interface QuestionResponse {
  title: string;
  emote: string;
  goodAnswer: boolean;
}

export interface Question {
  tilte: string;
  response: QuestionResponse[];
  category: string;
  level: string;
}
