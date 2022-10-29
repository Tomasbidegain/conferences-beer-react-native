import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import { userContext } from '../App';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen( props ) {
  const { setUser, app } = useContext(userContext);
  
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const navigatior = useNavigation();
  
  const auth = getAuth(app);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '397583292824-tbbbg7nr0q6mt80toi6f33f4c0u3ou89.apps.googleusercontent.com'
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
      setUser(auth.currentUser);
      navigatior.replace('SignIn');
    }
  }, [response]);


  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setUser(userCredential.user);
      navigatior.navigate('SignIn')
    })
    .catch(error => {
      let text = '';
      if (error.message === 'Firebase: Error (auth/wrong-password).'){
        text = 'Contraseña incorrecta.'
      } 
      else if (error.message === 'Firebase: Error (auth/user-not-found).'){
        text = 'No hay un usuario registrado con ese mail.'
      }
      else {
        text = 'Ingrese un mail valido.'
      }
      Toast.show({
        position: 'top',
        type:'error',
        text1: 'Error!',
        text2: `${text}`
      })
      console.log(error.message)
    })
  }
  return(
    <View style={styles.container}>
      <ScrollView >
        <View style={styles.containerTitles}>
          <Text style={styles.textTitle}>Bienvenido a ConfBeer</Text>
          <Text style={styles.textSubtitle}>Por favor, ingrese con su cuenta</Text>
        </View>
        <View style={styles.login}>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder='Ingrese su email'></TextInput>
          </View>
          <View>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder='Ingrese su contraseña' secureTextEntry={true}></TextInput>
          </View>
          <View style={styles.contrañaOlvidada}>
            <Text style={styles.contraseñaOlvidada}>¿Olvido su contraseña?</Text>
          </View>
          <View style={styles.ContainerinciarSesion}>
            <TouchableOpacity onPress={handleSignIn} style={styles.inciarSesion}>
              <Text style={styles.TextInput}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerGoogle}>
            <Text style={[styles.textSubtitle, {marginBottom:20}]}>O continúe con Google</Text>
            <TouchableOpacity 
              style={styles.inciarSesionGoogle}
              disabled={!request}
              title="Login"
              onPress={() => {
                promptAsync();
              }}
            >
              <Text style={styles.TextInput}>Google</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.noCuenta}>
            <Text style={styles.contraseñaOlvidada} >No tiene cuenta? </Text>
            <Text style={styles.noTieneCuenta} onPress={() => {navigatior.navigate('Create Account')}}>Ingrese Aquí.</Text>
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
    height: 180,
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
    color: '#ababa9'
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
  inciarSesion:{
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
  noTieneCuenta:{
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d2691e'
  },
  noCuenta: {
    display: 'flex',
    flexDirection: 'row',
  },
  contraseñaOlvidada: {
    color: '#fff'
  },
  containerGoogle:{
    justifyContent:'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  contrañaOlvidada: {
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
  ContainerinciarSesion:{
    marginBottom: 20
  }
});
