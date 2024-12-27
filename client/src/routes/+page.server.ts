
import { serializeNonPOJOs } from "$lib/helpers";
import type { Locals } from "$lib/types";

const load = async ({ locals }: { locals: Locals; }) => {
    const getProjects = async () => {
        if (!locals.pb || !locals.pb.projects) {
            throw new Error('PocketBase is not properly initialized');
        }

        try {
            // Fetch the projects collection
            const projectsCollection = locals.pb.projects;

            // Get the list of projects
            const projects = await projectsCollection.getList(1, 15, {
                sort: '-created'
            });

            // Serialize the data
            const serializedProjects = serializeNonPOJOs(projects);

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
