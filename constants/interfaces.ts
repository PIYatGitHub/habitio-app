export interface IUser {
    userId:number; 
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    preferredTags: number[]
}

export interface IUserStateAction {
    user:IUser,
    loggedIn: boolean;
    type:string;
}

export interface ITag {
    tagId:number,
    tagName: string;
}


export interface IHabitShedule{
    day:number;
    fromHour:string;
    toHour:string; 
}
export interface IHabit {
    title: string;
    goals: string[];
    habitId: number;
    habitScheduleType: ScheduleTypes;
    habitSchedule:IHabitShedule[]; 
}

export enum StatesEnum {
    backToAddScreen = 'backToAddScreen',
    setGoals =  'setGoals',
    setScheduleType ='setScheduleType',
    showExamples='showExamples',
    setHours = 'setHours',
    habitCreated = 'habitCreated'
}

export enum ScheduleTypes {
    fixed = 'fixed',
    fluid =  'fluid',
    unknown =  'unknown',
}

export const weekDayMap = {
    'Monday': 0,
    'Tuesday': 1,
    'Wednesday': 2,
    'Thursday':3,
    'Friday':4, 
    'Saturday':5,
    'Sunday':6
}

export enum DaysOfWeek {
    'Monday'= 0,
    'Tuesday'=  1,
    'Wednesday' = 2,
    'Thursday'= 3,
    'Friday' =  4, 
    'Saturday' = 5,
    'Sunday' = 6
}