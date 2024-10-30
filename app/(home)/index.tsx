
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native'
import Welcome from '../../components/UI/Home/Welcome';
import Calendar from '../../components/UI/Home/Calendar';
import RecentEntries from '../../components/UI/Home/RecentEntries';
import NewEntryButton from '../../components/UI/Home/NewEntryBtn';
import NewEntry from '../../components/JournalPages/NewEntry';
import { Schema } from '../../amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import ViewEntry from '../../components/JournalPages/ViewEntry';


const client = generateClient<Schema>()
interface indexProps {
    // myJournal:Schema["Journal"]["type"][]
}

const Home: React.FC<indexProps> = ({ }) => {

    const [showHome,setShowHome] = useState<boolean>(true);
    const [showView,setShowView] = useState<number>(0);
    const [date,setDate] = useState<string>('');


    const [myJournal,setMyJournal] = useState<Schema["Journal"]["type"][]>([]);
    const [entryToView, setEntryToView] = useState<Schema["Journal"]["type"] | null>();

    const fetchJournalEntries = async () => {
      try {
        const data = await client.models.Journal.list();
        console.log(data)
        if (data) {
          setMyJournal(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch journal entries:", error);
      }
    };
    useEffect(() => {
      fetchJournalEntries();
    }, []); 
    
    let entryDates = myJournal.map((data)=>(data.date))
    console.log(entryDates)

    useEffect(()=>{
        if(!showView){
            setShowHome(true);
        }
    },[showView])




    return (
        

        <View style={{margin:20}}>

            {showView == 0
            ?
            <>
            <Welcome />
            <Calendar setDate={setDate} dates={entryDates}/>
            <RecentEntries journalEntries={myJournal} setShowView={setShowView}/>
            <NewEntryButton setView={setShowHome}/>
            </>
            :
            showView == 2
            ?
            <>
                {entryToView ? <ViewEntry myJournalEntry={entryToView} setShowView={setShowView} /> : <Text>No entry selected</Text>}
            </>
            :
                <NewEntry entryDate={date} setShowHome={setShowHome} />
            
        }
        </View>
        
    )
}

export default Home;