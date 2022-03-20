import { useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { useRequestAccountAuthQuery } from "../services/yapily";
import { Layout, Text, Button, Spinner } from "@ui-kitten/components";
import { selectConsentToken } from "../slices/consentSlice";
import { useAppSelector, useAppDispatch } from "../hooks/rtk";

export default function AccountScreen(): JSX.Element {
  const consentToken = useAppSelector(selectConsentToken);
  return (
    <Layout style={styles.container}>
      <Text style={styles.text}>{consentToken}</Text>
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
