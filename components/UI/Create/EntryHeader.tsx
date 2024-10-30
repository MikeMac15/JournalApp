import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Months } from '../../../helpers/months';
import { extraStyles, secondaryGradient, styles } from '../../../Styles/Styles';
import LinearGradient from 'react-native-linear-gradient';

interface EntryHeaderProps {
  date: string;
}

const EntryHeader: React.FC<EntryHeaderProps> = ({ date }) => {
  const [year, month, day]:string[] = date.split("-");

  return (
    <View style={[styles2.container, extraStyles.shadow]}>
      <Text style={styles2.month}>{Months[month]}</Text>
      <Text style={styles2.day}>{day}</Text>
      <Text style={styles2.year}>{year}</Text>
    </View>
  );
};

export default EntryHeader;

const styles2 = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 5,
    paddingHorizontal: 0,
    backgroundColor: '#FAF0E6', // light beige to match a journal theme
    borderRadius: 10,
    marginHorizontal:10,
    marginBottom: 0,
  },
  month: {
    
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  day: {
    
    fontSize: 40,
    fontWeight: 'bold',
    color: '#2F4F4F', // dark slate color
    marginHorizontal: 8,
  },
  year: {
    
    fontSize: 20,
    color: '#555',
    marginLeft: 8,
  },
});
