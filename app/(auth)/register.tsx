import React, { useState } from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { register } from '@/services/authen';

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username,setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [incorrect, setIncorrect] = useState({username:'', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    let valid = true;
    let errors = {username:'', email: '', password: '', confirmPassword: '' };

    if (username.length<2) {
      errors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
      valid = false;
    }

    if (!email.includes('@')) {
      errors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
      valid = false;
    }

    if (password.length < 6) {
      errors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
      valid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
      valid = false;
    }

    setIncorrect(errors);
    return valid;
  };

const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    try {
        const { success, error } = await register(email, password,username);
        if (!success) throw new Error(error);
        router.replace('/login');
    } catch (e: any) {
        console.log(e.message);
        setError(e.message || 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
    } finally {
        setLoading(false);
    }
};

  return (
    <View className="flex-1 bg-primary">
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      <Image source={images.bg} className="absolute w-full z-0" />
      <Image source={icons.logo} className="w-16 h-auto mt-28 mb-1 mx-auto" />

      {loading ? (
        <ActivityIndicator size="large" color="#0000FF" className="mt-10 self-center" />
      ) : (
        <View className="flex-1 py-12 px-8">
          <Text className="text-2xl font-bold text-center mb-4 mt-2 text-white">สมัครสมาชิก</Text>
          
          <View className="flex flex-col">

            <Text className="text-white mt-4">Name</Text>
                <TextInput
                  value={username}
                  onChangeText={(text) => {
                    setUsername(text);
                    setIncorrect(prev => ({ ...prev, username: '' }));
                }}
                className="text-white bg-dark-100 rounded-lg py-3 px-2 pl-4"
            />
            {incorrect.username !== '' && <Text className="text-red-500 text-xs pt-1">{incorrect.username}</Text>}

            <Text className="text-white mt-4">Email</Text>
            <TextInput
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setIncorrect(prev => ({ ...prev, email: '' }));
              }}
              className="text-white bg-dark-100 rounded-lg py-3 px-2 pl-4"
            />
            {incorrect.email !== '' && <Text className="text-red-500 text-xs pt-1">{incorrect.email}</Text>}

            <Text className="text-white mt-4">Password</Text>
            <TextInput
              value={password}
              secureTextEntry
              onChangeText={(text) => {
                setPassword(text);
                setIncorrect(prev => ({ ...prev, password: '' }));
              }}
              className="text-white bg-dark-100 rounded-lg py-3 px-2 pl-4"
            />
            {incorrect.password !== '' && <Text className="text-red-500 text-xs pt-1">{incorrect.password}</Text>}

            <Text className="text-white mt-4">Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              secureTextEntry
              onChangeText={(text) => {
                setConfirmPassword(text);
                setIncorrect(prev => ({ ...prev, confirmPassword: '' }));
              }}
              className="text-white bg-dark-100 rounded-lg py-3 px-2"
            />
            {incorrect.confirmPassword !== '' && (
              <Text className="text-red-500 text-xs pt-1">{incorrect.confirmPassword}</Text>
            )}
          </View>

          <TouchableOpacity className="bg-light-200 mt-6 py-4 rounded-2xl" onPress={handleRegister}>
            <Text className="text-dark-200 font-semibold text-base text-center">Register</Text>
          </TouchableOpacity>

          {error && <Text className="text-red-500 text-sm pt-4 text-center">{error}</Text>}

          <Text className="text-white text-center text-md mt-4">
            มีบัญชีอยู่แล้วใช่ไหม?
            <Text
              onPress={() => router.push('/login')}
              style={{ color: '#1e90ff', fontWeight: 'bold' }}
            >
              {' '}เข้าสู่ระบบ
            </Text>
          </Text>
        </View>
      )}
    </View>
  );
}
