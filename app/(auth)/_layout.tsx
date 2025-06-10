import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Client, Account } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
const account = new Account(client);

export default function AuthLayout() {
  const router = useRouter();
  useEffect(() => {
    async function checkSession() {
      try {
        await account.get();
        router.replace('/(tabs)/saved');
      } catch (error) {
      }
    }
    checkSession();
  }, []);
  return <Stack screenOptions={{ headerShown: false }} />;
}
