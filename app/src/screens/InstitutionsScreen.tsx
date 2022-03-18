import { StyleSheet, View, Image } from "react-native";
import { useGetInstitutionsQuery } from "../services/yapily";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, Text, Input, Button, Icon, Card } from "@ui-kitten/components";

export default function InstitutionsScreen() {
  const { data: institutions, error, isLoading } = useGetInstitutionsQuery();
  return (
    <Layout style={styles.container}>
      <Text style={styles.text} category="h5">
        Connect Bank Account
      </Text>
      <Layout style={styles.institutionList}>
        {institutions?.length
          ? institutions.map((institution: any) => {
              return (
                <Layout
                  style={styles.institution}
                  key={institution.id}
                  level="3"
                >
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: institution.media[1].source,
                    }}
                  />
                  <Text style={styles.text}>{institution.name}</Text>
                </Layout>
              );
            })
          : null}
      </Layout>
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
  institutionList: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
  institution: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  text: {
    marginVertical: 10,
  },
});
