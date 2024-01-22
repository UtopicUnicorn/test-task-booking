export interface ApiImagesInterface {
  id: number;
  url: string;
  title: string;
  text: string | null;
  mobile: string;
  mobileApp: string | null;
  desktop: string;
  video: null | string;
  metadata: string | null;
}
