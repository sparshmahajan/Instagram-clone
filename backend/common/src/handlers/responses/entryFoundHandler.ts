import { Response } from "express";

export class EntryFoundHandler {
    private res: Response;
    private data: any;
    private message: string;
    private entryFound: boolean;
    private statusCode = 200;
    constructor(
        res: Response,
        message: string,
        data: any,
        entryFound = true,
    ) {
        this.res = res;
        this.entryFound = entryFound;
        this.message = message;
        this.data = data;
        this.send();
    }

    private send() {
        this.res.status(this.statusCode).json({
            entryFound: this.entryFound,
            message: this.message,
            ...this.data,
        });
    }
}