import api from "../api";

class GroupChatRequest {
  private prefix = "/v1/groupchat";

  create(data: { name: string; creator: string; members: string[]; course: string }) {
    return api.post(`${this.prefix}/create`, data);
  }

  list(courseId: string) {
    return api.get(`${this.prefix}/list/${courseId}`);
  }

  get(id: string) {
    return api.get(`${this.prefix}/${id}`);
  }

  addMember(data: { groupChatId: string; userId: string }) {
    return api.post(`${this.prefix}/add-member`, data);
  }

  removeMember(data: { groupChatId: string; userId: string }) {
    return api.post(`${this.prefix}/remove-member`, data);
  }

  update(id: string, data: { name?: string; members?: string[] }) {
    return api.put(`${this.prefix}/${id}`, data);
  }

  delete(id: string) {
    return api.delete(`${this.prefix}/${id}`);
  }

  sendMessage(groupChatId: string, message: string) {
    return api.post(`${this.prefix}/${groupChatId}/send-message`, { message });
  }
}

export const groupchatRequests = new GroupChatRequest();
