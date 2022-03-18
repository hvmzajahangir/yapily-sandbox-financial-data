import { StyleSheet, View } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { Provider } from "react-redux";
import { store } from "./store";
import Institutions from "./src/screens/Institutions";

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <Institutions />
      </ApplicationProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({});
