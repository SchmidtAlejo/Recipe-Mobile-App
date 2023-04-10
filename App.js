import "react-native-gesture-handler";
import MainNavigator from "./src/navigations/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider} from './src/context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
