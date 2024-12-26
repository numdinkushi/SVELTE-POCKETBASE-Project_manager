import { z } from 'zod';
import { zfd } from 'zod-form-data';

const projectSchema = zfd.formData({
    name: z.string().min(1, { message: "Name is required" }).max(10, { message: "Name must be 10 characters or less" }).trim(),
    tagline: z.string().min(1, { message: "Tagline is required" }).max(60, { message: "Tagline must be 60 characters or less" }).trim(),
    url: z.string().url({ message: "URL must be a valid URL" }),
    description: z.string().min(1, { message: "Description is required" }).max(240, { message: "Description must be 240 characters or less" }).trim(),
    // thumbnail: zfd.file().refine((file) => {
    //     // Add custom validation logic here if needed
    //     // For example, check file size, type, etc.
    //     return file.size <= 3 * 1024 * 1024; // Example: file size should be less than 5MB
    // }, {
    //     message: "File size should be less than 3MB"
    // })
}).superRefine((data, ctx) => {
    if (data.name.length < 1) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Name is required",
            path: ["name"]
        });
    }
    if (data.tagline.length < 1) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Tagline is required",
            path: ["tagline"]
        });
    }
    if (data.description.length < 1) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Description is required",
            path: ["description"]
        });
    }
    // if (!data.url.startsWith('http') || !data.url.startsWith('https')) {
    //     ctx.addIssue({
    //         code: z.ZodIssueCode.custom,
    //         message: "URL must start with 'http'",
    //         path: ["url"]
    //     });
    // }
    // if (data.thumbnail && data.thumbnail.size > 5 * 1024 * 1024) {
    //     ctx.addIssue({
    //         code: z.ZodIssueCode.custom,
    //         message: "File size should be less than 5MB",
    //         path: ["thumbnail"]
    //     });
    // }
});

export default projectSchema;
