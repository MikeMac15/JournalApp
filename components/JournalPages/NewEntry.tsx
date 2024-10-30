
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, ScrollView } from 'react-native'

import { generateClient } from "aws-amplify/data";


import EntryHeader from '../UI/Create/EntryHeader';
import TextInputField from '../UI/Create/TextInput';
import PictureSelector from '../UI/Create/PictureSelector';
import { Schema } from '../../amplify/data/resource';
import SummaryEntry from '../UI/Create/SummaryEntry';
import TagInput from '../UI/Create/TagInput';

const client = generateClient<Schema>();

interface newEntryProps {
    entryDate: string;
    setShowView: React.Dispatch<React.SetStateAction<number>>;
}

const NewEntry: React.FC<newEntryProps> = ({ entryDate, setShowView }) => {

   
    const [tags,setTags] = useState<string[]>([]);
    const [journalText, setJournalText] = useState('');
    const [summaryText, setSummaryText] = useState('');


    const [photoUrls,setPhotoUrls] = useState<string[]>([]);
    const [publicPost,setPublicPost] = useState<boolean>(false);
    /////// ? Share to insta/facebook ? //////////

    const createJournalEntry = async () => {
    try {
      // Check if there are any pictures to upload
      // if (photoUrls.length > 0) {
      //   // Iterate through the pictures and upload them to S3
      //   const uploadedPhotoUrls = await Promise.all(
      //     photoUrls.map(async (photoUri) => {
      //       // Upload each photo URI to S3
      //       const uploadedUrl = await Storage.put(`images/${Date.now()}-${photoUri.split('/').pop()}`, {
      //         uri: photoUri,
      //         // Specify any S3 upload options here if necessary
      //       });
      //       return uploadedUrl; // Add the S3 URL to the array
      //     })
      //   );
  
      //   // Update the photoUrls with the S3 URLs
      //   photoUrls = uploadedPhotoUrls.map((photo) => photo.key);
      // }
  
      // Proceed to create the journal entry with the S3 URLs
      const { errors, data: newMessage } = await client.models.Journal.create({
        date: entryDate,
        message: journalText,
        summary: summaryText,
        tags: tags,
        pictures: photoUrls, // Now contains the S3 URLs
      });
  
      if (errors) {
        console.error("Errors occurred:", errors);
      } else {
        console.log("Journal entry created successfully:", newMessage);
        setShowView(2);
      }
    } catch (errors) {
      console.error("Error creating journal entry:", errors);
    }
  };
  
    return (
      <ScrollView>
        <EntryHeader date={entryDate} />
        {/* add photos */}
        <TextInputField setText={setJournalText} />
        {/* //tags */}
        <SummaryEntry setText={setSummaryText}/>
        <TagInput tags={tags} setTags={setTags}/>
        <PictureSelector setPhotoURLs={setPhotoUrls} photoURLs={photoUrls} />
        <Button onPress={createJournalEntry} title="Add new journal entry"/>
        <Button onPress={() => setShowView(0)} title="Discard new entry"/>
        
      </ScrollView>
    );
}

export default NewEntry;



const styles = StyleSheet.create({
    container: {

    },

})