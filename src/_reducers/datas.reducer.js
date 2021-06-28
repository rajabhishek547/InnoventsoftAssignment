import { dataConstants } from '../_constants';

export function datas(state = {}, action) {

    switch (action.type) {
        case dataConstants.GETALL_REQUEST:
            return {
                loading: true
            };
            
        case dataConstants.GETALL_SUCCESS:
            return {
                data: action.datas
            };
        case dataConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case dataConstants.DELETE_REQUEST:
            // add 'deleting:true' property to user being deleted
            return {
                ...state,
                data: state.data.map(data =>
                    data.id === action.id
                        ? { ...data, deleting: true }
                        : data
                )
            };
        case dataConstants.DELETE_SUCCESS:
            // remove deleted user from state
            return {
                data: state.data.filter(data => data.id !== action.id)
            };
            
        case dataConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
            return {
                ...state,
                data: state.data.map(data => {
                    if (data.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...dataCopy } = data;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...dataCopy, deleteError: action.error };
                    }

                    return data;
                })
            };
            
        default:
            
            return state
            
    }
    
}
