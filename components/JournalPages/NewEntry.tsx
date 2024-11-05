
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, ScrollView } from 'react-native'

import { generateClient } from "aws-amplify/data";


import EntryHeader from '../UI/Create/EntryHeader';
import TextInputField from '../UI/Create/TextInput';
import PictureSelector from '../UI/Create/PictureSelector';
import { Schema } from '../../amplify/data/resource';
import SummaryEntry from '../UI/Create/SummaryEntry';
import TagInput from '../UI/Create/TagInput';

import { createJournalPostWithPictures } from '../API/APIhelpers';

const client = generateClient<Schema>();

interface newEntryProps {
    entryDate: string;
    setShowView: React.Dispatch<React.SetStateAction<number>>;
}

const NewEntry: React.FC<newEntryProps> = ({ entryDate, setShowView }) => {

   
    const [tags,setTags] = useState<string[]>([]);
    const [journalMessage, setJournalMessage] = useState('');
    const [summaryText, setSummaryText] = useState('');
    const [location, setLocation] = useState('');

    const [photoUrls,setPhotoUrls] = useState<string[]>([]);
    const [publicPost,setPublicPost] = useState<boolean>(false);
    /////// ? Share to insta/facebook ? //////////


  
    return (
      <ScrollView>
        <EntryHeader date={entryDate} />
        {/* add photos */}
        <TextInputField setText={setJournalMessage} />
        {/* //tags */}
        <SummaryEntry setText={setSummaryText}/>
        <TagInput tags={tags} setTags={setTags}/>
        <PictureSelector setPhotoURLs={setPhotoUrls} photoURLs={photoUrls} />
        <Button onPress={() => createJournalPostWithPictures({date:entryDate,location:location,message:journalMessage,summary:summaryText,tags:tags,pictures:photoUrls})} title="Add new journal entry"/>
        <Button onPress={() => setShowView(0)} title="Discard new entry"/>
        
      </ScrollView>
    );
}

export default NewEntry;



const styles = StyleSheet.create({
    container: {

    },

})