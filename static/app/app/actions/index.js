import fetch from 'isomorphic-fetch'

export const REQUEST_MOVES = 'REQUEST_MOVES'
export const RECEIVE_MOVES = 'RECEIVE_MOVES'

export const UPDATE_MOVE = 'UPDATE_MOVE'

export const REQUEST_SPOTS = 'REQUEST_SPOTS'
export const RECEIVE_SPOTS = 'RECEIVE_SPOTS'

function requestSpots(){
    return {
        type: REQUEST_SPOTS
    }
}

function receiveSpots(json){
    return {
        type: RECEIVE_SPOTS,
        spots: json
    }
}

export function fetchSpots() {
    return dispatch => {
        dispatch(requestSpots())
        return fetch('/json/spots/')
            .then(response => response.json())
            .then(json => dispatch(receiveSpots(json.results)));
    }
}

function requestMoves() {
    return {
        type: REQUEST_MOVES
    }
}

function receiveMoves(json) {
    return {
        type: RECEIVE_MOVES,
        moves: json
    }
}

export function fetchMoves() {
    return dispatch => {
        dispatch(requestMoves())
        return fetch('/json/moves/')
            .then(response => response.json())
            .then(json => dispatch(receiveMoves(json.results)))
    }
}

export function updateMove(move){
    return { type: UPDATE_MOVE, move };
}

export function saveMove(){
    return (dispatch, getState) => {
        const move = getState().recentMove;
        const url = move.id ? `/json/moves/${move.id}` : '/json/moves/';
        const method = move.id ? 'PUT' : 'POST';
        
        return fetch(url, {
            method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(move)
        })
        .then(response => response.json())
        .then(json => {
          dispatch(updateMove(json));
        });
    }
} 
