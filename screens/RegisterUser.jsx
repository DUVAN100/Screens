import React, { useState } from 'react';
import { StyleSheet, Text,  View, Alert, Modal, TouchableHighlight} from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button } from 'react-native-paper';



export const RegisterUser = ({route}) => {
  
  let arrayobject = route.params[0];

  console.log("arrayobject ", arrayobject);

  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  
  const { control, handleSubmit,reset, formState: { errors } } = useForm({
      defaultValues: {
        email: '',
        userName: '',
        fullName:'',
        password: ''  
      }
    });
  
    const showModal = () => {
    setModalVisible(true);
  }
  
  const closeModal = () => {
    setModalVisible(false);
  }
  
  const onsubmit=(data)=>{
    console.log("DATA:  ", data);
    let findUser = arrayobject.find(usr => usr.name === data.userName || usr.email === data.email )
    if (findUser === undefined){
      setMessage('Usuario Registrado');
      showModal();
      arrayobject.push(data);
      reset(); 
    }else{
      setMessage('Usuario ya existe, trata otra vez');
      showModal();
      reset(); 
    }
  }
  return (
    <View style={styles.container}> 
      <Controller 
        control={control}
        rules={{
          required: true,
          maxLength:10,
          minLength:3,
          pattern:/^[a-zA-Z0-9]+$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{margin:5, borderRadius:10}}
            placeholder="ejemplo: jad154"
            label="Nombre de Usuario"
            mode='outlined'
            left={<TextInput.Icon icon="clipboard-account"/>}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="userName"
      />
    {errors.userName?.type == 'required' && <Text style={{color:'red'}}>Nombre es requerido.</Text>}
    {errors.userName?.type == 'maxLength' && <Text style={{color:'red'}}>Nombre max 30 caracteres.</Text>}
    {errors.userName?.type == 'minLength' && <Text style={{color:'red'}}>Nombre min 3 caracteres.</Text>}
    {errors.userName?.type == 'pattern' && <Text style={{color:'red'}}>Solo letras y numeros.</Text>}
      <Controller 
        control={control}
        rules={{
            required: true,
            maxLength:30,
            minLength:4,
            pattern:/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{margin:5, borderRadius:10}}
              placeholder="Escribe tu nombre completo"
              label="Nombre Completo"
              mode='outlined'
              left={<TextInput.Icon icon="clipboard-account"/>}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
              />
            )}
            name="fullName"
        />
    {errors.fullName?.type == 'required' && <Text style={{color:'red'}}>Nombre Completo es requerido</Text>}
    {errors.fullName?.type == 'maxLength' && <Text style={{color:'red'}}>Nombre Completo max  30 caracteres.</Text>}
    {errors.fullName?.type == 'minLength' && <Text style={{color:'red'}}>Nombre Completo min 4 caracteres.</Text>}
    {errors.fullName?.type == 'pattern' && <Text style={{color:'red'}}>Solo letras.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
          pattern:/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={{margin:5, borderRadius:10}}
          label="E-mail"
          placeholder='ejemplo@gmail.com'
          mode='outlined'
          left={<TextInput.Icon icon="email-box"/>}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
          />
        )}
        name="email"
      />
    {errors.email?.type == 'required' && <Text style={{color:'red'}}>E-mail es requerido.</Text>}
    {errors.email?.type == 'pattern' && <Text style={{color:'red'}}>E-mail es invalido.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
          pattern: /^(?=.*[a-zA-Z])(?=.*[0-9]).{3,}$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={{margin:5, borderRadius:10}}
          placeholder='Ejemplo: Julian112'
          secureTextEntry={true}
          label="password"
          mode='outlined'
          left={<TextInput.Icon icon="eye"/>}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
          />
        )}
        name="password"
      />
    {errors.password?.type == 'required' && <Text style={{color:'red'}}>Contraseña es requerida.</Text>}
    {errors.password?.type == 'minLength' && <Text style={{color:'red'}}>Minimo 3 caracteres.</Text>}
    {errors.password?.type == 'pattern' && <Text style={{color:'red'}}>Contraseña invalida, solo letras y numeros.</Text>}  
      <Button style={{margin:20}} icon="login" mode="contained" onPress={handleSubmit(onsubmit)}>Resgiter</Button>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(false);}}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{message}</Text>
            <TouchableHighlight
              style={{ ...styles.closeButton }}
              onPress={() => {
                  closeModal();
              }}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AF7AC5 ',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#E35921",
    borderRadius: 10,
    padding: 10
  }
});
