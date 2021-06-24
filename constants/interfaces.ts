export interface IUser {
    userId:number; 
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    preferredTags: number[],
    habits: IHabit[],
    motivation: number[] 
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
    rewards: string[];
    positiveMotivators: string[];
    negativeMotivators: string[];
    notes: string;
    habitId: number;
    steps: IStep[];
    habitScheduleType: ScheduleTypes;
    habitSchedule:IHabitShedule[]; 
}

export interface IStep {
    name: string;
    reward: string;
    schedule: IHabitShedule[]; 
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

export enum MotivationTypes {
    carrot = 'The carrot',
    stick = 'The stick'
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