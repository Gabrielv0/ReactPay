import { View, Text, SafeAreaView, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { commonStyles } from '../../styles/CommonStyles'
export function SignInAndress({ navigation, route }) {

    const { users } = route?.params

    function navigateForInitial() {
        navigation.navigate('SignIn')
    }

    function navigateForSignInCalendar() {
        if (!cep) {
            setErrorMessage('Digite seu CEP')
        }
        else if (cep.length < 8) {
            setErrorMessage('CEP invalido, digite os 8 numeros do cep')
        }
        else if (!andress) {
            setErrorMessage('Digite seu endereço')
        }
        else if (!city) {
            setErrorMessage('Digite sua cidade')
        }
        else if (!state) {
            setErrorMessage('Digite seu estado')
        }
        else if (!neighborhood) {
            setErrorMessage('Digite seu Bairro')
        }
        else if (!number) {
            setErrorMessage('Digite o número da residencia')
        }
        else if (!complement) {
            setErrorMessage('Digite o complemento')
        }
        else {
            navigation.navigate('SignInCalendar', {
                users: users,
                andress: {
                    cep: cep,
                    andress: andress,
                    city: city,
                    state: state,
                    neighborhood: neighborhood,
                    number: number,
                    complement: complement

                }

            })
        }
    }


    const [cep, setCep] = useState('')
    const [andress, setAndress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [number, setNumber] = useState('')
    const [complement, setComplement] = useState('')
    const [errorMessage, setErrorMessage] = useState('')




    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.marginContainer}>

                    <Text style={{ ...styles.text, alignSelf: 'center', margin: 20 }}> Endereço</Text>

                    <Text style={styles.text}>CEP</Text>
                    <TextInput
                        placeholder='Digite seu cep...'
                        style={styles.input}
                        value={cep}
                        onChangeText={setCep}
                        keyboardType='number-pad' />

                    <Text style={styles.text}>Rua</Text>
                    <TextInput
                        placeholder='Digite sua rua...'
                        style={styles.input}
                        value={andress}
                        onChangeText={setAndress} />

                    <Text style={styles.text}>Cidade</Text>
                    <TextInput
                        placeholder='Digite sua cidade...'
                        style={styles.input}
                        value={city}
                        onChangeText={setCity}
                    />

                    <Text style={styles.text}>Estado</Text>
                    <TextInput
                        placeholder='Digite seu estado...'
                        style={styles.input}
                        value={state}
                        onChangeText={setState} />

                    <Text style={styles.text}>Bairro</Text>
                    <TextInput
                        placeholder='Digite seu nome...'
                        style={styles.input}
                        value={neighborhood}
                        onChangeText={setNeighborhood}
                    />

                    <Text style={styles.text}>Nº da residencia</Text>
                    <TextInput
                        placeholder='Digite seu nome...'
                        style={styles.input}
                        value={number}
                        onChangeText={setNumber}
                        keyboardType='number-pad'
                    />

                    <Text style={styles.text}>Complemento</Text>
                    <TextInput
                        placeholder='Digite seu nome...'
                        style={styles.input}
                        value={complement}
                        onChangeText={setComplement}
                    />

                    {
                        errorMessage !== '' && (
                            <View>
                                <Text style={commonStyles.errorMensage}>{errorMessage}</Text>
                            </View>
                        )

                    }

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={navigateForInitial} style={commonStyles.button}><Text>Voltar</Text></TouchableOpacity>
                        <TouchableOpacity onPress={navigateForSignInCalendar} style={commonStyles.button}><Text>Continuar</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gold',

    },
    marginContainer: {
        marginTop: 50,
        marginLeft: 10,

    },
    text: {
        fontSize: 15,
        fontStyle: 'italic',
    },
    input: {
        width: '90%',
        height: 40,
        backgroundColor: 'white',
        textAlign: 'center',
        borderRadius: 5,
        color: 'black',
        fontSize: 15,
        margin: 5
    },
})