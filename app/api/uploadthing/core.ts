import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
 
const f = createUploadthing();
 
const auth = (req: Request) => ({ id: "userId" }); 

 

export const ourFileRouter = {

 
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      
      if (!user) throw new UploadThingError("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      return { uploadedBy: metadata.userId };
    }),

    pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
.onUploadComplete(async ({ file }) => {

return { message:'Pdf Upload Complete' };
}),

videoUploader: f({ video: { maxFileSize: "1GB" } })
.onUploadComplete(async ({ file }) => {

return { message:'Video Upload Complete' };
}),
} satisfies FileRouter;


 
export type OurFileRouter = typeof ourFileRouter;