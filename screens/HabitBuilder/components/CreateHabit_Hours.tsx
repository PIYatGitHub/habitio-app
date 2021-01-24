import { Body, Button, CheckBox, Container, Content, Form, Icon, Input, Item, ListItem, Text } from 'native-base';
import { IHabitShedule, StatesEnum, weekDayMap } from '../../../constants/interfaces';
import React, { Fragment, useState } from 'react';

import CreateHabit_HourPicker from './CreateHabits_HourPicker';
import { StyleSheet } from 'react-native';

interface iSetHabitHoursProps {
    onSetHabitHours: (schedule:IHabitShedule[], step:StatesEnum)=>void
}

const emptySchedule:IHabitShedule = {
    day:-1,
    fromHour:'',
    toHour:''
}
const CreateHabit_Hours = (props:iSetHabitHoursProps) => {
    const [dailyHabitSchedules, setDailyHabitSchedules] = useState<IHabitShedule[]>([]);
    const [activatedDows, setActivatedDows] = useState<string[]>([]);

    const daysOfTheWeek = Object.keys(weekDayMap); 
    
    const handleNextStep = (status:StatesEnum)=> {
        props.onSetHabitHours(dailyHabitSchedules,status); 
    }

    const handleDowClick = (dow:string) => {
         let scheduleToPush:IHabitShedule = Object.assign({}, emptySchedule);
     
        let newDailySchedules:IHabitShedule[] = Object.assign([], dailyHabitSchedules); 
        const mapEntries = Object.entries(weekDayMap);
        const targetDay = mapEntries.find(me=>me[0]===dow);

        if(targetDay){
            let spliceIdx = -1; 
            let match = newDailySchedules.find((ds, idx)=> {
                if( ds.day === targetDay[1]){
                    spliceIdx = idx;
                    return ds; 
                }
                return undefined;
            }); 
            if(match && spliceIdx !== -1){
                newDailySchedules.splice(spliceIdx, 1);
                const newActivatedDows:string[] = Object.assign([], activatedDows);
                const spliceDowIdx = newActivatedDows.indexOf(targetDay[0]);
                 if(spliceIdx !== -1){
                     newActivatedDows.splice(spliceDowIdx, 1); 
                     setActivatedDows(newActivatedDows); 
                 }
            } else if(!match && spliceIdx === -1) {
                scheduleToPush.day = targetDay[1]; // day: -1 ==> day: 4 
                activatedDows.push(targetDay[0]);
            }
        }
        
        if(scheduleToPush.day !== -1) newDailySchedules.push(scheduleToPush); 
        setDailyHabitSchedules(newDailySchedules); 
        console.log(`inspect work`, newDailySchedules);
    }

    const handleHoursChanged = (hourFrom:string, hourTo:string, dow:string)=>{ //one or more hors are set
        const mapEntries = Object.entries(weekDayMap);
        const targetDay = mapEntries.find(me=>me[0]===dow); 
        if(targetDay){
            const newDailySchedules:IHabitShedule[] = Object.assign([], dailyHabitSchedules); 
            let spliceIdx = -1; 
            let match = newDailySchedules.find((ds, idx)=> {
                if( ds.day === targetDay[1]){
                    spliceIdx = idx;
                    return ds; 
                }
                return undefined;
            }); 

            if(match && spliceIdx !== -1){
                newDailySchedules.splice(spliceIdx, 1);
                match.toHour = hourTo;
                match.fromHour = hourFrom; 
                newDailySchedules.push(match); 
                console.log(`where I reset the schedule....`, newDailySchedules);
                setDailyHabitSchedules(newDailySchedules)
            }
        }
    }

    const getCurrentSchedule = (dow:string)=> {
        const mapEntries = Object.entries(weekDayMap);
        const targetDay = mapEntries.find(me=>me[0]===dow); 
        if(targetDay){
            const habitSchedule = dailyHabitSchedules.find(dhs=> dhs.day === targetDay[1]);
            if(habitSchedule)
                return habitSchedule;
        }
        return emptySchedule; 
    }

    
    return(
    <Container style={styles.container}>
        <Container>
            <Button onPress={()=>handleNextStep(StatesEnum.setScheduleType)}><Text>Back arrow</Text></Button>
            {dailyHabitSchedules.length ? <Button onPress={()=>handleNextStep(StatesEnum.habitCreated)}><Text>Next</Text></Button> : null}
        </Container>
        <Container>
            <Content>
                {daysOfTheWeek.map(dow=>{
                return(
                    <ListItem key={dow} onPress={()=>{handleDowClick(dow)}}>
                        <CheckBox checked={activatedDows.includes(dow)}/>
                        <Body>
                            <Text>{dow}</Text>
                            {activatedDows.includes(dow)?(
                                <Fragment>
                                     <CreateHabit_HourPicker  selectedHabitSchedule = {getCurrentSchedule(dow)} onHbitHoursChanged={handleHoursChanged}/>
                                </Fragment>
                                
                            ):null}
                        </Body>
                    </ListItem>
                )
            })}
            </Content>         
        </Container>
    </Container>
    )
}
export default CreateHabit_Hours;

const styles = StyleSheet.create({
    container: {
        paddingTop:24
    }
  });
  