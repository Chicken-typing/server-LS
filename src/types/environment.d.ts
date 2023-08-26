export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MODE_ENV: string;
      PORT: string;
      HOST: string;
      MONGODB_URI: string;
      JWT_SECRET: string;
      PAYPAL_CLIENT_ID: string;
      CLOUDINARY_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRETE: string;
      PGHOST: string;
      PGDATABASE: string;
      PGUSER: string;
      PGPASSWORD: string;
      DATABASE_URL: string;
      ENDPOINT_ID: string;
    }
  }
}
