export type Change = ImageChange | TextChange;

export interface ImageChange {
  name: string;
  src?: string;
}

export interface TextChange {
  name: string;
  text?: string;
  fill?: string;
}

export interface Options {
  webhook_url: string;
}

export type Status = "processing" | "success" | "error";

export interface Rendering {
  id: string;
  type: "image";
  status: Status;
  changes?: Change[];
  options?: Options;
  template_id: string;
  permanent_url: string;
  created_by: string;
  created_at: Date;
}
