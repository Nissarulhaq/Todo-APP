import { StyleSheet, Text, View ,Switch,useColorScheme} from 'react-native'
import React,{useState} from 'react'

const DarkModeSwitch = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const colorTheme = useColorScheme();
  return (
    <View style={styles.container}>
    <Switch
      trackColor={{false: '#767577', true: '#81b0ff'}}
      thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  </View>
  )
}

export default DarkModeSwitch

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  });