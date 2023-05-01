import React, { useState } from 'react';
import { StyleSheet, Text,  View, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Icon, Checkbox  } from 'react-native-paper';

export const Cars = ({navigation,route}) => {
    const [cars, setCars] = useState([])
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
          plateNumber: '',
          brand: '',
          state: ''  
        }
      });
    
    const onsubmit=(data)=>{
        console.log("data: ",data)
        let newCar ={
            plateNumber:plateNumber,
            brand:brand,
            state:state
        }
        setCars([...cars, newCar]);
        console.log("Cars", cars)
        reset()
    }
    const handlePress = () => {
        navigation.navigate('Contacts');
    };

    return (
        <View style={styles.container}> 
        <Controller 
            control={control}
            rules={{
                required: true,
                maxLength:8,
                minLength:2,
                pattern: /^[A-Z]{3}[0-9]{3}$/
            }}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{margin:20, borderRadius:10}}
                  placeholder="(format AAA123)"
                  label="plateNumber user"
                  mode='outlined'
                  left={<TextInput.Icon icon="clipboard-account"/>}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                  />
                )}
                plateNumber="plateNumber"
            />
            {errors.plateNumber?.type == 'required' && <Text style={{color:'red'}}>plateNumber is required.</Text>}
            {errors.plateNumber?.type == 'maxLength' && <Text style={{color:'red'}}>plateNumber 30 mas characters.</Text>}
            {errors.plateNumber?.type == 'minLength' && <Text style={{color:'red'}}>plateNumber 3 mas characters.</Text>}
            {errors.plateNumber?.type == 'pattern' && <Text style={{color:'red'}}>Format of plateNumber not is correct.</Text>}

        <Controller
              control={control}
              rules={{
                required: true,
                pattern:/^([A-Z]|[a-z]){1,}\s?([A-Z]|[a-z]){0,}$/g
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    style={{margin:20, borderRadius:10}}
                    label="E-mail"
                    placeholder=' "Ford", "Volkswagen", "Land Rover", "Alfa Romeo", "Mercedes-Benz"'
                    mode='outlined'
                    left={<TextInput.Icon icon="brand-box"/>}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                />
              )}
              plateNumber="brand"
          />
          {errors.brand?.type == 'required' && <Text style={{color:'red'}}>Brand is required.</Text>}
          {errors.brand?.type == 'maxLength' && <Text style={{color:'red'}}>Brand 30 mas characters.</Text>}
          {errors.brand?.type == 'minLength' && <Text style={{color:'red'}}>Brand 3 mas characters.</Text>}
          {errors.brand?.type == 'pattern' && <Text style={{color:'red'}}>Brand is invalid.</Text>}

        <Controller
            control={control}
            name="isChecked"
            defaultValue={false}
            render={({ field: { onChange, value } }) => (
                <Checkbox
                    value={value}
                    onValueChange={(newValue) => onChange(newValue)}
                />
            )}
        />
        <Button icon="login" mode="contained" onPress={handleSubmit(onsubmit)}>Save car</Button>
        <TouchableOpacity onPress={handlePress}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#AF7AC5 ',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

  
  
  
  
  
  
  