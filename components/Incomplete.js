import { StyleSheet, Text, View, FlatList,useColorScheme } from 'react-native'
// import React, { useContext } from 'react'
import { useMyContext } from './WholeContext'

const IncompleteFun = () => {
  const {
    Incomplete
  } = useMyContext()
  
  const colorTheme = useColorScheme();
  return (

    <View  style={[styles.Container,  {backgroundColor:colorTheme === 'dark' ? 'black' : 'white'}]}>
      {/* Main Heading */}
      <View style={{ marginVertical: 5, }}>
        <Text style={{  color:colorTheme === 'light' ? 'black' : 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>Your In-Complete Todos</Text>
      </View>

      {/* Flatlist  */}
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <FlatList
          data={Incomplete}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.Taskcontainer}>
              <View style={styles.Taskitem}>
                <Text style={{
                   color:colorTheme === 'light' ? 'black' : 'white',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>{item.text}
                </Text>
                <Text style={{ color:colorTheme === 'light' ? 'black' : 'white',}}>
                  {item.currentdate}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      {/* Flatlist View Container ends here  */}
    </View>
  )
}
export default IncompleteFun

const styles = StyleSheet.create({
  Container: {
    flex: 1,
   
  },
  Taskcontainer: {
    flexDirection: "row",
  },

  Taskitem: {
    borderWidth: 2,
    borderColor: 'wheat',
    borderRadius: 10,
    fontWeight: 'bold',
    width: "95%",
    fontSize: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    height: 'auto'
  },

})