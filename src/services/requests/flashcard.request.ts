import api from "../api";

export interface FlashcardItem {
  front: string;
  back: string;
  tags?: string[];
  easeFactor?: number;
  interval?: number;
}

class FlashcardRequest {
  private prefix = "/flashcards";

  create(data: {
    title?: string;
    creator: string;
    course: string;
    cards: FlashcardItem[];
  }) {
    return api.post(`${this.prefix}/create`, data);
  }

  list(courseId: string) {
    return api.get(`${this.prefix}/list/${courseId}`);
  }

  get(id: string) {
    return api.get(`${this.prefix}/${id}`);
  }

  update(id: string, data: { title?: string; creator: string; course: string; cards: FlashcardItem[] }) {
    return api.put(`${this.prefix}/${id}`, data);
  }

  review(id: string, cardIndex: number, difficulty: "Again" | "Hard" | "Good" | "Easy") {
    return api.post(`${this.prefix}/${id}/review`, { cardIndex, difficulty });
  }

  delete(id: string, cardIndexOrId: string | number) {
    return api.delete(`${this.prefix}/${id}/${cardIndexOrId}`);
  }

  getDue(courseId: string, userId: string) {
    return api.get(`${this.prefix}/due/${courseId}/${userId}`);
  }

  generateFromPdf(courseId: string, topic?: string) {
    return api.post(`${this.prefix}/${courseId}/generate-from-pdf`, { topic });
  }
}

export const flashcardRequests = new FlashcardRequest();
