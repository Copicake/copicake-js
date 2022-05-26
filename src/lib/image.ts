import unfetch from "isomorphic-unfetch";
import { Rendering, Change, Options } from "../types/Rendering";
import { IMAGE_API_END_POINT, RETRY_TIMEOUT } from "./constant";

// Bug: Failed to execute 'fetch' on 'Window': Illegal invocation
const fetch = unfetch.bind(self);
const MAX_RETRY_TIMES = 10;

interface ICreate {
  template_id: string;
  changes: Change[];
  options?: Options;
}

export interface IImage {
  get(renderingId: string): Promise<Rendering>;
  getUntilFinished(renderingId: string): Promise<Rendering>;
  create(data: ICreate): Promise<Rendering>;
}

class Image implements IImage {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  get(renderingId: string): Promise<Rendering> {
    return fetch(`${IMAGE_API_END_POINT}/get?id=${renderingId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.data;
      });
  }

  getUntilFinished(renderingId: string, retried = 0): Promise<Rendering> {
    if (retried > MAX_RETRY_TIMES) {
      return Promise.reject({
        error: "Internal server error",
        data: null,
      });
    }

    return this.get(renderingId).then((response) => {
      if (response.status === "processing") {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(this.getUntilFinished.call(this, renderingId, retried + 1));
          }, RETRY_TIMEOUT);
        });
      }
      return response;
    });
  }

  create(data: ICreate): Promise<Rendering> {
    return fetch(`${IMAGE_API_END_POINT}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default Image;
