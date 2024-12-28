/* eslint-disable @typescript-eslint/no-explicit-any */
// import {POCKETBASE_HOST} from "$env/static/private"
import { env } from "./evn-config";
import PocketBase from 'pocketbase';
const pb = new PocketBase(env.POCKETBASE_HOST); // Replace with your PocketBase URL
export const serializeNonPOJOs = (obj: any) => {
	return JSON.parse(JSON.stringify(obj));
};


export async function getImageUrl(collection: string, recordId: string, fileName: string) {
	try {
		const response = await pb.collection(collection).getOne(recordId);
		const fileUrl = pb.getFileUrl(response, fileName);
		console.log('Image URL:', fileUrl);
		return fileUrl;
	} catch (error) {
		console.error('Error retrieving image:', error);
		throw error;
	}
}
