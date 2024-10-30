
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import Welcome from '../../components/UI/Home/Welcome';
import Calendar from '../../components/UI/Home/Calendar';
import RecentEntries from '../../components/UI/Home/RecentEntries';
import NewEntryButton from '../../components/UI/Home/NewEntryBtn';
import NewEntry from '../../components/JournalPages/NewEntry';
import ViewEntry from '../../components/JournalPages/ViewEntry';
import { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import Main from '../../components/JournalPages/Main';

const client = generateClient<Schema>();

const Home: React.FC = () => {
    const [showView, setShowView] = useState<number>(0);
    const [date, setDate] = useState<string>('');
    const [myJournal, setMyJournal] = useState<Schema["Journal"]["type"][]>([]);
    const [entryToView, setEntryToView] = useState<Schema["Journal"]["type"] | null>(null);

    const fetchJournalEntries = async () => {
        try {
            const data = await client.models.Journal.list();
            if (data) setMyJournal(data.data);
        } catch (error) {
            console.error("Failed to fetch journal entries:", error);
        }
    };

    useEffect(() => {
        fetchJournalEntries();
    }, []);
    useEffect(() => {
        fetchJournalEntries();
    }, []);

    const entryDates = myJournal.map((data) => data.date);

    // Define FlatList data structure
    const flatListData = [
        { id: 'main', component: <Main setDate={setDate} entryDates={entryDates} setShowView={setShowView} journalEntries={myJournal} setEntryToView={setEntryToView} /> },

    ];

    return (
      <View style={{height:'100%'}}>
      
        {
          showView === 0 ? (

        <FlatList
            data={flatListData}
            renderItem={({ item }) => item.component}
            keyExtractor={(item) => item.id}
            />
              ) : showView === 2 ? (
                entryToView ? <ViewEntry myJournalEntry={entryToView} setShowView={setShowView} /> : <Text>No entry selected</Text>
              ) : (
                <NewEntry entryDate={date} setShowView={setShowView} />
              )
            }
            </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    centered: {
        flexDirection: 'column',
        alignItems: 'center',
    },
});