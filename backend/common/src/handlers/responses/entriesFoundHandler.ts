import { Response } from "express";

export class EntriesFoundHandler {
  private res: Response;
  private data: any;
  private message: string;
  private entriesFound: number;
  private statusCode = 200;

  constructor(res: Response, message: string, data: any) {
    this.res = res;
    this.entriesFound = data.length;
    this.message = message;
    this.data = data;
    this.send();
  }

  private send() {
    this.res.status(this.statusCode).json({
      entriesFound: typeof this.data === "object" ? this.entriesFound : 1,
      message: this.message,
      data: this.data,
    });
  }
}
