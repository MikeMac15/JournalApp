import React, { useEffect, useState } from "react";
import { Button, View, SafeAreaView, ActivityIndicator } from "react-native";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import outputs from "../amplify_outputs.json";
import LinearGradient from 'react-native-linear-gradient';
import Home from "./(home)";
import { generateClient } from "aws-amplify/data";
import { Nullable } from "@aws-amplify/data-schema";
import { styles } from "../Styles/Styles";
import { Schema } from "../amplify/data/resource";
import { parseAmplifyConfig } from "aws-amplify/utils";

Amplify.configure(parseAmplifyConfig(outputs));
const client = generateClient<Schema>({ authMode: 'userPool' });

const SignOutButton = () => {
  const { signOut } = useAuthenticator(); // Now within the Authenticator context
  return (
    <View style={styles.signOutButton}>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

const AuthenticatedAppContent = () => {
  const [myJournal, setMyJournal] = useState<Schema["Journal"]["type"][]>([]);

  const fetchJournalEntries = async () => {
    try {
      const data = await client.models.Journal.list();
      console.log(data);
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

  return (
    <LinearGradient colors={['#d9bbb0', '#F7E7CE', '#d9bbb0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <SafeAreaView style={{ height: '100%' }}>
        <SignOutButton />
        <Home />
      </SafeAreaView>
    </LinearGradient>
  );
};

const App = () => {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <AuthenticatedAppContent />
      </Authenticator>
    </Authenticator.Provider>
  );
};

export default App;
