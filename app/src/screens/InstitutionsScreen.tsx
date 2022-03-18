import { StyleSheet, Image } from "react-native";
import { useGetInstitutionsQuery } from "../services/yapily";
import { SafeAreaView } from "react-native-safe-area-context";
import { Layout, Text, Input, Button, Icon, Card } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { setSelectedInstitution } from "../slices/selectedInstitutionSlice";
import { useAppDispatch } from "../hooks/rtk";

export type Nav = {
  navigate: (value: string) => void;
};

export default function InstitutionsScreen(): JSX.Element {
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
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
                <TouchableOpacity
                  style={styles.institution}
                  key={institution.id}
                  onPress={async () => {
                    await dispatch(
                      setSelectedInstitution({
                        id: institution.id,
                        name: institution.name,
                      })
                    );
                    navigation.navigate("ConsentScreen");
                  }}
                >
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: institution.media[1].source,
                    }}
                  />
                  <Text style={styles.text}>{institution.name}</Text>
                </TouchableOpacity>
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
    marginTop: 20,
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
    backgroundColor: "#263859",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  text: {
    marginVertical: 10,
  },
});
