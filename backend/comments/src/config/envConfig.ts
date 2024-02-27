export const envConfig = () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.DB_URL) {
    throw new Error("DB_URL must be defined");
  }
  if (!process.env.KAFKA_HOST) {
    throw new Error("KAFKA_HOST must be defined");
  }
  if (!process.env.KAFKA_USER) {
    throw new Error("KAFKA_USER must be defined");
  }
  if (!process.env.KAFKA_PASS) {
    throw new Error("KAFKA_PASSWORD must be defined");
  }
  if (!process.env.KAFKA_PREFIX) {
    throw new Error("KAFKA_PREFIX must be defined");
  }
};
