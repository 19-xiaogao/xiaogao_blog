import produce from 'immer'
import { SET_TOKEN, CLEAR_TOKEN } from './constant'
import { IInitStore, IActions } from './type'
const initStore: IInitStore = {
    token: undefined
}

const initReducer = (data = initStore, action: IActions) => produce(data, draft => {
    switch (action.type) {
        case SET_TOKEN:
            draft.token = action.payload.data
            break;
        case CLEAR_TOKEN:
            draft.token = undefined
            break;
        default:
            draft = data
            break;
    }
})

export default initReducer