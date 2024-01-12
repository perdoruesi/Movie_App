import React from  "react";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import TicketScreen from "../screens/TicketScreen";
import UserAccountScreen from "../screens/UserAccountScreen";
import { COLORS, FONTSIZE, SPACING} from "../theme/theme";
import CustomIcon from "../components/CustomIcon";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
return(

    <Tab.Navigator 
    screenOptions={{ 
        tabBarHideOnKeyboard: true,
        headerShown: false,  //heq headerin e tabit qe dilte lart
        tabBarStyle : {
            backgroundColor: COLORS.Black,   //ngjyra e bottom tab
            borderTopWidth : 0,
            height: SPACING.space_10*7,    
        },
    }}>

    <Tab.Screen 
    name="Home" 
    component={HomeScreen} 
    options={{
        tabBarShowLabel:false, //heq shkrimin posht icons
        tabBarIcon: ({focused, color, size}) => {
            return <View style ={[
                styles.activeTabBackground, 
                focused ? {backgroundColor : COLORS.Orange} : {}
                ] }>
            <CustomIcon 
            name = 'video' 
            color={COLORS.White} 
            size={FONTSIZE.size_24}
            />
                </View>;
            
        },

    }}/>

    <Tab.Screen 
    name="Search" 
    component={SearchScreen}  
    options={{
        tabBarShowLabel: false, //heq shkrimin posht icons
        tabBarIcon: ({focused, color, size}) => {
            return <View style ={[
                styles.activeTabBackground,
                 focused ? {backgroundColor : COLORS.Orange} : {}
                 ] }>
            <CustomIcon 
            name = 'search' 
            color={COLORS.White} 
            size={FONTSIZE.size_24}
            />
                </View>;
            
        },

    }}/>
    <Tab.Screen 
    name="Ticket" 
    component={TicketScreen} 
    options={{
        tabBarShowLabel: false, //heq shkrimin posht icons
        tabBarIcon: ({focused, color, size}) => {
            return <View style ={[
                styles.activeTabBackground, 
                focused ? {backgroundColor : COLORS.Orange} : {}
                ] }>
            <CustomIcon 
            name = 'ticket' 
            color={COLORS.White} 
            size={FONTSIZE.size_24}
            />
                </View>;
            
        },

    }}/>

    <Tab.Screen 
    name="User" 
    component={UserAccountScreen} 
    options={{
        tabBarShowLabel: false, //heq shkrimin posht icons
        tabBarIcon: ({focused, color, size}) => {
            return <View style ={[
                styles.activeTabBackground, 
                focused ? {backgroundColor : COLORS.Orange} :{} 
                ] }>
            <CustomIcon 
            name = 'user' 
            color={COLORS.White} 
            size={FONTSIZE.size_24}
            />
                </View>;
            
        },

    }}/>

    </Tab.Navigator>
)

};

const styles = StyleSheet.create({
    activeTabBackground:{
        backgroundColor: COLORS.Black,
        padding: SPACING.space_18,
        borderRadius: SPACING.space_18*10,
    }

});

export default TabNavigator;