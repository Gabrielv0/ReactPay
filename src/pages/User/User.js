import { View, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { API } from '../../../services/api';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native'
import { commonStyles } from '../../styles/CommonStyles';

export function User({navigation, route}) {
    
    const [userData, setUserData] = useState([])
    const [userId, setUserId] = useState('')
    const telaFocada = useIsFocused()
   

    

    const getResult = async () => {
        const value = await AsyncStorage.getItem('@id_user')
        setUserId(value)
    }
    
    function navigateForLogin(){
        alert('Usuario foi deslogado')
        navigation.navigate('Initial')
    }

    useEffect(() => {
        
          getResult()         
        
    
      }, [])

    function showUser() {
        fetch(API + '/users?id=' + userId)
            .then(async (response) => {
                const data = await response.json()
                setUserData(data)
            })
            .catch(() => console.log('Houve um error ao carregar os dados'))
    }
    
    useEffect(() => {
        if (telaFocada === true) {
          showUser()
        }
    
      }, [telaFocada])


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dados do Usuário</Text>
            <View>
                {userData.map(user =>

                    <View style={styles.detailsUser} key={user.id}>
                        <Text style={styles.textUser}>Nome: {user.fullname}</Text>
                        <Text style={styles.textUser}>CPF: {user.cpf}</Text>
                        <Text style={styles.textUser}>Telefone: {user.contact}</Text>
                        <Text style={styles.textUser}>RG: {user.number_rg}</Text>
                    </View>
                )}             


            </View>
            <TouchableOpacity style={{...commonStyles.button,width: 50}} onPress={navigateForLogin}>
                    <Text>SAIR</Text>
                </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        margin: 20,
        fontSize: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gold'
    },
    textUser:{
        fontSize:15

    },
    detailsUser: {        
        padding: 12,
        borderRadius: 8,
        color: "#666",
        backgroundColor: "white",
        marginBottom: 10
        
    }
})
    
