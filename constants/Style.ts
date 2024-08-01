import { StyleSheet} from 'react-native'
import { FONT } from './Font';
import { Colors } from './Colors';

export const STYLE_GLOBAL = StyleSheet.create({ 
    button: {
        padding: 15,
        backgroundColor: Colors.primary,
        borderRadius: 99,
        margin:8
    },
    btext: {
        fontSize: 15,
        fontFamily: FONT.BOLD,
        textAlign: "center",
        color:Colors.white
    },
    headerText:{
        fontSize:25,
        fontFamily:FONT.BOLD
    }
});