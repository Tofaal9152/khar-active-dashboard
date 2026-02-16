import apiClient from "./apiClient";

const httpClient = {
  get: async <T>(url: string) => (await apiClient.get<T>(url)).data,
  post: async <T>(url: string, data: any) =>
    (await apiClient.post<T>(url, data)).data,
  put: async <T>(url: string, data: any) =>
    (await apiClient.put<T>(url, data)).data,
  patch: async <T>(url: string, data: any) =>
    (await apiClient.patch<T>(url, data)).data,
  delete: async <T>(url: string) => (await apiClient.delete<T>(url)).data,
  // Advanced methods
  postFormData: async <T>(url: string, formData: FormData) =>
    (
      await apiClient.post<T>(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data,
  getBlob: async (url: string) =>
    (
      await apiClient.get<Blob>(url, {
        responseType: "blob",
      })
    ).data,
};

export default httpClient;
