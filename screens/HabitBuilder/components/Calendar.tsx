import { Button, Container, Text } from 'native-base';
import React, { useState } from 'react';

import Habits_View from './Habits_View';
import { IUser } from '../../../constants/interfaces';
import { StyleSheet } from 'react-native';

interface ICalendarProps {
    authenticatedUser: IUser;
    onHabitEditRequired: ()=>void //when they require an edit on the habit
}

const Calendar = (props:ICalendarProps) => {
    const [isWeek, setIsWeek] = useState(false); 
    const handleDayClick = ()=>{
        setIsWeek(false); 
    }
    const handleWeekClick = ()=>{
        setIsWeek(true); 
    }

    return (        
        <Container>
                <Container>
                    <Container>
                       <Button transparent onPress={handleDayClick}><Text>Day</Text></Button>
                        <Button transparent onPress={handleWeekClick}><Text>Week</Text></Button>
                    </Container>
                {isWeek? ( <Container>
                    <Text>Week of Jan 9</Text>
                </Container>):null}               
            </Container>
           
            <Habits_View habits={props.authenticatedUser.habits}/>

        </Container>         
    )
}
export default Calendar;

const styles = StyleSheet.create({
    container: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start',
        marginLeft:20,
        marginTop:5,
        borderWidth: 2,
        borderColor:'red'
    }
  });
  