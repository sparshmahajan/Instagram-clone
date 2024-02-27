import bcrypt from "bcrypt";

const saltRounds = 10;

const Encrypt = async (Epassword: string) => {
  const hash = await bcrypt.hash(Epassword, saltRounds);
  return hash;
};

const Decrypt = async (Dpassword: string, foundPassword: string) => {
  const result = await bcrypt.compare(Dpassword, foundPassword);
  return result;
};

export { Encrypt, Decrypt };
