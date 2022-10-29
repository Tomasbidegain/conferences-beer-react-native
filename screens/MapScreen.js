import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

function MapScreen() {
  return(
    <View style={styles.container}>
      <MapView style={styles.map}      
      initialRegion={{
        latitude:-32.46111156511342, 
        longitude:-58.22081346302132,
        latitudeDelta: 0.0700,
        longitudeDelta: 0.0700
      }}>

      <Marker coordinate={{
        latitude: -32.47987506505002,
        longitude: -58.23533630535316
      }}>
        <Callout>
          <View>
            <Text>Confer Beer</Text>
            <Text>Horario: 21:30</Text>
            <Text>Lugar: 7 colinas</Text>
          </View>
        </Callout>
      </Marker>

      </MapView>
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
  map:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})

export default MapScreen;