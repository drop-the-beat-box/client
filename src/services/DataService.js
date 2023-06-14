import { getFriends, getRooms } from "./APIService";

/* Follwing List Storage */
let followingList = [];
let followingListeners = [];

function emitChange(listeners) {
  for (let listener of listeners) {
    listener();
  }
}

export const followingStore = {
  updateList(token) {
    getFriends(token).then((list) => {
      followingList = list;
      emitChange(followingListeners);
    });
  },
  subscribe(listener) {
    followingListeners = [...followingListeners, listener];
    return () => {
      followingListeners = followingListeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return followingList;
  },
};

/* Sharing rooms storage */
let roomList = [];
let roomListeners = [];
let isRoomLoaded = false;

export const roomStore = {
  updateList(token) {
    isRoomLoaded = false;
    getRooms(token).then((list) => {
      roomList = list;
      isRoomLoaded = true;
      console.log(roomList);
      emitChange(roomListeners);
    });
  },
  subscribe(listener) {
    roomListeners = [...roomListeners, listener];
    return () => {
      roomListeners = roomListeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return roomList;
  },
  getIsRoomLoaded() {
    return isRoomLoaded;
  },
};
