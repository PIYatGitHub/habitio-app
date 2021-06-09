import { Button, Footer, FooterTab, Icon, Text } from 'native-base';
import React, { useState } from 'react';

import colours from '../../../constants/Colours';

interface IBottomBarProps {
    tab: string;
}

const BottomBar = (props:IBottomBarProps) => {
    const setSelectedTab = (selectedTab:string)=>{
        console.log(`Tab selected: `, selectedTab)
    }

    return (
        <Footer>
            <FooterTab style={{
                backgroundColor:'white'
            }}>
                <Button onPress={()=>{
                    setSelectedTab('shop'); 
                }} 
                active = {props.tab === 'shop'}
                style={props.tab === 'shop'? 
                {backgroundColor:'transparent', borderBottomColor:colours.dkGray, borderBottomWidth:3}:
                {backgroundColor:'transparent', borderBottomColor:'transparent', borderBottomWidth:3}}
                >
                    <Icon style={props.tab === 'habits'?{color:colours.dkGray}: {color:colours.ltGray}} type='FontAwesome5' name='cart-plus'/>
                    <Text style={props.tab === 'habits'?{color:colours.dkGray}: {color:colours.ltGray}} uppercase={false}>Discover</Text>
                </Button>

                <Button onPress={()=>{
                    setSelectedTab('step'); 
                }} active = {props.tab === 'step'}                    
                style={props.tab === 'step'? 
                {backgroundColor:'transparent', borderBottomColor:colours.dkGray, borderBottomWidth:3}:
                {backgroundColor:'transparent', borderBottomColor:'transparent', borderBottomWidth:3}}
                >
                    <Icon style={props.tab === 'calendar'?{color:colours.dkGray}: {color:colours.ltGray}} type='FontAwesome5' name='plus'/>
                    <Text style={props.tab === 'calendar'?{color:colours.dkGray}: {color:colours.ltGray}} uppercase={false}>Add Step</Text>
                </Button>
                
                <Button onPress={()=>{
                    setSelectedTab('habit'); 
                }} active = {props.tab === 'habit'}
                style={props.tab === 'habit'? 
                {backgroundColor:'transparent', borderBottomColor:colours.dkGray, borderBottomWidth:3}:
                {backgroundColor:'transparent', borderBottomColor:'transparent', borderBottomWidth:3}}
                >
                    <Icon style={props.tab === 'settings'?{color:colours.dkGray}: {color:colours.ltGray}} type='FontAwesome5' name='user-plus'/>
                    <Text style={props.tab === 'settings'?{color:colours.dkGray}: {color:colours.ltGray}} uppercase={false}>Add Habit</Text>
                </Button>

                {/* <Button onPress={()=>{
                    setSelectedTab('habit'); 
                }} active = {props.tab === 'habit'}
                style={props.tab === 'habit'? 
                {backgroundColor:'transparent', borderBottomColor:colours.dkGray, borderBottomWidth:3}:
                {backgroundColor:'transparent', borderBottomColor:'transparent', borderBottomWidth:3}}
                >
                    <Icon style={props.tab === 'settings'?{color:colours.dkGray}: {color:colours.ltGray}} type='FontAwesome5' name='question'/>
                    <Text style={props.tab === 'settings'?{color:colours.dkGray}: {color:colours.ltGray}} uppercase={false}>Give Feedback</Text>
                </Button> */}
            </FooterTab>
        </Footer>
    );
}
export default BottomBar;