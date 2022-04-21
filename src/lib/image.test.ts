import Image from "./image";
import { IImage } from "./image";
import fetch from "isomorphic-unfetch";

jest.mock("isomorphic-unfetch");
jest.mock("./constant", () => {
  const originalModule = jest.requireActual("./constant");

  return {
    __esModule: true,
    ...originalModule,
    RETRY_TIMEOUT: 10,
  };
});

const mockFetch = fetch as jest.Mock;

const apiKey = "12345";
describe("Image", () => {
  let image: IImage;

  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      json: () => {
        return {
          data: {},
        };
      },
    });

    image = new Image(apiKey);
  });

  describe("get", () => {
    it("passes correct data", async () => {
      await image.get("abcde");
      expect(mockFetch).toHaveBeenLastCalledWith(
        "https://api.copicake.com/v1/image/get?id=abcde",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
    });
  });

  describe("getUntilFinished", () => {
    it("returns response directly if the status is success", async () => {
      mockFetch.mockResolvedValue({
        json: () => {
          return {
            data: {
              status: "success",
            },
          };
        },
      });

      const result = await image.getUntilFinished("abcde");
      expect(result.status).toEqual("success");
    });

    it("returns response directly if the status is failed", async () => {
      mockFetch.mockResolvedValue({
        json: () => {
          return {
            data: {
              status: "failed",
            },
          };
        },
      });

      const result = await image.getUntilFinished("abcde");
      expect(result.status).toEqual("failed");
    });

    it("returns error if retried more than 10 times", async () => {
      mockFetch.mockResolvedValue({
        json: () => {
          return {
            data: {
              status: "processing",
            },
          };
        },
      });

      try {
        await image.getUntilFinished("abcde");
      } catch (error) {
        expect(error.error).toEqual("Internal server error");
      }
    });
  });

  describe("create", () => {
    it("passes correct data", async () => {
      const data = {
        template_id: "abcde",
        changes: [],
        options: {
          webhook_url: "https://example.com/webhook",
        },
      };
      await image.create(data);
      expect(mockFetch).toHaveBeenLastCalledWith(
        "https://api.copicake.com/v1/image/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify(data),
        }
      );
    });
  });
});
