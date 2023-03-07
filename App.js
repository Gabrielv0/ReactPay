import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler'


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const UserStack = createStackNavigator()
const DebsStack = createStackNavigator()

import { Initial } from './src/pages/Initial/Initial'
import { SignIn } from './src/pages/SignIn/SignIn'
import { SignInAndress } from './src/pages/SignIn2/SingInAndress';
import { SignInCalendar } from './src/pages/SignInCalendar/SignInCalendar';
import { Terms } from './src/pages/Terms/Term';
import { User } from './src/pages/User/User'
import { PayScreen } from './src/pages/PayScreen/PayScreen'
import { Scanner } from './src/pages/Scanner/Scanner';
import { DebtsDetails } from './src/pages/DebtsDetails/DebtsDetails';



import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function UserNavigator() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="UserLogged" component={User} options={{ headerShown: false }} />          
      </UserStack.Navigator>
  )
}

function DebtsPage(){
  return(
    <DebsStack.Navigator>
      <DebsStack.Screen name="Scan" component={Scanner} options={{headerShown: false}}/>
      <DebsStack.Screen name="DebtsDetails" component={DebtsDetails} options={{headerShown: false}} />
    </DebsStack.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName='Usuario'>

      <Tab.Screen name="Scanner"
        component={DebtsPage}
        options={
          {
            headerShown: false,
          }} />

      <Tab.Screen
        name='Tela de Pagamento'
        component={PayScreen}
        options={{ headerShown: false }} />

      <Tab.Screen name="Usuario"
        component={UserNavigator}
        options={
          {
            headerShown: false
          }
        } />



    </Tab.Navigator>
  )
}







export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Initial'>
        <Stack.Screen name="Initial" component={Initial} options={{ headerShown: false }} />
        <Stack.Screen name='SignIn' component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name='SignInAndress' component={SignInAndress} options={{ headerShown: false }} />
        <Stack.Screen name='SignInCalendar' component={SignInCalendar} options={{ headerShown: false }} />
        <Stack.Screen name='Terms' component={Terms} options={{ headerShown: false }} />
        <Stack.Screen name='User' component={TabNavigator} options={{ headerShown: false }} />        
      </Stack.Navigator>
    </NavigationContainer>
  )
}