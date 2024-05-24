import {db, auth, storage} from '../api/config';
import { collection, getDocs, query, updateDoc,where,doc,setDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const get_checkuser = async({USER_ID})=>{

    const checkuserRef = collection(db, "CHECKUSER");

    const q = query(checkuserRef, where("USER_ID",'==',  USER_ID));

    let checklist = [];

    try{
        const querySnapshot =  await getDocs(q);
        querySnapshot.forEach(function (doc) {    
            checklist.push(doc.data());      
        });

    }catch(e){

    }finally{
        return new Promise((resolve, resject)=>{
            resolve(checklist);
        }) 
    }  
}

export const get_checkuserForname = async ({ CHECKID }) => {
  const checkuserRef = collection(db, "CHECKUSER");

  const q = query(checkuserRef, where("CHECKID", "==", CHECKID));

  let checkitem = {};

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(function (doc) {
      checkitem = doc.data();
    });
  } catch (e) {
  } finally {
    return new Promise((resolve, resject) => {
      resolve(checkitem);
    });
  }
};
export const get_checkuserForcheckname = async ({ CHECKUSERNAME }) => {
  const checkuserRef = collection(db, "CHECKUSER");

  const q = query(checkuserRef, where("CHECKUSERNAME", "==", CHECKUSERNAME));

  let checkitem = {};

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(function (doc) {
      checkitem = doc.data();
    });
  } catch (e) {
  } finally {
    return new Promise((resolve, resject) => {
      resolve(checkitem);
    });
  }
};
export const update_checkuser = async({CHECKUSER_ID, CHECKSTATUS}) =>{
 
    const checkuserRef = collection(db, "CHECKUSER");

    const rows = query(checkuserRef, where("CHECKUSER_ID",'==', CHECKUSER_ID ));

    try{
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach(function (doc) {
            updateDoc(doc.ref, {
                CHECKSTATUS  : CHECKSTATUS,
            });
        });
     

    }catch(e){
         console.log("error", e.message);
    }finally{
        return;
    }

}
export const update_checkuser2 = async({CHECKUSER_ID, CHECKCHAT}) =>{
 
    const checkuserRef = collection(db, "CHECKUSER");

    const rows = query(checkuserRef, where("CHECKUSER_ID",'==', CHECKUSER_ID ));

    try{
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach(function (doc) {
            updateDoc(doc.ref, {
                CHECKCHAT  : CHECKCHAT,
            });
        });
     

    }catch(e){
         console.log("error", e.message);
    }finally{
        return;
    }

}
export const update_checkuserinfo = async ({
  CHECKUSER_ID,
  CHECKAGE,
  CHECKBODY,
  CHECKENDTIME,
  CHECKHEIGHT,
  CHECKID,
  CHECKSTARTTIME,
  CHECKUSERNAME,
}) => {
  const checkuserRef = collection(db, "CHECKUSER");

  const rows = query(checkuserRef, where("CHECKUSER_ID", "==", CHECKUSER_ID));

  try {
    const querySnapshot = await getDocs(rows);

    querySnapshot.forEach(function (doc) {
      updateDoc(doc.ref, {
        CHECKAGE: CHECKAGE,
        CHECKBODY: CHECKBODY,
        CHECKENDTIME: CHECKENDTIME,
        CHECKHEIGHT: CHECKHEIGHT,
        CHECKID: CHECKID,
        CHECKSTARTTIME: CHECKSTARTTIME,
        CHECKUSERNAME: CHECKUSERNAME,
      });
    });
  } catch (e) {
    console.log("error", e.message);
  } finally {
    return;
  }
};
export const uploadImage = async ({ uri, email }) => {
  console.log("uploadImage", email, uri);
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };

    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };

    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return new Promise((resolve, reject) => {
    const imagefile = "images/" + email + ".png";
    const spaceRef = ref(storage, imagefile);

    uploadBytes(spaceRef, blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // blob.close(); 주석을 임시로 삭제
        resolve(url);
      });
    });
  });
};

export const add_checkuser = async ({
  CHECKAGE,
  CHECKBODY,
  CHECKENDTIME,
  CHECKHEIGHT,
  CHECKID,
  CHECKSTARTTIME,
  CHECKUSERNAME,
  DEVICEID,
  USER_ID,
  IMG,
}) => {
  const checkuserRef = doc(collection(db, "CHECKUSER"));
  const id = checkuserRef.id;
  const newcheckuser = {
    CHECKUSER_ID: id,
    CHECKAGE,
    CHECKBODY,
    CHECKENDTIME,
    CHECKHEIGHT,
    CHECKID,
    CHECKSTARTTIME,
    CHECKUSERNAME,
    DEVICEID: DEVICEID,
    USER_ID: USER_ID,
    CHECKCHAT: false,
    CHECKSTATUS:'출근전',
    IMG
  };
  try {
    await setDoc(checkuserRef, newcheckuser);
  } catch (e) {
    console.log("error", e.message);
  } finally {
    return id;
  }
};

