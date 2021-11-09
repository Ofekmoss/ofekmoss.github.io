import { User } from "src/app/shared/user.model";
import * as usersListActions from './users-list.actions'
const initialState = {
    users: [
        // new User('ofekmoss', '12345678', 'ofek@gmail.com'),
        // new User('ofekmoss2', '12345678', 'ofek2@gmail.com')
    ]
}

export function usersListReducer(state = initialState, action: usersListActions.AddUser) {
    switch (action.type) {
        case usersListActions.ADD_USER: 
            return {
                ...state,
                users: [...state.users, action.payload]
            }
            default: 
                return state;
    }
}