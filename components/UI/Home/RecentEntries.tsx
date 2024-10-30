import { MaterialIcons } from '@expo/vector-icons';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { extraStyles, recentsPage, textStyles } from '../../../Styles/Styles';
import { Schema } from '../../../amplify/data/resource';
import { Nullable } from '@aws-amplify/data-schema';
import { router } from 'expo-router';
// import defaultImage from '../../../assets/default.jpg';

interface RecentEntriesProps {
    journalEntries: data;
    setShowView: React.Dispatch<React.SetStateAction<number>>;
    setEntryToView: React.Dispatch<React.SetStateAction<Schema["Journal"]["type"] | null>>;
}
type data = {
    date: string;
    message?: Nullable<string>;
    summary?: Nullable<string>;
    tags?: Nullable<string>[] | null;
    pictures?: Nullable<string>[] | null;
    readonly id: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}[];

const RecentEntries: React.FC<RecentEntriesProps> = ({ journalEntries, setShowView, setEntryToView }) => {
    // Format the date as "MM-DD"
    const formatDate = (date: string) => date.slice(5).replace(/^0/, '');
    // journalEntries.reverse();
    // Single Recent Entry Component
    const RecentBox: React.FC<{ entry: data[0] }> = ({ entry }) => (
            <TouchableOpacity
            style={[ extraStyles.lightshadow2, recentsPage.fullbox]}
                onPress={() => {
                    setEntryToView(entry);
                    setShowView(2);
                }}
            >
        <View style={[]}>
                {entry.pictures && <RecentImage image={entry.pictures[0]} />}
            <Text>{formatDate(entry.date)}</Text>
        </View>
            </TouchableOpacity>
    );


const RecentImage: React.FC<{ image: string|null }> = ({ image }) => (
    image
        ? <Image source={{ uri: image }} style={extraStyles.image} />
        : <Image source={require('../../../assets/1493482.jpg')} style={extraStyles.image} />
);


    return (
        <View style={styles.container}>
            <Text style={textStyles.h2}>Recent Entries</Text>
            {/* <View style={recentsPage.row}> */}
            <View >
                {journalEntries.length ? (
                    journalEntries.map((entry, idx) => <RecentBox key={idx} entry={entry} />)
                ) : (
                    <View style={recentsPage.emptyBox}>
                        <MaterialIcons name="add-circle-outline" size={30} color="#777" />
                    </View>
                )}
            </View>
        </View>
    );
};

export default RecentEntries;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    centered: {
        flexDirection: 'column',
        alignItems: 'center',
    },
});
