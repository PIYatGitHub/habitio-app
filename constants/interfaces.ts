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


export interface IHabit {
    title: string;
    goals: string[]
    habitId: number
}
