import { StyleSheet } from "react-native";
import { useGetAccountInformationQuery } from "../services/yapily";
import { Layout, Text, Spinner } from "@ui-kitten/components";
import { selectConsentToken } from "../slices/consentSlice";
import { useAppSelector } from "../hooks/rtk";

export default function AccountScreen(): JSX.Element {
  const consentToken = useAppSelector(selectConsentToken);
  const {
    data: accountDetails,
    isLoading: isAccountDetailsLoading,
    error: accountDetailsError,
  } = useGetAccountInformationQuery(consentToken);

  return (
    <Layout style={styles.container}>
      {!isAccountDetailsLoading && accountDetails ? (
        <>
          <Text style={styles.text}>
            {accountDetails[0].accountNames[0].name}
          </Text>
          <Text
            style={styles.text}
          >{`Balance: ${accountDetails[0].currency} ${accountDetails[0].balance}`}</Text>
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
});
