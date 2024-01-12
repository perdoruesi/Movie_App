import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../theme/theme';


const TicketScreen = () => {
  return (
    <View style={styles.container}>
      <Text style = {{color :COLORS.Black}}>TicketScreen</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {}
});

export default TicketScreen;