import { StyleSheet, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InstitutionsScreen from "./src/screens/InstitutionsScreen";
import ConsentScreen from "./src/screens/ConsentScreen";

export type RootStackParamList = {
  InstitutionsScreen: undefined;
  ConsentScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="InstitutionsScreen"
              component={InstitutionsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ConsentScreen"
              component={ConsentScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
