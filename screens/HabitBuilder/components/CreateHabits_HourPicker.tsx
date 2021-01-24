import { Button, Container, Content, Text } from 'native-base';
import { Platform, StyleSheet } from 'react-native';
import React, { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import { IHabitShedule } from '../../../constants/interfaces';

interface iHabitHourPickerProps {
    selectedHabitSchedule:IHabitShedule
    onHbitHoursChanged: (hourFrom:string, hourTo:string, dow:string)=>void
}


const CreateHabit_HourPicker = (props:iHabitHourPickerProps) => {
    const date =new Date(Date.now());
    const [show, setShow] = useState(false);

    const onHourChange = (event:any, isHourFrom: boolean)=>{
        console.log(`value`, event);
    }

    return(
    <Container style={styles.container}>
        <Container>
            <Content>
                <Button onPress={()=>setShow(!show)} bordered={true}>
                    <Text>
                        Set from hour
                    </Text>
                </Button>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='time'
                    is24Hour={false}
                    display="default"
                    onChange={(event:any)=>onHourChange(event, true)}
                    />
                )}
            </Content>         
        </Container>
    </Container>
    )
}
export default CreateHabit_HourPicker;

const styles = StyleSheet.create({
    container: {
        paddingTop:24
    }
  });
  