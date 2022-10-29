import React, {useContext} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { userContext } from '../App';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth'

function ProfileScreen(props) {
  const { user, app } = useContext(userContext);

  const auth = getAuth(app);

  const navigatior = useNavigation();

  const handleSignOut = () =>{
    auth
      .signOut()
      .then(() => {
        navigatior.replace('Login')
      })
      .catch(error => alert(error))
  }

  const noImage = 'https://firebasestorage.googleapis.com/v0/b/conference-beer.appspot.com/o/No-Image.jpg?alt=media&token=aae92bbc-f22a-47e8-b419-5622f59cdf39';

  return(
    <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.headerContent}>
          <Image style={styles.avatar}
            source={{uri: user.photoURL ? user.photoURL : noImage }}
          />
          <Text style={styles.name}>{user.displayName}</Text>
      </View>
    </View>

    <View style={styles.body}>
    <View style={styles.headerContent}>
      <View style={styles.item}>
        <MaterialIcons name="email" size={24} color="black" /> 
        <Text style={styles.userInfo}> {user.email}</Text>
      </View>
      <TouchableOpacity style={styles.cerrarSesion} onPress={handleSignOut}><Text>Cerrar sesión</Text></TouchableOpacity>
    </View>
    
    </View>
</View>
  )
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#001d2e",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#d2691e",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#fff",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#ababa9",
    fontWeight:'600',
  },
  body:{
    backgroundColor: "#fff",
    height:500,
    alignItems:'center',
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  },
  cerrarSesion:{
    marginTop: 50,
    width: 250,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#d2691e',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ProfileScreen;