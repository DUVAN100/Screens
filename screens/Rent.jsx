import React, { useState } from 'react';
import { StyleSheet,View, Modal,TouchableHighlight } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Text} from 'react-native-paper';

export const Rent = ({route}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    let arrayUsers = route.params[0];
    let arrayRent = route.params[1];
    let arrayCars = route.params[2];
    console.log("arraysCars", arrayCars)
 
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
          rentNumber: '',
          nameUser: '',
          plateNumber:'',
          rentDate:''
        }
      });
      const showModal = () => {
        setModalVisible(true);
      }
      const closeModal = () => {
        setModalVisible(false);
      }
      const clearFields = ()=>{
        reset()
      }

    const onsubmit=(data)=>{
        let findUser = arrayUsers.find(usr => usr.userName == data.nameUser)
        let findPlateNumber = arrayCars.find(usr => usr.plateNumber === data.plateNumber)
        if(findUser === undefined){
          setMessage('The user is not registered')
          showModal();
        }else if(findPlateNumber === undefined){
          setMessage('The license plate number does not exist.');
          showModal();
        }else if(findPlateNumber.isChecked === true){
          setMessage('The car is not available');
          showModal();
        }else{
          findPlateNumber.isChecked = true
          arrayRent.push(data);
          reset();
          setMessage('The car is available and your rent was generated correctly');
          showModal();
        }            
        console.log("findPlateNumber: ", findPlateNumber)
        console.log("CHANG ARRAY CARS ", arrayCars)
    }
    return (
        <View style={styles.container}> 
            <Controller 
                control={control}
                rules={{
                    required: true,
                    maxLength:8,
                    minLength:2,
                    pattern: /^[0-9]+$/
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                    style={{margin:20, borderRadius:20}}
                    placeholder="1234567890"
                    label="Numero de Renta"
                    mode='outlined'
                    left={<TextInput.Icon icon="counter"/>}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                    )}
                    name="rentNumber"
            />
                {errors.rentNumber?.type == 'required' && <Text style={{color:'red'}}>Numero de renta es requerido.</Text>}
                {errors.rentNumber?.type == 'maxLength' && <Text style={{color:'red'}}>Numero de renta max 8 caracteres.</Text>}
                {errors.rentNumber?.type == 'minLength' && <Text style={{color:'red'}}>Numero de renta min 3 caracteres.</Text>}
                {errors.rentNumber?.type == 'pattern' && <Text style={{color:'red'}}>Solo numeros.</Text>}

            <Controller 
                control={control}
                rules={{
                    required: true,
                    maxLength:10,
                    minLength:2,
                    pattern:/^[a-zA-Z0-9]+$/
                 }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={{margin:20, borderRadius:10}}
                        placeholder="Escriba su numero de usuario"
                        label="Nombre de usuario"
                        mode='outlined'
                        left={<TextInput.Icon icon="clipboard-account"/>}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                  name="nameUser"
            />
                {errors.nameUser?.type == 'required' && <Text style={{color:'red'}}>Nombre de usuario es requerido.</Text>}
                {errors.nameUser?.type == 'maxLength' && <Text style={{color:'red'}}>Nombre de usuario max 10 characteres.</Text>}
                {errors.nameUser?.type == 'minLength' && <Text style={{color:'red'}}>Nombre de usuario max 3 caracteres.</Text>}
                {errors.nameUser?.type == 'pattern' && <Text style={{color:'red'}}>Solo letras y numeros.</Text>}


        <Controller 
            control={control}
            rules={{
                required: true,
                maxLength:8,
                minLength:2,
                pattern: /^[A-Za-z]{3}[0-9]{3}$/
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{margin:20, borderRadius:20}}
                  placeholder="(Formato AAA123)"
                  label="Numero de placa"
                  mode='outlined'
                  left={<TextInput.Icon icon="counter"/>}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                  />
                )}
                name="plateNumber"
        />
            {errors.plateNumber?.type == 'required' && <Text style={{color:'red'}}>Numero de placa es requerido.</Text>}
            {errors.plateNumber?.type == 'maxLength' && <Text style={{color:'red'}}>Numero de placa mas de 6 caracteres.</Text>}
            {errors.plateNumber?.type == 'minLength' && <Text style={{color:'red'}}>Numero de placa menos de 6 caracters.</Text>}
            {errors.plateNumber?.type == 'pattern' && <Text style={{color:'red'}}>Formato de numero de placa no es correcto.</Text>}

        <Controller
              control={control}
              rules={{
                required: true,
                pattern:/^\d{4}-\d{2}-\d{2}$/
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={{margin:20, borderRadius:20}}
                    label="Fecha de renta"
                    placeholder='ejemplo(2000-02-15)'
                    mode='outlined'
                    left={<TextInput.Icon icon="format-letter-spacing"/>}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                />
              )}
              name="rentDate"
          />
          {errors.rentDate?.type == 'required' && <Text style={{color:'red'}}>Fecha de renta es requerido.</Text>}
          {errors.rentDate?.type == 'pattern' && <Text style={{color:'red'}}>Formato invalido.</Text>}
        
        <Button style={{marginBottom:20}} icon="check" mode="contained" onPress={handleSubmit(onsubmit)}>Guardar</Button>
        <Button style={{marginBottom:20}} icon="backspace-reverse" mode="contained" onPress={clearFields}>Limpiar Campos</Button>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}>
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
