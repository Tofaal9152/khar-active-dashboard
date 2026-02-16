import httpClient from "@/utils/httpClient";

export const uploadSingleFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await httpClient.postFormData<any>("/upload-file/", formData);
  const url = res?.stored_path;

  if (!url) throw new Error("Upload succeeded but URL was not returned");
  return url;
};
