import { View, Text, SafeAreaView, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { commonStyles } from '../../styles/CommonStyles'

export function SignIn({ navigation }) {
    
    function navigateForInitial() {
        navigation.navigate('Initial')
    }
    function navigateForSignInAndress() {        
        if(!name){
            setErrorMessage('Digite seu nome')
          }
          else if(name.length < 8){
            setErrorMessage('Digite um nome com mais de 7 caracteres')
          }
          else if(!telephone){
            setErrorMessage('Digite seu telefone')
          }
          else if(!email){
            setErrorMessage('Digite seu email')
          }
          else if(!rg){
            setErrorMessage('Digite seu RG')
          }
          else if(!cpf){
            setErrorMessage('Digite seu CPF')
          }
          else if(!password){
            setErrorMessage('Digite sua senha')
          }
          else if(password.length<7){
            setErrorMessage('Senha fraca, digite uma senha entre 8 a 16 caracteres')
          }
          else {
            navigation.navigate('SignInAndress',{
                users: {
                    name: name,
                    telephone: telephone,
                    email: email,
                    rg: rg,
                    cpf: cpf,
                    password: password
                },

            })
          }
    }

    const [name, setName] = useState('')
    const [telephone, setTelephone] = useState('')
    const [email, setEmail] = useState('')
    const [rg, setRg] = useState('')
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.marginContainer}>

                    <Text style={{ ...styles.text, alignSelf: 'center', margin: 20, fontSize: 25 }}> Nova Conta</Text>

                    <Text style={styles.text}>Nome Completo</Text>
                    <TextInput
                        placeholder='Digite seu nome...'
                        style={styles.input}
                        minLength={4}
                        value={name}
                        onChangeText={setName} />

                    <Text style={styles.text}>Telefone</Text>
                    <TextInput
                        placeholder='Digite seu nome...'
                        style={styles.input}
                        value={telephone}
                        onChangeText={setTelephone}
                        keyboardType='number-pad'
                    />

                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        placeholder='Digite seu nome...'
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <Text style={styles.text}>N do RG</Text>
                    <TextInput
                        placeholder='Digite seu nome...'
                        style={styles.input}
                        value={rg}
                        onChangeText={setRg}
                        keyboardType='number-pad'
                    />

                    <Text style={styles.text}>CPF</Text>
                    <TextInput
                        placeholder='Digite seu nome...'
                        style={styles.input}
                        value={cpf}
                        onChangeText={setCpf}
                        keyboardType='number-pad'
                    />

                    <Text style={styles.text}>Senha</Text>
                    <TextInput
                        placeholder='Digite seu nome...'
                        secureTextEntry={true}
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
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
                        <TouchableOpacity onPress={navigateForSignInAndress} style={commonStyles.button}><Text>Continuar</Text></TouchableOpacity>
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
        marginLeft: 10
    },
    text: {
        fontSize: 15,
        fontStyle: 'italic',
    },
    input: {
        width: '90%',
        height: 40,
        backgroundColor: 'white',
        textAlign: 'left',
        color: 'black',
        fontSize: 18,
        margin: 5,
        borderRadius: 5
    },
    
})