import { User } from "src/app/shared/user.model";
import * as usersListActions from './users-list.actions'
const initialState = {
    users: [
        new User('check', '12345678', 'check@gmail.com'),
        // new User('ofekmoss2', '12345678', 'ofek2@gmail.com')
    ]
}

export function usersListReducer(state = initialState, action: usersListActions.UsersListActions) {
    switch (action.type) {
        case usersListActions.ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        case usersListActions.UPDATE_USERNAME:
            const user = state.users[action.payload.userIndex]
            const updatedUser = new User(action.payload.username, user.password, user.email)
            // console.log(updatedUser)
            const updatedUsers = [...state.users]
            updatedUsers[action.payload.userIndex] = updatedUser
            return {
                ...state,
                users: updatedUsers
            }
        default:
            return state;
    }
}