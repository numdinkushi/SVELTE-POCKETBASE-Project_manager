/* eslint-disable @typescript-eslint/no-explicit-any */
import { serializeNonPOJOs } from "$lib/helpers";
import type { Locals } from "$lib/types";
import { error } from "@sveltejs/kit";
import toast from "svelte-french-toast";

const load = async ({ locals }: { locals: Locals; }) => {
    const getProjects = async () => {
        if (!locals.pb || !locals.pb.projects) {
            throw new Error('PocketBase is not properly initialized');
        }

        try {
            // Fetch the projects collection
            const projectsCollection = locals.pb.projects;

            // Get the list of projects
            const projectsResult = await projectsCollection.getList(1, 15, {
                sort: '-created'
            });

            // Serialize the data
            const serializedProjects = serializeNonPOJOs(projectsResult.items);

            return serializedProjects;
        } catch (error) {
            console.error('Error fetching projects:', error); // Debugging statement
            throw error;
        }
    };

    return {
        projects: await getProjects()
    };
};

export { load };


export const actions = {
    vote: async ({ request, locals }: { request: Request, locals: Locals; }) => {
        const { id } = Object.fromEntries(await request.formData());
        const votesCollection = locals.pb.votes;

        console.log('votesCollection:', votesCollection);
        console.log('User ID:', locals.user?.id);
        console.log('Project ID:', id);

        if (!votesCollection) {
            throw new Error('Votes collection is not properly initialized');
        }

        if (!locals.user?.id || !id) {
            throw error(400, 'User ID or Project ID is missing');
        }

        try {
            const filter = `user = "${locals.user?.id}" && project = "${id}"`;
            console.log('Filter:', filter);

            const existingVoteResult = await votesCollection.getList(1, 15, {
                sort: '-created',
                filter: filter
            });

            console.log('Existing Vote Result:', existingVoteResult);

            const existingVote = existingVoteResult.items;

            if (existingVote.length < 1) {
                await votesCollection.create({
                    user: locals.user?.id,
                    project: id, // Ensure 'project' matches your schema
                });
                console.log('New vote created');
            } else {
                const vote = existingVote[0];
                await votesCollection.delete(vote.id);
                console.log('Vote deleted');
            }
        } catch (err: any) {
            console.log('voters error', err.data?.data || err.message);
            toast.error(err.data?.data || 'Project Successfully created');
        }
    }
};
