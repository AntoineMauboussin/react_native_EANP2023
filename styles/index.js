import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    safe: {
      marginTop: 40
    },
    projects: {
      paddingTop: 10,
      flexDirection: 'column',
    },
    project: {
      margin: 10,
      padding: 15,
      backgroundColor: "#fff",
    },
    column: {
      margin: 10,
      padding: 15,
      backgroundColor: "#fff",
    },
    task: {
      margin: 10,
      padding: 15,
      backgroundColor: "#142660",
    },
    taskView: {
      padding: 15,
      backgroundColor: "#142660",
      height: '100%',
      textAlign: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: "#fff",
      width: '50%'
    },
    taskViewText: {
      color: "#fff",
      textAlign: 'center',
      fontSize: 30
    },
    headerLeft: {
      marginRight: 30,
      fontSize: 25,
      padding: 5,
      alignSelf: 'center',
    },
    modalView:{
      backgroundColor: '#fff',
      width: '55%',
      position: 'absolute',
      right: 10,
      top: 15,
      borderColor: '#142660',
      borderWidth: 1,
    },
    modalButton: {
      padding: 10,
    },
    modalText: {
      fontSize: 16,
      color: '#142660',
    },
    modalCenteredContainer: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(200, 200, 200, 0.5)'
    },
    modalCenteredView: {
      backgroundColor: '#fff',
      borderColor: '#142660',
      borderWidth: 1,
      alignItems: 'center',
      padding: 10,
      width: '80%',
    },
    modalInput: {
      borderColor: 'rgba(200, 200, 200, 0.5)',
      borderWidth: 1,
      margin: 10,
      padding: 10,
      fontSize: 16,
    },
    formInput: {
      borderColor: '#142660',
      borderWidth: 1,
      margin: 10,
      padding: 10,
      fontSize: 16,
      width: 200,
    },
    formButton: {
      color: '#142660',
      textAlign: 'center',
      fontSize: 20,
      marginTop: 15,
    },
    icon: {
      fontSize: 40,
    },
    iconTask: {
      fontSize: 40,
      color: '#fff'
    },
    cross: {
      position: 'absolute',
      right: 10,
      top: 5,
    },
    crossTask: {
      position: 'absolute',
      right: 10,
      top: 3,
    },
    plus: {
      position: 'absolute',
      right: 95,
      top: 6,
    },
    pencil: {
      position: 'absolute',
      right: 50,
      top: 4,
    },
    pencilTask: {
      position: 'absolute',
      right: 50,
      top: 2,
    },
    imageTask: {
      position: 'absolute',
      right: 100,
      top: 4,
    },
    projectView:{
      overflow: 'scroll'
    },
    columnText:{
      fontSize: 15,
      width: '75%',
      marginBottom: 10
    },
    bigPlus:{
      marginTop: 20,
      fontSize: 100,
      alignSelf: 'center'
    },
    form:{
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    image: {
      width: 200,
      height: 200,
      marginTop: 30,
      alignSelf: 'center'
    }
});