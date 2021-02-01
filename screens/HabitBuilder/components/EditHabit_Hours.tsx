import { ActionSheet, Body, Button, CheckBox, Container, Content, ListItem, Root, Text } from 'native-base';
import { IHabit, IHabitShedule, ScheduleTypes, StatesEnum, weekDayMap } from '../../../constants/interfaces';
import React, { Fragment, useState } from 'react';

import EditHabit_HourPicker from './EditHabit_HourPicker';
import { StyleSheet } from 'react-native';

interface iSetHabitHoursProps {
    onSetHabitHours: (schedule:IHabitShedule[], step:StatesEnum)=>void
    habitToEdit?:IHabit; 
}

const emptySchedule:IHabitShedule = {
    day:-1,
    fromHour:'',
    toHour:''
}
const EditHabit_Hours = (props:iSetHabitHoursProps) => {
    const [dailyHabitSchedules, setDailyHabitSchedules] = useState<IHabitShedule[]>([]);
    const [activatedDows, setActivatedDows] = useState<string[]>([]);
    const [selectedFluidDow, setSelectedFluidDow] = useState('Sunday');
    const [selectedFluidHour, setSelectedFluidHour] = useState('10:30 am');

    const daysOfTheWeek = Object.keys(weekDayMap); 
    
    const handleNextStep = (status:StatesEnum)=> {
        props.onSetHabitHours(dailyHabitSchedules,status); 
    }

    const handleDowClick = (dow:string) => {
         let scheduleToPush:IHabitShedule = Object.assign({}, emptySchedule);
     
        let newDailySchedules:IHabitShedule[] = Object.assign([], dailyHabitSchedules); 
        console.log(`newDailySchedules...`, newDailySchedules);
        
        const mapEntries = Object.entries(weekDayMap);
        const targetDay = mapEntries.find(me=>me[0]===dow);

        if(targetDay){
            console.log(`targ day...`, targetDay);
            
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
        console.log(`hourFrom:string, hourTo:string, dow:string`, hourFrom, hourTo, dow);
        
        if(targetDay){
            console.log(`target day`, targetDay);

            const newDailySchedules:IHabitShedule[] = Object.assign([], dailyHabitSchedules); 
            let spliceIdx = -1; 
            let match = newDailySchedules.find((ds, idx)=> {
                if( ds.day === targetDay[1]){
                    spliceIdx = idx;
                    return ds; 
                }
                return undefined;
            }); 
            console.log(`match and splice idx`, match, spliceIdx);
            
            if(match && spliceIdx !== -1){
                newDailySchedules.splice(spliceIdx, 1);
                match.toHour = hourTo;
                match.fromHour = hourFrom; 
                newDailySchedules.push(match);                
            } else{
                newDailySchedules.push({fromHour:hourFrom, toHour:hourTo, day:targetDay[1]})
            }
            console.log(`where I reset the schedule....`, newDailySchedules);
            setDailyHabitSchedules(newDailySchedules)
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

    const showBottomScheet = ()=>{
        ActionSheet.show(
        {
            options:[
                { text: "Monday", icon: "checkmark", iconColor: "#2c8ef4" },
                { text: "Tuesday", icon: "checkmark", iconColor: "#f42ced" },
                { text: "Wednesday", icon: "checkmark", iconColor: "#ea943b" },
                { text: "Thursday", icon: "checkmark", iconColor: "#ea943b" },
                { text: "Friday", icon: "checkmark", iconColor: "#ea943b" },
                { text: "Saturday", icon: "checkmark", iconColor: "#ea943b" },
                { text: "Sunday", icon: "checkmark", iconColor: "#ea943b" },
                { text: "Cancel", icon: "close", iconColor: "#25de5b" }
              ],
            cancelButtonIndex: 7,
            title: "Pick a weekday"
        },
        buttonIndex => {
            console.log(`clicking on`, buttonIndex);
            //TODO if not equal to 7, then go and set the day. 
        });
    }

    return(
    <Container style={styles.container}>
        <Container>
            <Button onPress={()=>handleNextStep(StatesEnum.setScheduleType)}><Text>Back arrow</Text></Button>
            {dailyHabitSchedules.length ? <Button onPress={()=>handleNextStep(StatesEnum.habitCreated)}><Text>Next</Text></Button> : null}
        </Container>
        {props.habitToEdit?.habitScheduleType === ScheduleTypes.fixed? (
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
                                     <EditHabit_HourPicker  selectedHabitSchedule = {getCurrentSchedule(dow)}
                                     onHbitHoursChanged={handleHoursChanged}
                                     />
                                </Fragment>
                                
                            ):null}
                        </Body>
                    </ListItem>
                )
            })}
            </Content>         
        </Container>
        ): null}
        {props.habitToEdit?.habitScheduleType === ScheduleTypes.fluid?(
            <Container style={styles.fluidHabitLine}>
                <Content>
                    <Text style={styles.centerTxt}>I will plan my weekly schedule on </Text>
                    <Container>
                        <Root>
                            <Button textStyle={styles.greenTxtBtn} transparent 
                        onPress={showBottomScheet}>
                            <Text>{selectedFluidDow}</Text>
                        </Button>
                        </Root>
                        
                        <Text style={{lineHeight:38}}> at </Text>
                        <Button transparent><Text>{selectedFluidHour}</Text></Button>
                    </Container>
                </Content>
            </Container>
        ): null}
    </Container>
    )
}
export default EditHabit_Hours;

const styles = StyleSheet.create({
    container: {
        paddingTop:0
    },
    fluidHabitLine: {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'center'
    },
    centerTxt: {
        width:'100%',
        textAlign:'center'
    },
    greenTxtBtn: {
        color:'green',
        textDecorationLine:'underline',
        textDecorationColor:'green'
    }
  });
  