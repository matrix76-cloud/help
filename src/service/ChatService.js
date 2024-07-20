import { db, auth, storage, firebaseConfig, firebaseApp } from "../api/config";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
  setDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ChatType } from "../utility/contentDefine";

const authService = getAuth(firebaseApp);

export const get_channel = async ({ OTHERID, SELFID,TYPE }) => {
    const channelRef = collection(db, "CHANNEL");

    const q = query(channelRef, where("TYPE", "==", TYPE));
    let bSuccess = false;
    
    let channelinfo = {};

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(function (doc) {

      if (doc.data().ALLUSER[0] == OTHERID && doc.data().ALLUSER[1] == SELFID) {
            channelinfo = doc.data();
            bSuccess = true;   
      } else if (doc.data().ALLUSER[0] == SELFID && doc.data().ALLUSER[1] == OTHERID) {
        channelinfo = doc.data();
        bSuccess = true;
      }

      // const FindIndex = doc.data().ALLUSER.findIndex(x => x == OTHERID && x == SELFID);
      // if (FindIndex != -1) {
      //   channelinfo = doc.data();
      //   bSuccess = true;   
      // }

    });
  } catch (e) {
    console.log("error", e.message);
  } finally {
      return new Promise((resolve, resject) => {
        
          if (bSuccess) {
              resolve(channelinfo);   
          } else {
              resolve(-1);
          }

    });
  }
};
export const get_groupchannel = async ({ USERID }) => {
  const channelRef = collection(db, "CHANNEL");

    const q = query(
      channelRef,
      where("OWNERID", "==", USERID),
      where("TYPE", "==", ChatType.GROUP)
    );
  let bSuccess = false;

  let channelinfo = {};

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(function (doc) {
      channelinfo = doc.data();
      bSuccess = true;
    });
  } catch (e) {
    console.log("error", e.message);
  } finally {
    return new Promise((resolve, resject) => {
      if (bSuccess) {
        resolve(channelinfo);
      } else {
        resolve(-1);
      }
    });
  }
};

export const get_channelInfo = async ({ CHANNEL_ID }) => {
  const channelRef = collection(db, "CHANNEL");

  const q = query(channelRef, where("CHANNEL_ID", "==", CHANNEL_ID));
  let bSuccess = false;

  let channelinfo = {};

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(function (doc) {
      channelinfo = doc.data();
      bSuccess = true;
    });
  } catch (e) {
    console.log("error", e.message);
  } finally {
    return new Promise((resolve, resject) => {
      if (bSuccess) {
        resolve(channelinfo);
      } else {
        resolve(-1);
      }
    });
  }
};

export const get_allchannel = async ({USERID}) => {
  const channelRef = collection(db, "CHANNEL");

  const q = query(channelRef);
  let bSuccess = false;
  let channelitems = [];

  try {
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach(function (doc) {
        channelitems.push(doc.data());
    

    });
  } catch (e) {
    console.log("error", e.message);
  } finally {
    return new Promise((resolve, resject) => {
      if (bSuccess) {
        resolve(channelitems);
      } else {
        resolve(channelitems);
      }
    });
  }
};

export const createChannel = async ({ type, OWNERID, ALLUSER }) => {
  const channelsRef = doc(collection(db, "CHANNEL"));
  const id = channelsRef.id;
  const newChannel = {
    CHANNEL_ID: id,
    TYPE: type,
    OWNERID: OWNERID,
    ALLUSER: ALLUSER,
    CREATEDAT: Date.now(),
  };

  try {
    await setDoc(channelsRef, newChannel);
  } catch (e) {
    console.log("error", e.message);
  } finally {
    return id;
  }
};
export const createCheckerChannel = async ({
  type,
  OWNERID,
  ALLUSER,
  CHECKUSERNAME,
}) => {
  const channelsRef = doc(collection(db, "CHANNEL"));
  const id = channelsRef.id;
  const newChannel = {
    CHANNEL_ID: id,
    TYPE: type,
    OWNERID: OWNERID,
    ALLUSER: ALLUSER,
    CHECKUSERNAME: CHECKUSERNAME,
    CREATEDAT: Date.now(),
  };

  try {
    await setDoc(channelsRef, newChannel);
  } catch (e) {
    console.log("error", e.message);
  } finally {
    return id;
  }
};
export const updateChannel = async ({ ALLUSER, CHANNEL_ID }) => {


  const channelRef = collection(db, "CHANNEL");
  const rows = query(channelRef, where("CHANNEL_ID", "==", CHANNEL_ID));
  try {
    const querySnapshot = await getDocs(rows);

    querySnapshot.forEach(function (doc) {
      console.log("doc exist");

      updateDoc(doc.ref, {
        ALLUSER: ALLUSER,
      });
    });
  } catch (e) {
    console.log("error", e.message);
  } finally {
  }
};


// export const createGroup = async ({ title, description }) => {
//   const groupsRef = doc(collection(db, "GROUPS"));
//   const id = groupsRef.id;
//   const newGroup = {
//     GROUP_ID: id,
//     TITLE: title,
//     DESCRIPTION: description,
//     CREATEDAT: Date.now(),
//   };

//   try {
//     await setDoc(groupsRef, newGroup);
//   } catch (e) {
//     console.log("error", e.message);
//   } finally {
//     return id;
//   }
// };


export const createMessage = async ({ CHANNEL_ID, msg, user,read,ALLUSER,IMGTYPE }) => {
  const messageRef = doc(collection(db, `CHANNEL/${CHANNEL_ID}/messages`));
  const id = messageRef.id;


  const newMessage = {
    MESSAGE_ID: id,
    TEXT: msg,
    CREATEDAT: Date.now(),
    USER: user,
    READ:read,
    ALLUSER: ALLUSER,
    IMGTYPE,
  };

  try {
    await setDoc(messageRef, newMessage);
  } catch (e) {
    console.log("error", e.message);
  }
};
export const createIntroMessage = async ({
  CHANNEL_ID,
  msg,
  CHAT_CONTENT_TYPE,
  user,
}) => {
  const messageRef = doc(collection(db, `CHANNEL/${CHANNEL_ID}/messages`));
  const id = messageRef.id;

  const newMessage = {
    MESSAGE_ID: id,
    TEXT: msg,
    CHAT_CONTENT_TYPE: CHAT_CONTENT_TYPE,
    CREATEDAT: Date.now(),
    USER: user,
  };

  try {
    await setDoc(messageRef, newMessage);
  } catch (e) {
    console.log("error", e.message);
  }
};


export const createMainMessage = async ({ CHANNEL_ID, msg, user }) => {
  console.log("message", msg);

  const channelRef = collection(db, "CHANNEL");
  const rows = query(channelRef, where("CHANNEL_ID", "==", CHANNEL_ID));
  try {
    const querySnapshot = await getDocs(rows);

    querySnapshot.forEach(function (doc) {
      console.log("doc exist");

      updateDoc(doc.ref, {
        TITLE: msg,
        CREATEDAT: Date.now(),
      });
    });
  } catch (e) {
    console.log("error", e.message);
  } finally {
  }
};

// export const createGroupMessage = async ({ channelId, message }) => {
//   const messageRef = doc(collection(db, `GROUP/${channelId}/messages`));

//   const newMessage = {
//     ...message,
//     createdAt: Date.now(),
//   };

//   try {
//     await setDoc(messageRef, newMessage);
//   } catch (e) {
//     console.log("error", e.message);
//   }
// };

