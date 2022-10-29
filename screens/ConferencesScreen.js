import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableNativeFeedback} from 'react-native';
import { collection, query, onSnapshot } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { userContext } from '../App'


export default function ConferencesScreen( props ) {

  const {app} = useContext(userContext);

  const [conferences, setConferences] = useState([])

  const navigatior = useNavigation();

  useEffect(() => {
    const db = getFirestore(app);
    const q = query(collection(db, "conferences"))
    const conferences = [];
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
          const {title, description, chef, skills, img_url, photoProfile_url } = doc.data();
          conferences.push({
            id: doc.id,
            title,
            description,
            chef,
            skills,
            img_url,
            photoProfile_url
          })
      });

      setConferences(conferences);
    });
  }, []);

  return (
  <View style={styles.container}>
    <ScrollView>
    <View style={styles.grid}>
      {
        conferences.map(conference => {
          const i = i+1;
          return(
            <TouchableNativeFeedback key={i} onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigatior.navigate('Details', {
                id: conference.id,
                title: conference.title,
                description: conference.description,
                chef: conference.chef,
                img_url: conference.img_url,
                photoProfile_url: conference.photoProfile_url,
                skills: conference.skills
              });
            }}>
            <View style={styles.conferenceContainer}
              key={conference.id}>
              <View style={styles.contentChef}>
                <Image
                  style={styles.avatar}
                  source={{ uri: conference.photoProfile_url}}
                />
                <Text style={{color:'#fff', fontSize:14, fontWeight:'bold'}}>C. {conference.chef}</Text>
              </View>
              <View style={styles.ImageContainer}>
                <Image
                  style={styles.conferenceImage}
                  source={{ uri: conference.img_url}}
                />
              </View>
              <View style = {styles.titleContainer}>
                <Text style={styles.title}>{conference.title} </Text>
                <Text style={styles.subtitle}>Ver más...</Text>
              </View>
            </View>
            </TouchableNativeFeedback>
          )
        })
      }
    </View>
    </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#001d2e',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "none"
  },
  conferenceContainer:{
    width: '43%',
    margin: 10,
    borderRadius: 10,
    borderColor: "none"
  },
  ImageContainer:{
    width:'100%',
    height: 180,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 10
  },
  conferenceImage:{
    width:250,
    height: 250,
    resizeMode: 'cover',
  },
  avatar:{
    width: 30,
    height: 30,
    borderRadius: 10,

  },
  contentChef:{
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-around',
  },
  title:{
    fontSize:18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff'
  },
  subtitle: {
    fontSize: 10,
    color: '#ababa9'
  },
})