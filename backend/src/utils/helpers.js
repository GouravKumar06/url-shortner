import { nanoid } from "nanoid";

export const generateUuid = (length) => {
  return nanoid(length);
};