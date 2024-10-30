import { Text, View, StyleSheet } from 'react-native'
import { Schema } from '../../amplify/data/resource';
import Welcome from '../UI/Home/Welcome';
import Calendar from '../UI/Home/Calendar';
import NewEntryButton from '../UI/Home/NewEntryBtn';
import RecentEntries from '../UI/Home/RecentEntries';

interface MainProps {
    setDate: React.Dispatch<React.SetStateAction<string>>;
    entryDates: string[];
    setShowView:React.Dispatch<React.SetStateAction<number>>;
    journalEntries: Schema["Journal"]["type"][];
    setEntryToView: React.Dispatch<React.SetStateAction<Schema["Journal"]["type"] | null>>;
}

const Main: React.FC<MainProps> = ({setDate, entryDates, setShowView, journalEntries, setEntryToView}) => {
  return (
<View style={styles.container}>
<Welcome />
<Calendar setDate={setDate} dates={entryDates} />
<NewEntryButton setView={setShowView} />
<RecentEntries journalEntries={journalEntries} setShowView={setShowView} setEntryToView={setEntryToView} />

</View>
)
}

export default Main;



const styles = StyleSheet.create({
container: {
marginHorizontal:20
},

})