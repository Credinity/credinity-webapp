import { MediaRes } from "@/models/content.model";
import axiosLocal from "@/utils/axiosLocalUtil";

export const uploadKycIdentificationImage = async (
  req: FormData
): Promise<MediaRes> => {
  const { data: response } = await axiosLocal.post<MediaRes>(
    "/media/uploadKycIdentificationImage",
    req
  );

  return response;
};
