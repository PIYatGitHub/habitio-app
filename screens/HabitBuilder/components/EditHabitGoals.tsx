import { Button, Container, Content, Form, Icon, Input, Item, Label, Text } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { IHabit, StatesEnum } from '../../../constants/interfaces';
import React, { useState } from 'react';

import colours from '../../../constants/Colours';
import { commonStyles } from '../../styles/commonStyles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
interface IEditHabitGoalsProps {
    onSetHabitGoals: (title:string, goals:string[], step:StatesEnum)=>void
    habitToEdit?: IHabit; 
}

const EditHabitGoals = (props:IEditHabitGoalsProps) => {
    const [title, setTitle] = useState(props.habitToEdit? props.habitToEdit.title: ''); 
    const [goals, setGoals] = useState<string[]>(props.habitToEdit? props.habitToEdit.goals: ['','','']); 

    const handleGoalChange = (goalIdx:number, value:string) => {
      let newGoals:string[] = Object.assign([], goals); 
      newGoals[goalIdx] = value;
      
      setGoals(newGoals);
    }

    const handleNextStep = (flag:boolean)=> {
       props.onSetHabitGoals(title, goals, flag?StatesEnum.setScheduleType:StatesEnum.backToAddScreen); 
    }
    
    return(
    <Container style={styles.container}>
        <Container style={styles.actionBandMultipleAction}>
            <Button onPress={()=>handleNextStep(false)} transparent style={{width:'33.33%', height:'100%'}}>
                <Text uppercase={false} style={{...styles.centeredBtnGrayText ,width:'100%', textAlign:'left'}}>Cancel</Text>
            </Button>
            <Text style={{...styles.centeredBtnGrayText, width:'33.33%', lineHeight:windowHeight*0.08, textAlign:'center'}}>Add habit</Text>
            <Button onPress={()=>handleNextStep(true)} transparent style={{width:'33.34%', height:'100%'}}>
                <Text style={{...styles.centeredBtnGreenText,width:'100%', textAlign:'right'}} uppercase={false}>Next</Text>
            </Button>
        </Container>
        <Container>
            <Content>
                <Form>
                    <Item stackedLabel style={styles.noBBW} >
                        <Label style={styles.labels}>Title</Label>
                        <Input onChangeText={(e)=>setTitle(e)} value={title}
                        style={styles.borderedInput}
                        />      
                    </Item>
    
                    <Item style={{...styles.noBBW, marginTop:40, marginBottom:20}}>
                        <Text style={{color:colours.ltGray, fontSize:20}}>List three or more goals/feelings in creating this habit.
                            (This helps us motivate you better).</Text>
                    </Item>
                    <Item style={styles.noBBW}>
                        <Input placeholder='Getting in shape' onChangeText={(e)=>handleGoalChange(0,e)} style={styles.borderedInput} value={goals[0]}/>
                    </Item>
                    <Item style={styles.noBBW}>
                        <Input placeholder='buns of steel' onChangeText={(e)=>handleGoalChange(1,e)} style={styles.borderedInput} value={goals[1]}/>
                    </Item>
                    <Item last style={{...styles.noBBW, marginLeft:0}}>
                        <Input placeholder='feeling great about myself' onChangeText={(e)=>handleGoalChange(2,e)} style={styles.borderedInput} value={goals[2]}/>
                    </Item>
                </Form>
                <Button transparent style={{marginTop:20}}>
                        <Icon name='add-circle' style={{color: colours.green, marginRight:0}}/>
                        <Text uppercase={false} style={styles.centeredBtnGreenText}>Add More</Text>
                    </Button>
            </Content>            
        </Container>
    </Container>
    )
}
export default EditHabitGoals;

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
    },
    ...commonStyles
  });
  