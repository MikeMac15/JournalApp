import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
interface TagEntryProps {
    tags:string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>
}
const TagInput: React.FC<TagEntryProps> = ({tags,setTags}) => {
  const [tag, setTag] = useState('');
  

  const addTag = () => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTag(''); // Clear input
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Add Tags:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a tag..."
          value={tag}
          onChangeText={setTag}
          onSubmitEditing={addTag}
        />
        <TouchableOpacity onPress={addTag} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal style={styles.tagContainer}>
        {tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
            <TouchableOpacity onPress={() => removeTag(tag)}>
              <Text style={styles.removeTag}>x</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, alignItems: 'center' },
  label: { fontSize: 18, marginBottom: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderColor: '#ddd', borderWidth: 1, padding: 8, borderRadius: 5, marginRight: 5 },
  addButton: { backgroundColor: '#2196F3', padding: 8, borderRadius: 5 },
  addButtonText: { color: '#fff' },
  tagContainer: { flexDirection: 'row', marginTop: 10 },
  tag: { flexDirection: 'row', backgroundColor: '#eee', padding: 8, borderRadius: 20, marginRight: 5 },
  tagText: { marginRight: 5 },
  removeTag: { color: '#888', fontWeight: 'bold' },
});

export default TagInput;