
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { extraStyles, styles, textStyles } from '../../../Styles/Styles';

interface NewEntryButtonProps {
    setView:React.Dispatch<React.SetStateAction<number>>
}

const NewEntryButton: React.FC<NewEntryButtonProps> = ({ setView }) => {
    return (
        <TouchableOpacity style={[styles.newEntryButton, extraStyles.shadow]} activeOpacity={0.7} onPress={()=> setView(1)}>
            <Entypo name="new-message" size={24} color="black" />
            <Text style={[textStyles.h3,{marginHorizontal:15}]}>Write New Entry</Text>
        </TouchableOpacity>
    )
}

export default NewEntryButton;
