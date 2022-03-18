import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "expo-constants";
import { encode } from "js-base64";

const yapilyBaseUrl: string | undefined =
  Constants?.manifest?.extra?.yapilyBaseUrl;
const yapilyAppKey: string | undefined =
  Constants?.manifest?.extra?.yapilyAppKey;
const yapilyAppSecret: string | undefined =
  Constants?.manifest?.extra?.yapilyAppSecret;
const yapilyAppToken: string = encode(`${yapilyAppKey}:${yapilyAppSecret}`);

export const yapilyApi = createApi({
  reducerPath: "yapilyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: yapilyBaseUrl,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json;charset=UTF-8");
      headers.set("Authorization", `Basic ${yapilyAppToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getInstitutions: builder.query<any, void>({
      query: () => `/institutions`,
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetInstitutionsQuery } = yapilyApi;
