import {dataConstants} from '../_constants'
import {dataService} from '../_services'
import { alertActions } from './';
import { history } from '../_helpers';

export const dataActions = {
    getAll,
    delete: _delete,
    newdata,
};


function newdata(data) {
    return dispatch => {
        dispatch(request(data));

        dataService.register(data)
            .then(
                data => { 
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Data send  successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(data) { return { type: dataConstants.REGISTER_REQUEST, data } }
    function success(data) { return { type: dataConstants.REGISTER_SUCCESS, data } }
    function failure(error) { return { type: dataConstants.REGISTER_FAILURE, error } }
}


        


function getAll() {
    return dispatch => {
        dispatch(request());

        dataService.getAll()
            .then(
                datas => dispatch(success(datas)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: dataConstants.GETALL_REQUEST } }
    function success(datas) { return { type: dataConstants.GETALL_SUCCESS, datas } }
    function failure(error) { return { type: dataConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        dataService.delete(id)
            .then(
                data => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: dataConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: dataConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: dataConstants.DELETE_FAILURE, id, error } }
}