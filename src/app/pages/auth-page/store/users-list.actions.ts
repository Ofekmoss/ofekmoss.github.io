import { Action } from "@ngrx/store";
import { User } from "src/app/shared/user.model";

export const ADD_USER = 'ADD_USER';
export const UPDATE_USERNAME = 'UPDATE_USERNAME';

export class AddUser implements Action {
    readonly type = ADD_USER;
    constructor(public payload: User) {}
}

export class UpdateUsername implements Action {
    readonly type = UPDATE_USERNAME;
    constructor(public payload: {username: string, userIndex: number}) {}
}

export type UsersListActions = 
    | AddUser
    | UpdateUsername;