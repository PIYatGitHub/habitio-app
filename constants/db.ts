import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';

const storage = new Storage({
  size: 2000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
 
// if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  }
});
 
storage.save({
    key:'users',
    data: [
        {
            "firstName": "Nacho",
            "lastName": "Tsvetkov",
            "email": "nacho@ntpy.com",
            "password": "strong",
            "preferredTags": [1, 3, 5, 6]
        }        
    ]
})

export default storage;