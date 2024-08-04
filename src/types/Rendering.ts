export type ImageFormat = "png" | "jpg";

export type BaseChange = {
  name: string;
  fill?: string;
  stroke?: string;
};

export type AnyChange = BaseChange & Record<string, unknown>;

export interface Options {
  format?: ImageFormat;
  webhook_url?: string;
}

export type Status = "processing" | "success" | "error";

export interface Rendering {
  id: string;
  type: "image";
  status: Status;
  changes?: AnyChange[];
  options?: Options;
  template_id: string;
  permanent_url: string;
  created_by: string;
  created_at: Date;
}
