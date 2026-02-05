import api from "../api";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

class ChatRequest {
  private prefix = "/v1/chat";

  list(courseId: string) {
    return api.get(`${this.prefix}/list/${courseId}`);
  }

  create(data: { course: string; title?: string }) {
    return api.post(`${this.prefix}/new`, data);
  }

  delete(id: string) {
    return api.delete(`${this.prefix}/delete/${id}`);
  }

  send(messages: ChatMessage[], courseId?: string) {
    return api.post(`${this.prefix}/send`, { messages, courseId });
  }

  sendStream(messages: ChatMessage[], courseId?: string) {
    return api.post(`${this.prefix}/send-stream`, { messages, courseId }, {
      responseType: "stream",
    });
  }

  getWithCourse(chatId: string) {
    return api.get(`${this.prefix}/with-course/${chatId}`);
  }
}

export const chatRequests = new ChatRequest();
