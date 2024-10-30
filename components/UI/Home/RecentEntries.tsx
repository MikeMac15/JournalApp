import { MaterialIcons } from '@expo/vector-icons';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { extraStyles, recentsPage, textStyles } from '../../../Styles/Styles';
import { Schema } from '../../../amplify/data/resource';
import { Nullable } from '@aws-amplify/data-schema';
import { router } from 'expo-router';

interface RecentEntriesProps {
    journalEntries: data;
    setShowView: React.Dispatch<React.SetStateAction<number>>;
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

const RecentEntries: React.FC<RecentEntriesProps> = ({ journalEntries, setShowView }) => {
    // Format the date as "MM-DD"
    const formatDate = (date: string) => date.slice(5).replace(/^0/, '');

    // Single Recent Entry Component
    const RecentBox: React.FC<{ entry: data[0] }> = ({ entry }) => (
        <View style={styles.centered}>
            <TouchableOpacity
                style={[recentsPage.box, extraStyles.shadow]}
                onPress={() => {
                    setShowView(2);
                }}
            >
                {entry.pictures && entry.pictures[0] ? (
                    <Image source={{ uri: entry.pictures[0] }} style={extraStyles.image} />
                ) : (
                    <MaterialIcons name="photo" size={30} color="#777" />
                )}
            </TouchableOpacity>
            <Text>{formatDate(entry.date)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={textStyles.h2}>Recent Entries</Text>
            <View style={recentsPage.row}>
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
