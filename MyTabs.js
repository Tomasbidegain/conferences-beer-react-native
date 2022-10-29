import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 

//import screens
import ConferencesScreen from "./screens/ConferencesScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MapScreen from "./screens/MapScreen";

//Creaer tab
const Tab = createBottomTabNavigator();

function MyTabs() {

  return(
    <Tab.Navigator 
      initialRouteName="Conferencias" 
      screenOptions={{
          tabBarActiveTintColor: '#d2691e'
      }}>
      <Tab.Screen 
        name='Mapa'
        component={MapScreen}
        options={{
          tabBarLabel: 'Mapa',
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="map-marker-radius" size={size} color={color}/>
          )
        }}
      />

      <Tab.Screen 
        name='Conferencias'
        component={ConferencesScreen}
        options={{
          tabBarLabel: 'Conferencias',
          headerTitleAlign: 'center',
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="meeting-room" size={size} color={color}/>
          )
        }}
      />
      <Tab.Screen 
          name='Perfil'
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Perfil',
            headerTitleAlign: 'center',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="person" size={size} color={color}/>
            )
          }}
        />
    </Tab.Navigator>
  )
}

export default MyTabs;