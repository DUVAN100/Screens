import {useState} from 'react';
import { StyleSheet, View, Modal, TouchableHighlight, ScrollView } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Text, Checkbox  } from 'react-native-paper';

export const Cars = ({route}) => {
  let arrayCars = route.params[0];

  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      plateNumber: '',
      brand: '',
    }
  });

  const showModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }

  const onsubmit=(data)=>{
    let findCar = arrayCars.find(car => car.plateNumber === data.plateNumber)
    if (findCar === undefined){
      setMessage('Carro registrado');
      showModal();
      arrayCars.push(data);
      reset(); 
    }else{
      setMessage('User exist, try again');
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
            maxLength:6,
            minLength:6,
            pattern: /^[A-Za-z]{3}[0-9]{3}$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{margin:20, borderRadius:20}}
              placeholder="(formato AAA123 - aaa123)"
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
          maxLength:30,
          minLength:3,
          pattern:/^([A-Z]|[a-z]){1,}\s?([A-Z]|[a-z]){0,}$/g
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{margin:20, borderRadius:20}}
            label="Marca"
            placeholder='ejemplo:"Chevrolet"'
            mode='outlined'
            left={<TextInput.Icon icon="format-letter-spacing"/>}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="brand"
      />
      {errors.brand?.type == 'required' && <Text style={{color:'red'}}>Marca es requerido.</Text>}
      {errors.brand?.type == 'maxLength' && <Text style={{color:'red'}}>Marca tiene mas de 30 caracteres.</Text>}
      {errors.brand?.type == 'minLength' && <Text style={{color:'red'}}>Marca tiene menos de 3 caracteres.</Text>}
      {errors.brand?.type == 'pattern' && <Text style={{color:'red'}}>Marca no es valida.</Text>}
          
      <Controller
        control={control}
        name="isChecked"
        defaultValue={false}
        render={({ field: { onChange, value } }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', margin:10 }}>
                <Checkbox
                    status={value ? 'checked' : 'unchecked'}
                    onPress={() => onChange(!value)}
                />
                <Text>Disponible</Text>
            </View>
        )}
      />
      <Button style={{marginBottom:20}} icon="login" mode="contained" onPress={handleSubmit(onsubmit)}>Guardar</Button>
      <Text style={{marginBottom:20, fontSize:15, fontFamily:'Roboto' }}>Carros registrado:</Text>
      <Text>---------------------------------------------------------------</Text>
      <ScrollView contentContainerStyle={{padding:30}}>
        {arrayCars.map((car, index) => (
        <View key={index}>
          <Text style={{marginBottom:20, marginTop:10,   fontSize:20, fontFamily:'Roboto' }}>Numero de placa:  {car.plateNumber}</Text>
          <Text style={{marginBottom:20, fontSize:20, fontFamily:'Roboto' }}>Marca:        {car.brand}</Text>
          <Text style={{marginBottom:20, fontSize:20, fontFamily:'Roboto' }}>Disponible:         {car.isChecked ? 'Si' : 'No'}</Text>
          <Text>----------------------------------------------</Text>
        </View>
        ))}
      </ScrollView>
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
      backgroundColor: 'rgb(232 226 235)',
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

  
  
  
  
  
  
  
