import { Button, Container, Content, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { IHabit, IUser } from '../../../constants/interfaces';
import React, { useState } from 'react';

import HabitsView from './HabitsView';
import colours from '../../../constants/Colours';
import { commonStyles } from '../../styles/commonStyles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
interface ICalendarProps {
    authenticatedUser: IUser;
    onHabitEditRequired: (habit:IHabit)=>void //when they require an edit on the habit
    onHabitDetails?: (habit:IHabit)=>void
}

const Calendar = (props:ICalendarProps) => {
    const [isWeek, setIsWeek] = useState(false); 
    const [selectedHabit, setSelectedHabit] = useState<IHabit|undefined>(undefined);

    const handleDayClick = ()=>{
        setIsWeek(false); 
    }
    const handleWeekClick = ()=>{
        setIsWeek(true); 
    }
    const handleShowDetails =(habit:IHabit)=>{
        if(habit) setSelectedHabit(habit)
    }
    
    if(selectedHabit){
        props.onHabitDetails && props.onHabitDetails(selectedHabit); 
    }

    return (        
        <Container>
                <Content>
                    {!props.authenticatedUser.habits.length? (
                        <HabitsView habits={props.authenticatedUser.habits}/>   
                    ):(
                    <Container>
                        <Container style={{display:'flex', flexDirection:'row', justifyContent:'space-evenly', flexGrow:1,height:48,maxHeight:48}}>
                            <Button transparent onPress={handleDayClick} style={!isWeek?{
                                borderBottomWidth:1, borderBottomColor:colours.green, width:windowWidth*0.25
                            }:{borderBottomWidth:1, borderBottomColor:'white', width:windowWidth*0.25}}>
                                <Text style={styles.centeredBtnGrayText}  uppercase={false}>Day</Text>
                            </Button>
                            <Button transparent onPress={handleWeekClick} style={isWeek?{
                                borderBottomWidth:1, borderBottomColor:colours.green, width:windowWidth*0.25
                            }:{borderBottomWidth:1, borderBottomColor:'white', width:windowWidth*0.25}}>
                                <Text style={styles.centeredBtnGrayText} uppercase={false}>Week</Text>
                            </Button>
                            <Text style={{...styles.centeredBtnGrayText, lineHeight:48, textAlign:'right', width:windowWidth*0.5, color:isWeek?colours.dkGray:'transparent'}}>Week of Jan 9</Text>
                        </Container>
                        <Content>
                            <HabitsView habits={props.authenticatedUser.habits} filterByDay={!isWeek} filterByWeek={isWeek} onHabitDetails={handleShowDetails}/>
                        </Content>
                        
                    </Container> 
                )}
            </Content>         
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
    },
    ...commonStyles
  });
  