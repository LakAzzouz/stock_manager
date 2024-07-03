export interface MediaGateway {
    upload(file: Buffer, fileName: string, mimeType: string): Promise<string>
}