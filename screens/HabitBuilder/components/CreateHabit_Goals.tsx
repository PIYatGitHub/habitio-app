import { Button, Container, Form, Icon, Input, Item, Text } from 'native-base';
import React, { useState } from 'react';

import { StatesEnum } from '../../../constants/interfaces';
import { StyleSheet } from 'react-native';

interface iHabitCreateHabitProps {
    onSetHabit: (title:string, goals:string[], step:StatesEnum)=>void
}


const CreateHabit_Goals = (props:iHabitCreateHabitProps) => {
    const [title, setTitle] = useState(''); 
    const [goals, setGoals] = useState<string[]>(['','','']); 

    const handleGoalChange = (goalIdx:number, value:string) => {
      let newGoals:string[] = Object.assign([], goals); 
      newGoals[goalIdx] = value;
      
      setGoals(newGoals);
    }

    const handleNextStep = (flag:boolean)=> {
       props.onSetHabit(title, goals, flag?StatesEnum.setScheduleType:StatesEnum.backToAddScreen); 
    }
    
    return(
    <Container style={styles.container}>
        <Container>
            <Button onPress={()=>handleNextStep(false)}><Text>Cancel</Text></Button>
            <Button onPress={()=>handleNextStep(true)}><Text>Next</Text></Button>
        </Container>
        <Container>
            <Form>
                <Item>
                    <Input onChangeText={(e)=>setTitle(e)} placeholder='Title' value={title}/>
                </Item>
                <Item>
                    <Text>List three or more goals/feelings in creating this habit.
                        (This helps us motivate you better).</Text>
                </Item>
                <Item>
                    <Input onChangeText={(e)=>handleGoalChange(0,e)} placeholder='Goal 1' value={goals[0]}/>
                </Item>
                <Item>
                    <Input onChangeText={(e)=>handleGoalChange(1,e)} placeholder='Goal 2' value={goals[1]}/>
                </Item>
                <Item last>
                    <Input onChangeText={(e)=>handleGoalChange(2,e)} placeholder='Goal 3' value={goals[2]}/>
                </Item>
            </Form>
            <Button><Text><Icon name='add'/>{` Add your own`}</Text></Button>
        </Container>
    </Container>
    )
}
export default CreateHabit_Goals;

const styles = StyleSheet.create({
    container: {
        paddingTop:0
    },
    flexRowWrap: {
        display:'flex',
        flexDirection:'row', 
        flexWrap:'wrap'
    },
    badge:{
        marginTop: 5,
        marginBottom:5,
        marginRight:5
    },
    badgeIcon: {
        fontSize: 15,
        color: "#fff",
        lineHeight: 20
    }
  });
  