import { Button, Container, Form, Icon, Input, Item, Text } from 'native-base';
import { IHabit, IUser } from '../../../constants/interfaces';
import React, { useState } from 'react';

import { StyleSheet } from 'react-native';

interface iHabitCreateProps {
    user: IUser; 
    onCreateHabit: (habit:IHabit|null)=>void
}
enum StatesEnum {
    setGoals =  'setGoals',
    setScheduleType ='setScheduleType',
    showExamples='showExamples',
    setHours = 'setHours'
}

const CreateHabit = (props:iHabitCreateProps) => {
    const [title, setTitle] = useState(''); 
    const [goals, setGoals] = useState<string[]>(['','','']); 
    const [currentStep, setCurrentStep] = useState<StatesEnum>(StatesEnum.setGoals); 

    const handleGoalChange = (goalIdx:number, value:string) => {
      let newGoals:string[] = Object.assign([], goals); 
      newGoals[goalIdx] = value;
      
      setGoals(newGoals);
    }

    const handleCancel = ()=> {
       props.onCreateHabit(null); 
    }

    if(currentStep === StatesEnum.setGoals ) {
        return(
        <Container style={styles.container}>
                <Container>
                    <Button onPress={handleCancel}><Text>Cancel</Text></Button>
                    <Button onPress={()=>setCurrentStep(StatesEnum.setScheduleType)}><Text>Next</Text></Button>
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

    if(currentStep === StatesEnum.setScheduleType) {
        return(
            <Text>Hello from scheduling</Text>
        )
    }

    if(currentStep === StatesEnum.showExamples) {
        return(
            <Text>Hello from examples</Text>
        )
    }

    if(currentStep === StatesEnum.setHours) {
        return(
            <Text>Hello from set hours!</Text>
        )
    }

    return ( 
        <Text>Cannot be here!!</Text>
    )
}
export default CreateHabit;

const styles = StyleSheet.create({
    container: {
        paddingTop:24
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
  