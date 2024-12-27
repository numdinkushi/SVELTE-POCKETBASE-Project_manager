/* eslint-disable @typescript-eslint/no-explicit-any */
import { serialize } from 'object-to-formdata';
import projectSchema from './create-project-schema';
import { ZodError } from 'zod';
import type { Locals } from '$lib/types';

export const actions = {
    create: async ({ request, locals }:{request: Request, locals: Locals; }) => {
        let formObj;

        try {
            const formData = await request.formData();
            const thumbnail = formData.get('thumbnail');

            // Check if the thumbnail is a File object
            if (thumbnail && !(thumbnail instanceof File)) {
                throw new Error('Thumbnail is not a valid file');
            }

            formObj = projectSchema.parse(formData);
            formObj.user = locals.user && locals.user.id;
            const serializedFormData = serialize(formObj);
            await locals.pb.collection('projects').create(serializedFormData);

            return ({
                status: 200,
                message: 'Project created successfully',
                success: true,
            });

        } catch (err: any) {
            if (err instanceof ZodError) {
                // Map and deduplicate errors
                const errors = Array.from(
                    new Map(
                        err.errors.map((fieldError) => [
                            fieldError.path[0], // Key for deduplication based on the path
                            { path: fieldError.path[0], message: fieldError.message } // Error object
                        ])
                    ).values()
                );

                return {
                    status: 400,
                    body: { message: 'Validation error', errors }
                };
            } else {
                return {
                    status: 500,
                    body: { message: 'Something went wrong during project submission', errors: err.message }
                };
            }
        }
    },
};
