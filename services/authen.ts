import { Client, Account, ID } from 'appwrite';
import { Alert } from "react-native";
const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const account = new Account(client);

export const register = async (email: string, password: string,name:string) => {
  try {
    const response = await account.create(ID.unique(), email, password,name);
    return { success: true, data: response };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'เกิดข้อผิดพลาดขณะสมัครสมาชิก',
    };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return { success: true, data: session };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "เข้าสู่ระบบไม่สำเร็จ",
    };
  }
};

export const logout = async ()=>{
 try {
      await account.deleteSession("current");
      return {success:true}
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "เข้าสู่ระบบไม่สำเร็จ",
      };
    }
  };