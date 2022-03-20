import { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { useRequestAccountAuthQuery } from "../services/yapily";
import { Layout, Text, Button, Spinner } from "@ui-kitten/components";
import { selectSelectedInstitution } from "../slices/selectedInstitutionSlice";
import { setConsentToken } from "../slices/consentSlice";
import { useAppSelector, useAppDispatch } from "../hooks/rtk";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

export type RequestAccountAuthBody = {
  applicationUserId: string;
  institutionId: string;
  callback: string;
};

export type Nav = {
  navigate: (value: string) => void;
};

export default function ConsentScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Nav>();
  const selectedInstitution = useAppSelector(selectSelectedInstitution);
  const body: RequestAccountAuthBody = {
    applicationUserId: "account-data-and-transactions-demo",
    institutionId: selectedInstitution.id,
    callback: Linking.createURL("/?"),
  };
  const { data, isLoading, error } = useRequestAccountAuthQuery(body);

  const [result, setResult] = useState<any>({});

  const handleRedirect = (event: Linking.EventType) => {
    if (Constants?.platform?.ios) {
      WebBrowser.dismissBrowser();
    } else {
      Linking.removeEventListener("url", handleRedirect);
    }

    let data = Linking.parse(event.url);

    setResult({ redirectData: data });
  };

  const openBrowserAsync = async (url: string) => {
    try {
      Linking.addEventListener("url", handleRedirect);
      let result = await WebBrowser.openBrowserAsync(url);

      // https://github.com/expo/expo/issues/5555
      if (Constants?.platform?.ios) {
        Linking.removeEventListener("url", handleRedirect);
      }

      setResult({ result });
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (result.redirectData && result.redirectData.queryParams.consent) {
      dispatch(setConsentToken(result.redirectData.queryParams.consent));
      navigation.navigate("AccountScreen");
    }
  }, [result]);

  return (
    <Layout style={styles.container}>
      {!isLoading && data ? (
        <>
          <Text style={styles.text} category="h5">
            {`${selectedInstitution.name} Permission`}
          </Text>
          <Text style={styles.text} category="p1">
            By clicking on 'Confirm', you're providing us with access to you
            account details and transactions. This permission will expire in 90
            days.
          </Text>
          <Button
            style={styles.confirmationButton}
            status="success"
            onPress={() => {
              openBrowserAsync(data.data.authorisationUrl);
            }}
          >
            Confirm
          </Button>
        </>
      ) : (
        <Spinner />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    marginVertical: 10,
  },
  confirmationButton: {
    margin: 20,
  },
});
