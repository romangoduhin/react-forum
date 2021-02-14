import React, { useReducer, createContext } from 'react';

const initialState = {
  isLoading: false,
  isLogged: null,
  currentUser: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true };
    case 'SET_AUTHORIZED':
      return {
        ...state,
        isLoading: false,
        isLogged: true,
        currentUser: action.payload,
      };
    case 'SET_UNAUTHORIZED':
      return { ...state, isLogged: false };
    default:
      return state;
  }
}

export const CurrentUserContext = createContext([]);

export const CurrentUserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CurrentUserContext.Provider value={[state, dispatch]}>
      {children}
    </CurrentUserContext.Provider>
  );
};
