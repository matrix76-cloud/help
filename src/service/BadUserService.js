import {db, auth, storage} from '../api/config';
import { collection, getDocs, query, updateDoc,where,doc,setDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const add_baduser= async({USER_ID, STORE_ID}) =>{    
    const badRef = doc(collection(db, "BADUSER"));
    const id = badRef.id;
    const newbaduser= {
        BADUSER_ID : id,
        USER_ID :USER_ID,
        STORE_ID: STORE_ID,
        REGISTDATE : Date.now(),   
    }
    try{
        await setDoc(badRef, newbaduser);
    }catch(e){
        console.log("error", e.message);
    }finally{
        return id;
    }
   

}

export const get_badalluser = async({STORE_ID})=>{

    const reviewRef = collection(db, "BADUSER");

    const q = query(reviewRef, where("STORE_ID", '==', STORE_ID));

    let baduserlist = [];

    try{
        const querySnapshot =  await getDocs(q);
        querySnapshot.forEach(function (doc) {
            baduserlist.push(doc.data());   
        });

    }catch(e){
        console.log("error", e.message);
    }finally{
        return new Promise((resolve, resject)=>{
            resolve(baduserlist);
        }) 
    }  
}

export const get_baduser = async({USER_ID,STORE_ID})=>{

    const reviewRef = collection(db, "BADUSER");

    const q = query(reviewRef, where("STORE_ID", '==', STORE_ID));

    let baduserlist = [];

    try{
        const querySnapshot =  await getDocs(q);
        querySnapshot.forEach(function (doc) {    

            if (doc.data().USER_ID == USER_ID) {
                baduserlist.push(doc.data());      
            }
    
        });

    }catch(e){
        console.log("error", e.message);
    }finally{
        return new Promise((resolve, resject)=>{
            resolve(baduserlist);
        }) 
    }  
}

export const delete_baduser = async({BADUSER_ID})=>{
  
    const baduserRef = doc(db, "BADUSER", BADUSER_ID);

    try{
        await deleteDoc(baduserRef);
    }catch(e){
        console.log("error", e.message);
    }finally{
        return;
    }
}


