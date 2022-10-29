import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useNavigation } from '@react-navigation/native';
import { getFirestore } from "firebase/firestore";


export default function CreateAccountScreen( { app } ) {
  const [newUser, setNewUser] = useState({
    name:'',
    lastName: '',
    email: '',
    password: ''
  })

  const navigation = useNavigation();

  const db = getFirestore(app);

  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const name = newUser.name[0].toUpperCase() + newUser.name.slice(1);
      const lastName = newUser.lastName[0].toUpperCase() + newUser.lastName.slice(1);;
      user.displayName = `${name} ${lastName}`;
      navigation.navigate('Login');
      Toast.show({
        position: 'top',
        type:'success',
        text1: 'Cuenta creada con exito!',
        text2: 'Inicie sesión con su nueva cuenta.'
      })
      console.log(user)
    })
    .catch((error) => {
      let text = '';
      console.log(error.message)
      if (error.message === 'Firebase: Error (auth/email-already-in-use).'){
        text = 'El mail con el que intenta registrarse ya esta en uso.'
      } 
      else if(error.message === 'Firebase: Error (auth/invalid-email)'){
        text = 'La contraseña debe tener al menos 6 digitos.';
      } 
      Toast.show({
        position: 'top',
        type:'error',
        text1: 'Error!',
        text2: `${text}`,
      })
    })
  }

  return(
    <View style={styles.container}>
        <View style={styles.containerTitles}>
          <Text style={styles.textTitle}>Cree su cuenta en ConfBeer</Text>
          <Text style={styles.textSubtitle}>Por favor, ingrese sus datos</Text>
        </View>
      <ScrollView >
        <View style={styles.login}>
          <View>
            <Text style={styles.label}>Nombre</Text>
            <TextInput 
              onChangeText={(text) => setNewUser({...newUser, name: text})} 
              style={styles.input} 
              placeholder='Ingrese su nombre'>
            </TextInput>
          </View>
          <View>
            <Text style={styles.label}>Apellido</Text>
            <TextInput 
              onChangeText={(text) => setNewUser({...newUser, lastName: text})}
              style={styles.input} 
              placeholder='Ingrese su apellido' >
            </TextInput>
          </View>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              onChangeText={(text) => setNewUser({...newUser, email: text})}
              style={styles.input}
              placeholder='Ingrese su email'>
            </TextInput>
          </View>
          <View>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput 
              onChangeText={(text) => setNewUser({...newUser, password: text})}
              style={styles.input}
              placeholder='Ingrese su contraseña'
              secureTextEntry={true}>
            </TextInput>
          </View>
          <View style={styles.ContainerinciarSesion}>
            <TouchableOpacity onPress={handleCreateAccount} style={styles.crearCuenta}>
              <Text style={styles.TextInput}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Toast/>
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
  login:{
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems:'center',
    width:300,
    height: 500,
  },
  containerTitles:{
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff'
  },
  textSubtitle: {
    fontSize: 15,
    color: '#ababa9',
  },
  input:{
    width:250,
    height: 50,
    borderColor: '#d2691e',
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
    marginVertical: 10,
    marginBottom: 20,
    backgroundColor: '#ffffff90',
  },
  crearCuenta:{
    width: 250,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#d2691e',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inciarSesionGoogle:{
    width: 250,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#fc6c6d',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInput: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  containerGoogle:{
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  label:{
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10
  },
});
