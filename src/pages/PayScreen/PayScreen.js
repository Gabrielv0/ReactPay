import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { API } from '../../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'


export function PayScreen() {


    const [userId, setUserId] = useState('')
    const [debtsPaid, setDebtsPaid] = useState([])
    const telaFocada = useIsFocused()

    const getResult = async () => {
        const value = await AsyncStorage.getItem('@id_user')
        setUserId(value)
    }

    useEffect(() => {

        getResult()


    }, [])

    function getDebtsPaid() {
        fetch(API + '/invoices?user_id=' + userId)
            .then(async (response) => {
                const data = await response.json()
                setDebtsPaid(data)
            })
            .catch(() => console.log('Houve um error ao carregar os dados'))
    }

    useEffect(() => {
        if (telaFocada === true) {
            getDebtsPaid()
        }

    }, [telaFocada])


    return (
        
        <View style={styles.container}>
            <Text style={styles.title}>Boletos Pagos:</Text>
            <ScrollView>
            <View style={styles.debtsContainer}>
                {debtsPaid.map(debtPaid =>

                    <View style={styles.textDebt} key={debtPaid.id}>
                        <Text>Nome: {debtPaid.recipient}</Text>
                        <Text>Valor: {debtPaid.amount}</Text>
                    </View>
                )}

            </View>
            </ScrollView>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',        
        backgroundColor: 'gold'
    },
    title:{
        fontSize: 20,        
        alignSelf: 'center',
        marginTop: 50,
        marginVertical:20
    },
    debtsContainer:{
        alignSelf:'center',
        backgroundColor: 'white',
        width: '80%',
        borderRadius: 10
    },
    textDebt: {
        padding: 5,
        fontSize: 20
    }
})