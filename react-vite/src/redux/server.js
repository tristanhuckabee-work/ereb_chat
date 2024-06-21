const CREATE = 'servers/CREATE';
const READ_ALL = 'servers/READ_ALL';
const READ_ONE = 'servers/READ_ONE';
const READ_USR = 'servers/READ_BY_USER';
const UPDATE = 'servers/UPDATE';
const DELETE = 'servers/DELETE';

// p == payload
const createServer = p => ({ type: CREATE, p });
const getAllServer = p => ({ type: READ_ALL, p });
const getOneServer = p => ({ type: READ_ONE, p });
const getUsrServer = p => ({ type: READ_USR, p });
const updateServer = p => ({ type: UPDATE, p });
const deleteServer = p => ({ type: DELETE, p });


// THUNKS
// export const create_server = payload => async dispatch => {
//     return;
// }
export const get_servers = (type, resource_id = 0) => async dispatch => {
    let res;
    let action;

    if (type == 'all') {
        res = await fetch('/servers');
        action = getAllServer
    } else if (type == 'one') {
        console.log(`GET SERVER ${resource_id}`)
        res = await fetch(`/servers/${resource_id}`);
        action = getOneServer
    } else {
        res = await fetch(`/users/my_servers`);
        action = getUsrServer
    }

    const data = await res.json();
    if (res.ok) {
        dispatch(action(data));
        return data;
    }
    return data;
}
// export const update_server = payload => async dispatch => {
//     return;
// }
// export const delete_server = payload => async dispatch => {
//     return;
// }

// REDUCER
export default function reducer(state = {}, action) {
    let newState = {
        servers: { ...state.servers },
        current: state.current
    }

    switch (action.type) {
        // case CREATE:
        //     return newState;
        case READ_ALL:
            action.p.servers.forEach(server => {
                newState.servers[server.id] = server;
            });
            return newState;
        case READ_ONE:
            newState.current = action.payload;
            return newState;
        case READ_USR:
            action.p.forEach(server => {
                newState.servers[server.id] = server
            });
            return newState;
        // case UPDATE:
        //     return newState;
        // case DELETE:
        //     return newState;
        default:
            return newState;
    }
}