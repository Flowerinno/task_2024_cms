import { Client } from "minio";

export const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: 9000,
  useSSL: false,
  accessKey: process.env.MINIO_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

export class MinioController {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }

  createBucket = async (bucketName: string = "default") => {
    try {
      const res = await minioClient.bucketExists(bucketName);

      if (res) {
        console.log("Bucket already exists");
        return;
      }

      await minioClient.makeBucket(bucketName);
      console.log("Bucket created successfully");
    } catch (err) {
      console.log(err, "Failed to create bucket");
    }
  };

  getObject = async (bucketName: string, objectName: string) => {
    try {
      const promise: Promise<string | undefined> = new Promise(
        (resolve, reject) => {
          let buffers: Buffer[] = [];
          minioClient.getObject(bucketName, objectName).then(async (stream) => {
            stream.on("data", (chunk: Buffer) => {
              buffers.push(chunk);
            });

            stream.on("end", () => {
              const buffer = Buffer.concat(buffers);
              const base64String = buffer.toString("base64");

              const dataURL = `data:image/png;base64,${base64String}`;

              resolve(dataURL);
            });

            stream.on("error", (err) => {
              reject({ message: "Failed to get object", error: err });
            });
          });
        },
      );

      return promise;
    } catch (err) {
      console.log(err, "Failed to get object");
    }
  };
}

export const minio = new MinioController(minioClient);
