import React from 'react';
import { Text, View, StyleSheet, TextInput, Keyboard } from 'react-native';
import { extraStyles } from '../../../Styles/Styles';

interface SummaryEntryProps {
    setText: React.Dispatch<React.SetStateAction<string>>
}

const SummaryEntry: React.FC<SummaryEntryProps> = ({ setText }) => {
    return (
        <View style={[styles.container, extraStyles.shadow]}>
            <Text style={styles.label}>Write a quick summary of your entry:</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Start typing..."
                placeholderTextColor="#888"
                multiline
                returnKeyType="done" // Displays the "done" button on the keyboard
                onSubmitEditing={() => Keyboard.dismiss()} // Dismisses the keyboard when "done" is pressed
                onChangeText={setText}
                maxLength={200} // optional, limit summary length
            />
        </View>
    );
}

export default SummaryEntry;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#FAF0E6', // light beige for a journal feel
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 0.5,
        borderColor: '#ccc'
    },
    label: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
        marginBottom: 8,
        fontFamily: 'serif', // to mimic a journal font style
    },
    textInput: {
        height: 80,
        borderColor: '#D3C4B4', // soft border color
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#FFF',
        textAlignVertical: 'top', // aligns text at the top for multiline
        fontFamily: 'serif', // use a journal-like font if available
    },
});
