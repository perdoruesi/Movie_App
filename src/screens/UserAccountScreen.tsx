import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { COLORS } from '../theme/theme';



const UserAccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text style = {{color :COLORS.Black}}>UserAccountScreen</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {}
});

export default UserAccountScreen;