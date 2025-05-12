import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ToastAndroid } from 'react-native';
import storage from '@react-native-firebase/storage';
import OpenAI from "openai";


const server = 'https://dev.dotnetiks.com/mindGuard/webServices'
// const API_KEY = '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';  // Replace with your actual API key

//Chat GPT 4 paid account
const API_KEY = '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';

const openai = new OpenAI({
  apiKey: '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'  // Replace with your actual OpenAI API key
});

export const showToastWithGravity = (title:any) => {
    ToastAndroid.showWithGravityAndOffset(
      title,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

export const registerUser = async (name:any, password:any, email:any, contact:any, profilePicture:any, deviceToken:any) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("profilePicture =>", profilePicture);
        const userRegisterAPI = server + '/userRegister.php?name=' + name + '&password=' + password + '&email=' + email + '&contact=' + contact + '&profilePicture=' + profilePicture + '&deviceToken=' + null;
          let eventData:any = '';
          const url = userRegisterAPI;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        console.log('API Response', APIData.data);
        if(APIData.data.Status === 'failed'){
          showToastWithGravity('User Registeration Failed, Please Try Again Later');
          reject('failed')
        } else if(APIData.data.Status === 'exist'){ 
          showToastWithGravity('User Already Registered !');
          reject('exist')
        } else {
          showToastWithGravity('Registeration Successfull ! Login to Continue');
          resolve(APIData.data);
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
    };

    export const loginUser = async(email:any, password:any) => {
    return new Promise(async (resolve, reject) => {
    try {
      console.log("loginUser got hit =>");
      const userLoginApi = server + '/userLogin.php?email=' + email + '&password=' + password;
        let eventData:any = '';
        const url = userLoginApi;
        const headers = {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Max-Age': '0',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Authorization',
        };
        const APIData = await axios.post(
          url,
          {
            ...eventData,
          },
          {
            headers: headers,
          },
        );
      console.log('API Response login', APIData.data);
      //returning user data to reducer
      if(APIData.data.Status === 'failed'){
        showToastWithGravity('Login Failed, Please Try Again Later');
        reject('failed')
      } else {
        resolve(APIData.data);
        await AsyncStorage.setItem('userData', JSON.stringify(APIData.data));
        showToastWithGravity('Login Successfull !');
      }
    } catch (error) {
      console.error('Error:', error);
      reject(error)
    }
  });
  };


export const checkUser = async(email:any, password:any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userLoginApi = server + '/userLogin.php?email=' + email + '&password=' + password;
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        if(APIData.data.Status === 'failed'){
          showToastWithGravity('Login Failed, Please Try Again Later');
          reject('failed')
        } else {
          showToastWithGravity('Login Successfull !');
          resolve(APIData);
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    });
    };


  export const fetchData = () => {
    return new Promise(async (resolve,reject) => {
      try {
        const userLoginApi = server + '/fetchAbout.php';
          let eventData:any = '';
          const url = userLoginApi;
          const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Max-Age': '0',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'Authorization',
          };
          const APIData = await axios.post(
            url,
            {
              ...eventData,
            },
            {
              headers: headers,
            },
          );
        if(APIData.data.Status === 'failed'){
          reject('failed')
        } else {
          resolve(APIData.data);
        }
      } catch (error) {
        console.error('Error:', error);
        reject(error)
      }
    })
  }

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
//   export const fetchChatGPTResponse = async (inputMessage: string) => {
//     let attempts = 3;         // Number of retry attempts
//     let retryAfter = 2000;    // Initial retry delay set to 2 seconds

//     while (attempts > 0) {
//         try {
//             const completion:any = await openai.chat.completions.create({
//                 model: "gpt-4", // Switch model here as needed
//                 messages: [
//                     { role: "system", content: "You are a helpful assistant." },
//                     { role: "user", content: inputMessage }
//                 ],
//             });

//             // Check if there's a valid response
//             if (completion.choices && completion.choices.length > 0) {
//                 return completion.choices[0].message.content.trim();
//             } else {
//                 throw new Error('No response from ChatGPT');
//             }
//         } catch (error: any) {
//             if (error.response && error.response.status === 429) {
//                 console.log(`Rate limit exceeded, retrying after ${retryAfter / 1000} seconds...`);
//                 await delay(retryAfter);  // Wait before retrying
//                 retryAfter *= 2;  // Exponentially increase the delay
//                 attempts--;
//             } else {
//                 console.error('Error fetching ChatGPT response:', error);
//                 throw error;
//             }
//         }
//     }

//     throw new Error('Failed to fetch response after several attempts');
// }

export const fetchChatGPTResponse = async (inputMessage: string) => {
  let attempts = 3;
  let retryAfter = 2000;

  while (attempts > 0) {
    try {
      const url = 'https://api.openai.com/v1/chat/completions';
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      };
      const body = {
        model: "gpt-4", // Adjust the model as needed
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: inputMessage }
        ],
        max_tokens: 150,
        temperature: 0.7,
      };

      const response = await axios.post(url, body, { headers });
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content.trim();
      } else {
        throw new Error('No response from ChatGPT');
      }
    } catch (error: any) {
      if (error.response && error.response.status === 429) {
        console.log(`Rate limit exceeded, retrying after ${retryAfter / 1000} seconds...`);
        await delay(retryAfter);
        retryAfter *= 2;
        attempts--;
      } else {
        console.error('Error fetching ChatGPT response:', error);
        throw error;
      }
    }
  }

  throw new Error('Failed to fetch response after several attempts');
}

  export const imageUpload = async (uri: any, folderName: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('imageUplaod folderName =>', folderName);
        console.log('imageUplaod uri =>', uri);
        const uploadUri = uri;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        const timestamp = new Date().getTime();
        const name = filename.split('.').slice(0, -1).join('.');
        const extension = filename.split('.').pop();
        filename = `${name}_${timestamp}.${extension}`;
        const storageRef = storage().ref(`${folderName}/${filename}`);
        const task = storageRef.putFile(uploadUri);
        task.on('state_changed', (taskSnapshot: any) => {
          console.log(
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
        });
        await task;
        const url = await storageRef.getDownloadURL();
        console.log('Image uploaded to Firebase Storage:', url);
        resolve(url);
      } catch (error) {
        console.error('Error:', error);
        reject(error);
      }
    });
  };