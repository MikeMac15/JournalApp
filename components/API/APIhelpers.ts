import { uploadData, getUrl } from '@aws-amplify/storage';
import type { StorageGetUrlOutput } from '@aws-amplify/storage/dist/esm/types';
import type { Schema } from '../../amplify/data/resource';
import { generateClient } from "aws-amplify/data";
import { ItemWithKey, ItemWithPath } from '@aws-amplify/storage/dist/esm/providers/s3/types/outputs';
import { v4 as uuidv4 } from 'uuid';


const client = generateClient<Schema>();

const uriToBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    return response.blob();
}

export async function uploadPicToS3(uri: string): Promise<ItemWithPath | void> {
    try {
        const blob = await uriToBlob(uri);
        const result = await uploadData({
            path: `picture-submissions/${uri}`,
            data: blob,
            options: {
                contentType: 'image/jpeg',
            },
        }).result;
        if (result){
            console.log('Upload succeeded:', result);
            return result;
        }
    } catch (error) {
        console.error('Upload error:', error);
    }
}

export async function bulkUploadPicsToS3(uris: string[]): Promise<ItemWithPath[] | void> {
    try {
        const results = await Promise.all(uris.map(uri => uploadPicToS3(uri)));
        const filteredResults = results.filter((item): item is ItemWithPath => item !== undefined);
        console.log('Bulk upload succeeded:', filteredResults);
        return filteredResults;
    } catch (error) {
        console.error('Bulk upload error:', error);
    }
}


export async function getPicFromS3(filePath: string): Promise<string> {
    try {
        const result: StorageGetUrlOutput = await getUrl({
            path: filePath,
        });
        console.log('URL retrieval succeeded:', result);
        return String(result.url); // Convert the URL to a plain string
    } catch (error) {
        console.error('URL retrieval error:', error);
        return ''; // Return an empty string on error
    }
}


export async function createJournalPostWithPictures({
    date,
    location,
    message,
    summary,
    tags,
    pictures,
}: {
    date: string;
    location: string;
    message: string;
    summary: string;
    tags: string[];
    pictures: string[];
}): Promise<void> {
    try {
        const picturePaths = await bulkUploadPicsToS3(pictures) || [];

        await client.models.Journal.create({
            date,
            location,
            message,
            summary,
            tags,
            pictures: picturePaths.map(item => item?.path || ''),
        });
        console.log('Journal post created successfully');
    } catch (error) {
        console.error('Error creating journal post:', error);
    }
}