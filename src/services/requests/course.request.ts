import api from "../api";

class CourseRequest {
  private prefix = "/v1/course";

  list() {
    return api.get(`${this.prefix}/list`);
  }

  create(data: { title: string; description?: string }) {
    return api.post(`${this.prefix}/new`, data);
  }

  delete(id: string) {
    return api.delete(`${this.prefix}/delete/${id}`);
  }
}

export const courseRequests = new CourseRequest();
