import { request } from "@/lib/request";

type UploadFileResponse = {
  success: boolean;
  filename: string;
  stored_path: string;
  compression_started: boolean;
};

export const uploadSingleFile = async (file: File): Promise<string> => {
  if (!(file instanceof File)) {
    throw new Error("Invalid file provided for upload");
  }

  const formData = new FormData();
  formData.append("file", file);
  // demo
  const res: any = await request.post<UploadFileResponse>(
    `/upload-file/`,
    formData,
  );

  const url = res?.stored_path;
  if (!url) throw new Error("Upload succeeded but URL was not returned");
  return url;
};
