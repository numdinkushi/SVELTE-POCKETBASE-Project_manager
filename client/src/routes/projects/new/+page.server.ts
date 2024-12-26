/* eslint-disable @typescript-eslint/no-explicit-any */
import projectSchema from "./create-project-schema";
import { serialize } from "object-to-formdata";
import { error, fail, redirect } from "@sveltejs/kit";

export const actions = {
    create: async ({ request, locals }) => {
        
        let formObj;
        
        try {
            formObj = projectSchema.parse(await request.formData());
            formObj.user = locals.user.id;
            const formData = serialize(formObj);
            console.log(34343434, formData);

            try {
                const record = await locals.pb.collection('projects').create(formData);
                console.log(4444, record);
            } catch (err) {
                console.log(2222, err.response.data);
                throw error(500, 'Something went wrong during project submission');
            }
        } catch (err: any) {
            console.log(707070707, err )
            if (err?.status === 500) {
                throw error(500, 'Something went wrong during project submission');
            }

            const { fieldErrors: errors } = err.flatten();

            return fail(400, {
                data: formObj,
                errors
            });

        }

        throw redirect(303, '/');
    },
};