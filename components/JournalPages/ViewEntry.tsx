import { Text, View, StyleSheet, Button } from 'react-native'
import { generateClient } from "aws-amplify/data";
import { Schema } from '../../amplify/data/resource';
import { useEffect, useState } from 'react';
import { Nullable } from '@aws-amplify/data-schema';

interface viewEntryProps {
  myJournalEntry:Schema["Journal"]["type"]
  setShowView: React.Dispatch<React.SetStateAction<boolean>>;
}


const ViewEntry: React.FC<viewEntryProps> = ({myJournalEntry, setShowView}) => {
    
return (<>
    {myJournalEntry &&
        <View>
            <Text>{myJournalEntry.date}</Text>
            <Text>{myJournalEntry.message}</Text>
            <Text>{myJournalEntry.summary}</Text>
            <Text>{myJournalEntry.tags}</Text>
        </View>
        }
        <Button title='Return Home' onPress={()=>setShowView(false)} />
</>
)

}

export default ViewEntry;



const styles = StyleSheet.create({
container: {

},

})