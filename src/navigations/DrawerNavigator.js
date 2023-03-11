import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import { useAuth } from "../context/AuthContext";
import FavoriteScreen from "../screens/FavoriteScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    const { Logout } = useAuth();
    return (
        <Drawer.Navigator
            drawerContent={(props) => (
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                        label="Sign out"
                        onPress={async () => await Logout()}
                    />
                </DrawerContentScrollView>
            )}
        >
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: "",
                    headerTransparent: true,
                    headerTintColor: "black"
                }}
            />
            <Drawer.Screen
              name="Favorites"
              component={FavoriteScreen}
            />

        </Drawer.Navigator>
    )
}