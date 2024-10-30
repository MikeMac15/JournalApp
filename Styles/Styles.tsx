
import { StyleSheet } from "react-native";
export const mainGradient = ['#d9bbb0','#F7E7CE','#d9bbb0']
export const secondaryGradient = ['#DDD','white','#DDD']

export const styles = StyleSheet.create({
    container:{
        backgroundColor: '#dbd1ed',
        height:'100%',
    },
    newEntryButton:{
        flexDirection:'row',
        backgroundColor:"#fac8d4",
        width:'100%',
        height:50,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        borderTopColor:'rgba(200,200,200,0.5)',
        borderLeftColor:'rgba(200,200,200,0.5)',
        borderBottomColor:'rgba(150,150,150,0.5)',
        borderRightColor:'rgba(150,150,150,0.5)',
    },
    signOutButton: {
      alignSelf: "flex-end",
    },
    seperator:{
        height:1,
        backgroundColor:'#aaa',
        margin:10
    }
  });
export const extraStyles = StyleSheet.create({
    shadow:{
        shadowOffset:{width:4,height:4},
        shadowColor:'#111',
        shadowRadius:3,
        shadowOpacity:0.3,
        elevation: 5,
    },
    pinkShadow:{
        shadowOffset:{width:4,height:4},
        shadowColor:"#fac8d4",
        shadowRadius:5,
        shadowOpacity:0.7,
        elevation: 5,
    },
    image: {
        width: 60,
        height: 100,
        margin: 0,
        borderRadius: 8,
        // borderColor:'white',
        // borderWidth:3
      },
  });



export const textStyles = StyleSheet.create({
    h1:{
        fontSize: 30,
        color:'#6e3d0f'
    },
    h2: {
        fontSize:24,
        color:'#6e3d0f'
    },
    h3:{
        fontSize:20,
        color:'#6e3d0f'
    },
    h4: {
        fontSize: 18,
        color:'#6e3d0f'
    }
})
  
export const recentsPage = StyleSheet.create({
    title: {
        fontSize:20,
    },
    box: {
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10,
        width:60,
        height:100,
        borderWidth:2,
        borderRadius:8,
        borderColor:'whitesmoke'
    },
    row: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-evenly',
    },
    full: {
        flexDirection:'column',

    },
    emptyBox:{
        backgroundColor:"white",
        width:'100%',
        height:'100%',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    }
    
});