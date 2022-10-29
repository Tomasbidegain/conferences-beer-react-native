import React from "react"
import { View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function ConfrenceScreen({navigatior, route}) {
  const { title, description, img_url, photoProfile_url, chef, skills, id } = route.params;
  return(
    <ScrollView contentContainerStyle={{
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: '#001d2e',
      alignItems: 'center'
    }}>
      <View style={styles.imageContainer}>
        <Image
        style={styles.image}
          source={{ uri: img_url}}
        />
      </View>
      <View style={styles.contentInfo}>
        <View style={styles.contentChef}>
          <View style={styles.contentAvatar}>
            <Image
              style={styles.avatar}
              source={{ uri: photoProfile_url}}
            />
          </View>
          <View style={styles.contentTitleChef}>
            <Text style={styles.titleChef}>Chef - {chef}</Text>
          </View>
        </View>
        <View style={styles.contentTitleDescription}>
          <Text style={styles.title}>{title}</Text>
          <Text style={{color: '#ababa9', marginBottom:10, textAlign: 'justify'}}>{description}</Text>
        </View>
        <View style={styles.contentSkills}>
          <Text style={styles.titleSkills}>Skills</Text>
          {skills.map(skill => {
            return(
              <View style={styles.itemSkill}>
                <MaterialIcons name="check" size={24} color="#d2691e" />
                <Text style={{color: '#ababa9', textAlign: 'justify', paddingRight: 25}}>{skill}</Text>
              </View>
            )
          })}
        </View>
      </View>
      <View/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#001d2e',
  },
  imageContainer:{
    width: '100%',
    height: '40%'
  },
  image:{
  width:400,
  height:'100%',
  resizeMode: 'cover',
  },
  avatar:{
    width: 30,
    height: 30,
    borderRadius: 30,

  },
  contentInfo:{
    width: '85%'
  },
  contentChef:{
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent:'flex-start'
  },
  contentAvatar:{
    justifyContent:'center'
  },
  contentTitleChef:{
    marginLeft: 20
  },
  titleChef:{
    fontWeight: 'bold',
    color:'#fff',
    fontSize: 18
  },
  contentTitleDescription:{
    marginTop: 20,
  },
  contentSkills:{
    marginTop: 20
  },
  itemSkill:{
    flexDirection: 'row',
    justifyContent:'flex-start',
    marginTop: 10
  },
  title:{
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 22,
    marginBottom:5
  },
  titleSkills:{
    fontSize:18,
    fontWeight:'bold',
    color: '#fff'
  }
})