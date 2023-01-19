import FormData from "form-data";
import nanoid from "../utils/nanoid";
import { UPLOAD_TEMP_IMAGE_API_END_POINT } from "./constant";

type Extension = "png" | "gif" | "jpg" | "jpeg";

export interface IUtils {
  uploadTempImage(file: File | Buffer, extension: Extension): Promise<string>;
}

class Utils implements IUtils {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async uploadTempImage(
    file: File | Buffer,
    extension: Extension
  ): Promise<string> {
    if (!extension.match(/^(png|gif|jpg|jpeg)$/)) {
      return Promise.reject({
        error: "Your file is not supported",
      });
    }

    const filename = `${nanoid(20)}.${extension}`;
    const uploadURL = `${UPLOAD_TEMP_IMAGE_API_END_POINT}?file=${filename}`;

    try {
      const handshake = await fetch(uploadURL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      const handshakeResponse = await handshake.json();
      if (!handshake.ok) {
        return Promise.reject(handshakeResponse);
      }

      const { url, fields } = handshakeResponse;
      const formData = new FormData() as any;

      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const upload = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!upload.ok) {
        return Promise.reject({
          error: "Failed to upload image",
        });
      }

      const imageUrl = `${upload.url}/${fields.key}`;
      return Promise.resolve(imageUrl);
    } catch (error: unknown) {
      return Promise.reject({
        error: (error as Error).message,
      });
    }
  }
}

export default Utils;
