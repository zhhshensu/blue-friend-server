/// <reference types="multer" />
export declare class UploadController {
    uploadFile(file: Express.Multer.File): {
        name: string;
        url: string;
        status: string;
        message: string;
        type: string;
    };
}
