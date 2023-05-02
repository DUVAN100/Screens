import React, { useState } from 'react';
import { StyleSheet,  View } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Text, Icon, Checkbox  } from 'react-native-paper';

export const Cars = ({navigation,route}) => {
    let arrayCars = route.params[0];
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
          plateNumber: '',
          brand: '',
        }
      });
    
      const onsubmit=(data)=>{
        arrayCars.push(data);
        reset();   
    }
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
                  style={{margin:20, borderRadius:20}}
                  placeholder="(format AAA123)"
                  label="plateNumber"
                  mode='outlined'
                  left={<TextInput.Icon icon="counter"/>}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                  />
                )}
                name="plateNumber"
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
                    style={{margin:20, borderRadius:20}}
                    label="Brand"
                    placeholder=' "Ford", "Volkswagen", "Land Rover", "Alfa Romeo", "Mercedes-Benz"'
                    mode='outlined'
                    left={<TextInput.Icon icon="format-letter-spacing"/>}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                />
              )}
              name="brand"
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
                <View style={{ flexDirection: 'row', alignItems: 'center', margin:10 }}>
                    <Checkbox
                        status={value ? 'checked' : 'unchecked'}
                        onPress={() => onChange(!value)}
                    />
                    <Text>sold</Text>
                </View>
            )}
        />
        


        <Button style={{marginBottom:20}} icon="login" mode="contained" onPress={handleSubmit(onsubmit)}>Save car</Button>
        <Text>--------------------------------------------------------------------------------------------------------</Text>
        <Text style={{marginBottom:20, fontSize:30, fontFamily:'Roboto' }}>Registrad car:</Text>
        {arrayCars.map((car, index) => (
          <View key={index}>
            {console.log("CAR  ",car)}
            <Text style={{marginBottom:20, fontSize:20, fontFamily:'Roboto' }}>PlateNumber:  {car.plateNumber}</Text>
            <Text style={{marginBottom:20, fontSize:20, fontFamily:'Roboto' }}>Brand:        {car.brand}</Text>
            <Text style={{marginBottom:20, fontSize:20, fontFamily:'Roboto' }}>Sold:         {car.isChecked ? 'Sold' : 'Unsold'}</Text>
            <Text>----------------------------------------------</Text>
          </View>
        ))}


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

  
  
  
  
  
  
  