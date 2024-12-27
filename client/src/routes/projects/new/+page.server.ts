import { serialize } from 'object-to-formdata';
import projectSchema from './create-project-schema';
import { ZodError } from 'zod';

export const actions = {
    create: async ({ request, locals }) => {
        let formObj;

        try {
            const formData = await request.formData();
            const thumbnail = formData.get('thumbnail');

            // Check if the thumbnail is a File object
            if (thumbnail && !(thumbnail instanceof File)) {
                throw new Error('Thumbnail is not a valid file');
            }

            formObj = projectSchema.parse(formData);
            formObj.user = locals.user.id;
            const serializedFormData = serialize(formObj);
            console.log(34343434, serializedFormData);

            try {
                const record = await locals.pb.collection('projects').create(serializedFormData);
                console.log(4444, record);
                return {
                    status: 200,
                    body: { message: 'Project created successfully', data: record }
                };
            } catch (err) {
                return {
                    status: 500,
                    body: { message: 'Something went wrong during project submission', errors: err.response.data }
                };
            }
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
                console.log(707070707, errors);

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
