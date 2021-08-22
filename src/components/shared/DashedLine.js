
import React from 'react';
import { StyleSheet, View } from 'react-native';

export const DashedLine = ({
    styleContainer,
    styleLine
}) => {
return (
    <View style={[styles.container,(styleContainer && styleContainer)]}>
         <View style={[styles.line,(styleLine && styleLine)]} />
    </View>
);
};

const styles = StyleSheet.create({
    container : { 
        height: 0, 
        borderWidth: 1,   
        borderColor: '#555',  
        zIndex: 0,       
        marginBottom:0,        
        flexDirection: 'row',
        borderRadius:1,
    },
    line: { 
        bottom:0,
        position: 'absolute', 
        left: 0,  
        width: '100%', 
        height: 1, 
        backgroundColor: '#333', 
        zIndex: 1 
    }
});
              