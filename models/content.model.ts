import { StaticImageData } from "next/image";
import { BaseApiResponse } from "@/models/base.model";

export interface ArticleItem {
  contentId: number;
  pathImg: string;
  altImg: string;
  title: string;
  detail: string;
}
export interface FeatureItem {
  contentId: number;
  pathImg: StaticImageData;
  pathHoverImg: StaticImageData;
  altImg: string;
  title?: string;
  detail?: string;
}

export interface MediaReq {
  imgBase64: string;
}

export interface MediaRes extends BaseApiResponse {
  addedFileLocation: string;
}

export interface LovItem {
  lovId: number;
  nameTh: "";
  nameEn: "";
  description?: "";
}

export interface LovByTypeRes extends BaseApiResponse {
  lovList: Array<LovItem>;
}
