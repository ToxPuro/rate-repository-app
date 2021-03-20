import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    // Get the access token for the storage
    const rawToken = await AsyncStorage.getItem(
      `${this.namespace}:accesstoken`
    );
    const result = rawToken ? JSON.parse(rawToken) : {};
    console.log(result);
    return result;
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(
      `${this.namespace}:accesstoken`,
      JSON.stringify(accessToken)
    );
  }

  async removeAccessToken() {
    // Remove the access token from the storage
    await AsyncStorage.removeItem(`${this.namespace}:accesstoken`)
  }
}

export default AuthStorage;