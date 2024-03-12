import { Client } from "minio";

export const minioClient = new Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "RzGICTSX9BVqbacYQFVY",
  secretKey: "RpNrpgHiUCRKnNKrEH73CwNJ01G0NIdRFmJucscj",
});

export class MinioController {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  createBucket = async (bucketName: string) => {
    try {
      const res = await minioClient.bucketExists(bucketName);

      if (res) {
        console.log("Bucket already exists");
        return;
      }

      await minioClient.makeBucket(bucketName, "us-east-1");
      console.log("Bucket created successfully");
    } catch (err) {
      console.log("Failed to create bucket");
    }
  };
}

export const minio = new MinioController(minioClient);
