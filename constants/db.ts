import AsyncStorage from '@react-native-community/async-storage';
import { ScheduleTypes } from './interfaces';
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
            "firstName": "Test",
            "lastName": "User",
            "email": "test@ntpy.com",
            "password": "test",
            "preferredTags": [1, 2, 5, 6, 10],
            "habits": [{
              habitId: 1,
              title: 'Runing',
              goals:['Be healthy', 'Buns of Steel', 'Feeling great about myself'],
              habitScheduleType:ScheduleTypes.fixed,
              habitSchedule:[{
                  day:0, fromHour:'10:00 am',toHour:'11:00 am'
              }]
          },
          {
              habitId: 2,
              title: 'Read one book a month',
              goals:['Keep up with lexie', 'Big brain move', 'Getting ahead of the crowd', 'Books are the best!'],
              habitScheduleType:ScheduleTypes.fluid,
              habitSchedule:[{
                  day:0, fromHour:'10:00 pm',toHour:'11:30 pm'
              }]
          }
          ]
        }        
    ]
})

export default storage;