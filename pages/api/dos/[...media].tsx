import {
  mediaHandlerConfig,
  createMediaHandler,
} from "next-tinacms-dos/dist/handlers";
import { isAuthorized } from "@tinacms/auth";

export const config = mediaHandlerConfig;

export default createMediaHandler({
  config: {
    endpoint: process.env.NEXT_PUBLIC_SPACE_ENDPOINT,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_SPACE_KEY || "",
      secretAccessKey: process.env.SPACE_SECRET_KEY || "",
    },
    region: "us-east-1",
  },
  bucket: process.env.NEXT_PUBLIC_SPACE_NAME || "",
  authorized: async (req, _res) => {
    return true;
    if (process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT === "1") {
      return true;
    }
    try {
      const user = await isAuthorized(req);
      console.log({user})
      return user && user.verified;
    } catch (e) {
      console.error(e);
      return false;
    }
  },
});
