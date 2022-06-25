import { StaticImageData } from "next/image";

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
