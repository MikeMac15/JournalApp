import { generateClient } from "aws-amplify/api";

import { Schema } from "../../amplify/data/resource";
import { StorageClass } from "aws-cdk-lib/aws-s3-deployment";

const client = generateClient<Schema>();

// Helper function to upload images to S3 and get their URLs
const uploadImageToS3 = async (file: File, fileName: string): Promise<string | null> => {
    try {
        // Upload the file to S3
        const result = await StorageClass.put(fileName, file, {
            contentType: file.type,
        });

        // Get the public URL of the uploaded file
        const url = await Storage.get(result.key);
        return url;
    } catch (error) {
        console.error("Error uploading file to S3:", error);
        return null;
    }
};

// Main function to create a journal entry with photos
export const createJournalEntryWithPhotos = async ({
    entryDate,
    location,
    journalText,
    summaryText,
    tags,
    photoFiles,
}: {
    entryDate: string;
    location?: string;
    journalText: string;
    summaryText: string;
    tags?: string[];
    photoFiles?: File[];
}) => {
    try {
        // Step 1: Upload photos to S3 and gather URLs
        const photoUrls = await Promise.all(
            (photoFiles || []).map(async (file, index) => {
                const fileName = `journal-images/${entryDate}-${index}-${file.name}`;
                return await uploadImageToS3(file, fileName);
            })
        );

        // Filter out any null URLs (in case any uploads failed)
        const validPhotoUrls = photoUrls.filter((url): url is string => url !== null);

        // Step 2: Create the journal entry in DynamoDB with photo URLs
        const { errors, data: newMessage } = await client.models.Journal.create({
            date: entryDate,
            location: location,
            message: journalText,
            summary: summaryText,
            tags: tags,
            pictures: validPhotoUrls, // Store the S3 URLs in the journal entry
        });

        if (errors) {
            console.error("Failed to create journal entry:", errors);
        } else {
            console.log("Journal entry created successfully with images:", newMessage);
        }
    } catch (error) {
        console.error("An error occurred while creating the journal entry with photos:", error);
    }
};

// Function to delete a journal entry
export const deleteJournalEntry = async (entryId: string) => {
    try {
        const { errors, data: deletedMessage } = await client.models.Journal.delete({
            id: entryId,
        });

        if (errors) {
            console.error("Failed to delete journal entry:", errors);
        } else {
            console.log("Journal entry deleted successfully:", deletedMessage);
        }
    } catch (error) {
        console.error("An error occurred while deleting the journal entry:", error);
    }
};
