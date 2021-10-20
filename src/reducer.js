export const initialState = {
  user: null,
  rooms: [],
  messages: [],
  groups: [],
  currentGroup: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  ADD_NEW_MESSAGE: "ADD_NEW_MESSAGE",
  SET_CURRENT_GROUP: "SET_CURRENT_GROUP",
  ADD_NEW_GROUP: "ADD_NEW_GROUP",
  GET_GROUPS: "GET_GROUPS",
  GET_MESSAGES_OF_GROUP: "GET_MESSAGES_OF_GROUP",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionTypes.GET_GROUPS:
      return {
        ...state,
        groups: action.groups,
      };

    case actionTypes.GET_MESSAGES_OF_GROUP:
      return state;

    case actionTypes.ADD_NEW_MESSAGE:
      let currRoom = state.currentRoom;
      let messagesArray = currRoom.messages;
      let newMessageArray = [...messagesArray, action.message];
      currRoom.messages = newMessageArray;
      return {
        ...state,
        currentRoom: currRoom,
      };

    case actionTypes.SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.groupDetails,
      };

    case actionTypes.ADD_NEW_GROUP:
      const rooms = state.rooms;
      const newRooms = [...rooms, action.room];
      return {
        ...state,
        rooms: newRooms,
      };

    default:
      return state;
  }
};

export default reducer;
