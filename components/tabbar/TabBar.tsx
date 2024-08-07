import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TabBarButton from './TabBarButton';

export function TabBar({ state, descriptors, navigation }: any) {
  
  return (
    <View style={styles.tabbar }>
      {state.routes.map((route:any, index:number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          // <Text key={index}>sdasd</Text>
          <TabBarButton key={index} isFocused={isFocused} onPress={onPress} onLongPress={onLongPress} label={label} />
        );
      })}
    </View>
  );
}



export const styles = StyleSheet.create({
  tabbar: {
    flex:1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    marginHorizontal: "10%",
    justifyContent: "space-between",
    backgroundColor:"#fff",
    width:"80%",
    paddingVertical:15,
    borderRadius:35,
    shadowColor:Colors.primary,
    shadowOffset: {width:0,height:10},
    shadowRadius:10,
    shadowOpacity:0.1
  },
  tabitem:{
    flex:1,
    flexDirection:"column",
    alignItems:"center",
  }
})