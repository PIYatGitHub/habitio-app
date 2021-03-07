import { Button, Container, Content, Text, Toast } from 'native-base';
import { IHabitShedule, ScheduleTypes } from '../../../constants/interfaces';
import React, { useState } from 'react';

import Colours from '../../../constants/Colours';
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
        } else{
            console.log(`WE WERE HERE...`, value);
            console.log(`props.selectedHabitSchedule>>>>>>>`, props.selectedHabitSchedule);
            setShowHourFrom(false); 
            setShowHourTo(false); 
            if(isHourFrom && !props.selectedHabitSchedule.fromHour) 
                props.onHbitHoursChanged(formatAMPM(new Date(Date.now())), props.selectedHabitSchedule.toHour, convertNumberToWeekday(props.selectedHabitSchedule.day))
            else if(!isHourFrom && !props.selectedHabitSchedule.toHour)
                props.onHbitHoursChanged(props.selectedHabitSchedule.fromHour, formatAMPM(new Date(Date.now())), convertNumberToWeekday(props.selectedHabitSchedule.day))
            
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

    const formatDisplayHour = (isHourFrom:boolean)=>{
        const date = isHourFrom? setFromDatePicker() : setToDatePicker(); 
        let formatted = formatAMPM(date); 
        console.log(`formatting hour? `, formatted);
        
        return formatted; 
    }

    return(
        <Container style={styles.container}>
            <Content>
                <Container style={{display:'flex', flexDirection:'row', flexWrap:'nowrap', flexShrink:1, height:24, marginLeft:'5%'}}>
                    <Text style={{lineHeight:24, width:72}}>between </Text>
                    <Button style={{height:'100%'}} onPress={()=>setShowHourFrom(!showSetHourFrom)} transparent>
                        <Text style={{...styles.centeredBtnGreenText, textDecorationLine:'underline', textDecorationColor:Colours.green}}>
                            {formatDisplayHour(true)}
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
                    </Container>
                    <Container style={{display:'flex', flexDirection:'row', flexWrap:'nowrap', flexShrink:1, height:24,  marginLeft:'5%', marginTop: '2%'}}>
                    <Text style={{lineHeight:24, width:72}}>and </Text>
                    <Button style={{height:'100%'}} onPress={()=>setShowHourTo(!showSetHourFrom)} transparent>
                        <Text style={{...styles.centeredBtnGreenText, textDecorationLine:'underline', textDecorationColor:Colours.green}}>
                            {formatDisplayHour(false)}
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
                </Container>
                
                
                
            </Content>           
        </Container>
    )
}
export default EditHabit_HourPicker;

const styles = StyleSheet.create({
    container: {
        paddingTop:0,
        height:56,
        maxHeight:56
    },
    ...commonStyles
  });
  