import { sign, verify } from "jsonwebtoken";

//generalised get token function
const getToken = function (data: string | object) {
  const jwtSecretKey: string = process.env.JWT_KEY!;
  const token = sign(data, jwtSecretKey, { expiresIn: "10d" });
  return token;
};

const getForgetToken = function (data: string | object) {
  const jwtSecretKey: string = process.env.JWT_KEY!;
  const token = sign(data, jwtSecretKey, { expiresIn: "10m" });
  return token;
};

const decodeToken = function (token: string) {
  const jwtSecretKey: string = process.env.JWT_KEY!;
  const decodedtoken = verify(token, jwtSecretKey);
  return decodedtoken;
};

export { getToken, decodeToken, getForgetToken };
