import jwt from "jsonwebtoken";

export const createJWT = (id: number): string => {
  const token = jwt.sign(
    {
      id,
    },
    "iAmSecretToken" || ""
  );
  return token;
};
