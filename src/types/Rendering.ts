export interface Change {
  name: string;
  text?: string;
  color?: string;
  src?: string;
}

export interface Options {
  webhook_url: string;
}

export interface Rendering {
  id: string;
  type: "image";
  status: "success" | "processing" | "failed";
  changes?: Change[];
  options?: Options;
  template_id: string;
  permanent_url: string;
  created_by: string;
  created_at: Date;
}
