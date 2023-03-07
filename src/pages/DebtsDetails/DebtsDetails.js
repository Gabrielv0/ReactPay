import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { API } from '../../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage';


export function DebtsDetails({ navigation, route }) {

    const { debtsCode } = route.params
    const [debtsInfo, setDebtsInfo] = useState([])
    const [userId, setUserId] = useState('')

    const getResult = async () => {
        const value = await AsyncStorage.getItem('@id_user')
        setUserId(value)
    }

    useEffect(() => {

        getResult()


    }, [])

    /* Tive problemas para voltar a tela para o Scanner ao pagar o boleto, porém está funcional depois de pagar, só clicar na tab scanner ele volta para o leitor. */


    function navigateForUser(){
        navigation.navigate('User')
    }
    
    useEffect(() => {
        fetch(API + '/debts?id=' + debtsCode)
            .then(async (response) => {
                const data = await response.json()
                setDebtsInfo(data)
                
            })
            .catch(() => console.log('Houve um error ao carregar os dados'))
    }, [])

    function payDebt() {
        fetch(
            API + '/invoices',
            {
                body: JSON.stringify({
                    recipient: debtsInfo[0].recipient,
                    amount: debtsInfo[0].amount,
                    date: 'teste',
                    code: debtsCode,
                    user_id: userId,
                    cashback: Number(debtsInfo[0].amount) * 0.10



                }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(() => {
                alert('Cadastro feito com sucesso')                              
            })

            .catch(() => console.log('Houve um erro'))
    }




    return (
        <View style={styles.container}>
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>Detalhes do Boleto nº:{debtsCode}</Text>

                {debtsInfo.map(debt =>

                    <View key={debt.id}>

                        <Text style={styles.text} editable={false}>Para: {debt.recipient}</Text>
                        <Text style={styles.text} editable={false}>Valor: {debt.amount}</Text>
                        <Text style={styles.text} editable={false}>Código do boleto: {debt.id}</Text>
                        <Text style={styles.text} editable={false}>Cashback: {(Number(debt.amount) * 0.10)}</Text>

                    </View>
                )}
                <View style={{ flexDirection: 'row'}}>
                    
                    <TouchableOpacity style={styles.button}>
                        <Text onPress={payDebt}>PAGAR</Text>
                    </TouchableOpacity>                  
                    
                    <TouchableOpacity>
                        <Text style={styles.button} onPress={navigateForUser} >VOLTAR</Text>
                    </TouchableOpacity>
                    
                </View>


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gold'

    },
    title: {
        fontSize: 20,
        margin: 10
    },

    text: {
        fontSize: 16
    },
    detailsContainer: {
        marginTop: 12,
        padding: 12,
        borderRadius: 8,
        color: "#666",
        backgroundColor: "white",
        height: 300
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin: 5,
        backgroundColor: 'red'
    }
})