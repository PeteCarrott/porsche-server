import jwt from "jsonwebtoken";
import User from "../entities/User";

export const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, "iAmSecretToken" || "");
    const { id } = decoded;
    // id, token 두개로 찾아야됨.
    // logout할때 token값을 null로 주기때문.
    const user = await User.findOne({ id, token });
    return user;
  } catch (err) {
    return undefined;
  }
};
