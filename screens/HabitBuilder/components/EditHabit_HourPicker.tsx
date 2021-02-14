import { Button, Container, Content, Text, Toast } from 'native-base';
import { IHabitShedule, ScheduleTypes } from '../../../constants/interfaces';
import React, { useState } from 'react';

import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import { commonStyles } from '../../styles/commonStyles';
import { convertNumberToWeekday } from '../../../utils/convertWeekday';
import { formatAMPM } from '../../../utils/convertAMPM';

interface IHabitHourPickerProps {
    selectedHabitSchedule:IHabitShedule
    onHbitHoursChanged: (hourFrom:string, hourTo:string, dow:string)=>void
}


const EditHabit_HourPicker = (props:IHabitHourPickerProps) => {
    const [showSetHourFrom, setShowHourFrom] = useState(false);
    const [showSetHourTo, setShowHourTo] = useState(false);
    
    const onHourChange = (value:number, isHourFrom: boolean)=>{
        console.log(`value reads....`, value);
        if(value){
            const date = new Date(value); 
            const formattedHour:string = formatAMPM(date); 
            console.log(`formatted hour reads: `, formattedHour);
            setShowHourFrom(false); 
            setShowHourTo(false); 
           
            if(isHourFrom) 
                props.onHbitHoursChanged(formattedHour, props.selectedHabitSchedule.toHour, convertNumberToWeekday(props.selectedHabitSchedule.day))
            else
                props.onHbitHoursChanged(props.selectedHabitSchedule.fromHour, formattedHour, convertNumberToWeekday(props.selectedHabitSchedule.day))
        }
    }

    const setFromDatePicker = ()=> {
        const date =new Date(Date.now()); 
        if(props.selectedHabitSchedule.fromHour !=='') {
            const split = props.selectedHabitSchedule.fromHour.split(' '); 
            const hours = split[0].split(':').map(Number); 
            if(split[1] === 'pm') {
                hours[0] = Number(hours[0]) + 12; 
            }
            date.setHours(hours[0], hours[1]); 
        }
        console.log(`about to set this`, date);
        
        return date;
    }

    const setToDatePicker = ()=> {
        const date =new Date(Date.now()); 
        if(props.selectedHabitSchedule.fromHour && !props.selectedHabitSchedule.toHour) {
            return setFromDatePicker(); 
        }
        if(props.selectedHabitSchedule.toHour !=='') {
            const split = props.selectedHabitSchedule.toHour.split(' '); 
            const hours = split[0].split(':').map(Number); 
            if(split[1] === 'pm') {
                hours[0] = Number(hours[0]) + 12; 
            }
            date.setHours(hours[0], hours[1]); 
        }
        console.log(`about to set this`, date);
        
        return date;
    }

    return(
        <Container style={styles.container}>
            <Content>
            <Button onPress={()=>setShowHourFrom(!showSetHourFrom)} transparent>
                <Text uppercase={false} style={styles.centeredBtnGreenText}>
                    Set from hour
                </Text>
            </Button>
            {showSetHourFrom && (
                <DateTimePicker
                testID="dateTimePicker"
                value={setFromDatePicker()}
                mode='time'
                is24Hour={false}
                display="default"
                onChange={(event:any)=>onHourChange(event.nativeEvent.timestamp, true)}
                />
            )}

            <Button onPress={()=>setShowHourTo(!showSetHourFrom)} transparent>
                <Text uppercase={false} style={styles.centeredBtnGreenText}>
                    Set to hour
                </Text>
            </Button>
            {showSetHourTo && (
                <DateTimePicker
                testID="dateTimePicker"
                value={setToDatePicker()}
                mode='time'
                is24Hour={false}
                display="default"
                onChange={(event:any)=>onHourChange(event.nativeEvent.timestamp, false)}
                />
            )}      
            </Content>
           
            </Container>
    )
}
export default EditHabit_HourPicker;

const styles = StyleSheet.create({
    container: {
        paddingTop:0
    },
    ...commonStyles
  });
  