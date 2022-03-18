import { StyleSheet, View, Image } from "react-native";
import { useGetInstitutionsQuery } from "../services/yapily";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, Text, Input, Button, Icon, Card } from "@ui-kitten/components";

export default function institutions() {
  const { data: institutions, error, isLoading } = useGetInstitutionsQuery();
  return (
    <Layout style={styles.container} level="1">
      <SafeAreaView style={styles.safeArea}>
        <Layout style={styles.institutionList} level="2">
          {institutions?.length
            ? institutions.map((institution: any) => {
                return (
                  <Card style={styles.institution} key={institution.id}>
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: institution.media[1].source,
                      }}
                    />
                    <Text>{institution.name}</Text>
                  </Card>
                );
              })
            : null}
        </Layout>
      </SafeAreaView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  safeArea: {
    width: "90%",
  },
  institutionList: {
    padding: 20,
    borderRadius: 10,
  },
  institution: {
    flexDirection: "column",
    justifyContent: "flex-start",
    margin: 20,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
