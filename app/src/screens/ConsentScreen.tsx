import { StyleSheet, Linking, View, Image } from "react-native";
import { useRequestAccountAuthQuery } from "../services/yapily";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, Text, Button, Spinner } from "@ui-kitten/components";
import { selectSelectedInstitution } from "../slices/selectedInstitutionSlice";
import { useAppSelector } from "../hooks/rtk";

export type RequestAccountAuthBody = {
  applicationUserId: string;
  institutionId: string;
  callback: string;
};

export default function ConsentScreen(): JSX.Element {
  const selectedInstitution = useAppSelector(selectSelectedInstitution);
  const body: RequestAccountAuthBody = {
    applicationUserId: "account-data-and-transactions-demo",
    institutionId: selectedInstitution.id,
    callback: "https://display-parameters.com/",
  };
  const { data, isLoading, error } = useRequestAccountAuthQuery(body);

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
              Linking.openURL(data.data.authorisationUrl);
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
