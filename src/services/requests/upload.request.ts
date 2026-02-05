import api from "../api";

class UploadRequest {
  private prefix = "/upload";

  uploadDoc(files: File[], courseId: string) {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    return api.post(`${this.prefix}/doc?courseId=${courseId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export const uploadRequests = new UploadRequest();
