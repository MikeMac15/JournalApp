import { Text, View, StyleSheet, Button, Image } from 'react-native'
import { generateClient } from "aws-amplify/data";
import { Schema } from '../../amplify/data/resource';
import { useEffect, useState } from 'react';
import { Nullable } from '@aws-amplify/data-schema';
import { string } from '@aws-amplify/data-schema/dist/esm/ModelField';
import { textStyles } from '../../Styles/Styles';
import PictureGallery from '../UI/Read/PictureGallery';
import ViewEntryHeader from '../UI/Read/ViewEntryHeader';

interface viewEntryProps {
  myJournalEntry:Schema["Journal"]["type"]
  setShowView: React.Dispatch<React.SetStateAction<number>>;
}


const ViewEntry: React.FC<viewEntryProps> = ({myJournalEntry, setShowView}) => {
 let pics:string[] = []   
if (myJournalEntry.pictures){
    for (let i = 0; i < myJournalEntry.pictures.length; i++){
            if (myJournalEntry.pictures[i] !== null) {
                console.log(myJournalEntry.pictures[i])
                pics.push(myJournalEntry.pictures[i]!.toString())
            }
    }
}

return (<>
    {myJournalEntry &&
        <View>
            <ViewEntryHeader myJournalEntry={myJournalEntry} setShowView={setShowView} />
            
            <Text style={textStyles.h3}>{myJournalEntry.message}</Text>
            
            <Text>{myJournalEntry.tags}</Text>
            <View>
                {
                    pics && 
                    <PictureGallery pics={pics} />
                }
            </View>
        </View>
        }
        <Button title='Return Home' onPress={()=>setShowView(0)} />
</>
)

}

export default ViewEntry;



const styles = StyleSheet.create({
container: {

},

})