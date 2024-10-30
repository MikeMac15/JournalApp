import { Text, View, StyleSheet, Button } from 'react-native'
import { Schema } from '../../../amplify/data/resource';
import { deleteJournalEntry } from '../../API/APIhelpers';
import { Color } from 'aws-cdk-lib/aws-cloudwatch';

interface ViewEntryHeaderProps {
    myJournalEntry: Schema["Journal"]["type"];
    setShowView: React.Dispatch<React.SetStateAction<number>>;
}

const ViewEntryHeader: React.FC<ViewEntryHeaderProps> = ({ myJournalEntry, setShowView }) => {

    const deleteThisPost = async () => {
        deleteJournalEntry(myJournalEntry.id);
        setShowView(0);
    }

    return (
        <View style={styles.container}>
            <Button title='Delete Entry' onPress={() => deleteThisPost() } color={'red'}/>
            <Text>{myJournalEntry.date}</Text>
            <Text>{myJournalEntry.summary}</Text>
        </View>
    )
}

export default ViewEntryHeader;



const styles = StyleSheet.create({
    container: {

    },

})