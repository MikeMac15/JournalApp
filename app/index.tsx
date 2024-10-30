import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet, SafeAreaView } from "react-native";
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";
import outputs from "../amplify_outputs.json";
// import SettingsIndex from "./(settings)";
import LinearGradient from 'react-native-linear-gradient';
import Home from "./(home)";
import { generateClient } from "aws-amplify/data";

import { Nullable } from "@aws-amplify/data-schema";
import { styles } from "../Styles/Styles";
import { Schema } from "../amplify/data/resource";
import { useFocusEffect } from "expo-router";
import { parseAmplifyConfig } from "aws-amplify/utils";




Amplify.configure(parseAmplifyConfig(outputs));
const client = generateClient<Schema>({
  authMode:'userPool'
})

type Journal = {
  date: string;
  message: Nullable<string>;
  tags: Nullable<string>[] | null;
  pictures: Nullable<string>[] | null;
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}[];

const App = () => {
  // const { signOut } = useAuthenticator();
  // const [myJournal,setMyJournal] = useState<Schema["Journal"]["type"][]>([]);
  
  // const fetchJournalEntries = async () => {
  //   try {
  //     const data = await client.models.Journal.list();
  //     console.log(data)
  //     if (data) {
  //       setMyJournal(data.data);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch journal entries:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchJournalEntries();

  // }, []); 
  


  const SignOutButton = () => {
    return (
      <View style={styles.signOutButton}>
        {/* <Button title="Sign Out" onPress={signOut} /> */}
      </View>
    );
  };


  return (
    <Authenticator.Provider>
      
<LinearGradient colors={['#d9bbb0','#F7E7CE','#d9bbb0']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} >
        <SafeAreaView style={{height:'100%'}}>
        <SignOutButton />
      <Authenticator>
          
        <Home />
         
      </Authenticator>
        </SafeAreaView>
</LinearGradient>
    </Authenticator.Provider>
  );
};


export default App;