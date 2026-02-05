import api from "../api";

class QuizRequest {
  private prefix = "/v1/quiz";

  generate(courseId: string, data?: {
    numQuestions?: number;
    quizType?: "quiz" | "exam";
    title?: string;
    groupId?: string;
  }) {
    return api.post(`${this.prefix}/generate/${courseId}`, data || {});
  }

  get(quizId: string) {
    return api.get(`${this.prefix}/${quizId}`);
  }

  submit(quizId: string, answers: { questionIndex: number; selectedOption: number }[]) {
    return api.post(`${this.prefix}/${quizId}/submit`, { answers });
  }

  leaderboard(quizId: string) {
    return api.get(`${this.prefix}/${quizId}/leaderboard`);
  }
}

export const quizRequests = new QuizRequest();
