import { StyleSheet, TextInput, View, SafeAreaView, Dimensions, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react';
import { API } from '../../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PayAnimation from '../../../assets/pay.json'


export function Initial({ navigation }) {

  const[inputCPF, setInputCPF] = useState('')

  const [inputPassword, setInputPassword] = useState('')

  const [showPassword, setShowPassoword] = useState(true)

  const [errorMessage, setErrorMessage] = useState('')
  const [id,setId] = useState('')

  function saveSing(){
    if(!inputCPF){
      setErrorMessage('Digite seu cpf')
    }
    else if(!inputPassword){
      setErrorMessage('Digite sua senha')
    } else{
      fetch(API + '/users?cpf=' + inputCPF + '&password=' + inputPassword)
      .then(async(response) => {
        const data = await response.json()
        if(data.length === 1) {
          await AsyncStorage.setItem('@id_user',JSON.stringify(data[0].id))
          navigation.navigate('User')
        } else {
          alert('Usuário não cadastrado')
        }        
      })
      .catch(() => alert('Houve um erro ao tentar logar.'))
    }
  }

  function navigateForSignIn() {
    navigation.navigate('SignIn')
  }
  return (
    <SafeAreaView style={styles.animationContainer}>
      <Text style={styles.titleText}>ReactPay</Text>
      <LottieView
        autoPlay
        style={{ height: Dimensions.get('screen').height * 0.2 }}
        source={PayAnimation}
      />
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder='CPF'
          keyboardType='number-pad'
          value={inputCPF}
          onChangeText={setInputCPF}
        />
      </View>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder='Senha'
          secureTextEntry={showPassword}
          value={inputPassword}
          onChangeText={(password) => setInputPassword(password)}
        />
        <TouchableOpacity style={styles.icon} onPress={() => setShowPassoword(!showPassword)}>
          {showPassword ?
            <Ionicons name='eye' color='black' size={25} />
            :
            <Ionicons name='eye-off' color='black' size={25} />
          }
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={saveSing} style={styles.button}><Text style={{fontSize: 15}} onPress={saveSing}>Logar</Text></TouchableOpacity>
      <TouchableOpacity onPress={navigateForSignIn}><Text>Abrir conta gratuita</Text></TouchableOpacity>

      {
        errorMessage!== '' && (
          <View>
            <Text>{errorMessage}</Text>
          </View>
        )
        
      }




    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 50,
    color: 'black',
    margin: 10,
    fontStyle: 'italic'
  },

  animationContainer: {
    flex: 1,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputArea: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    textAlign: 'left',
    borderRadius: 10,
    color: 'black',
    fontSize: 15,
    margin: 5,
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    width: '85%',
    height: 50,
    padding: 8,
    fontSize: 18
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 5    
  }
});
