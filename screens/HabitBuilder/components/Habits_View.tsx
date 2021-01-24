import { Badge, Button, Container, Icon, Text } from 'native-base';
import React, { useState } from 'react';

import { IHabit } from '../../../constants/interfaces';
import { StyleSheet } from 'react-native';

interface iHabitProps {
    habits: IHabit[]; 
    onCreateHabitTriggered: ()=>void
}

const Habits_View = (props:iHabitProps) => {
    return (        
        <Container>
           {!props.habits.length ?(
               <Container>
                <Button success onPress = {props.onCreateHabitTriggered}>
                    <Text>+</Text>
                </Button>
               <Text>You don't have any habits yet.</Text>
               <Text>Add your first habit using the + sign.</Text>
               </Container>
           ) :null}
           
           {props.habits.map(habit=>{
               return (
                   <Container style={styles.container}>
                       <Text>{habit.title}</Text>
                       <Container style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}} >
                           {habit.goals.map(goal=>{
                            return(
                                <Badge success style={styles.badge}>
                                    <Text>
                                        <Icon name="star" 
                                        style={styles.badgeIcon}
                                        />{`  ${goal}`}
                                    </Text>
                                </Badge>
                                )
                            })}
                       </Container> 
                   </Container>
               )
           })}
        </Container>
    )
}
export default Habits_View;

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
  