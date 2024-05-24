import {db, auth, storage} from '../api/config';
import { collection, getDocs, query, updateDoc,where,doc,setDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const add_review= async({USER,STORENAME,STOREIMAGEARY,USER_NICKNAME, STORE_ID, CONTENTS, ITEMS}) =>{    
    const reviewRef = doc(collection(db, "REVIEW"));
    const id = reviewRef.id;
    const newreview= {
        REVIEW_ID : id,
        USER_ID :USER,
        USER_NICKNAME :USER_NICKNAME,
        STORE_ID: STORE_ID,
        STORENAME : STORENAME,
        STOREIMAGEARY : STOREIMAGEARY,
        CONTENTS: CONTENTS,
        ITEMS: ITEMS,
        REVIWCONTENTS_SECURITY:false,
        REGISTDATE : Date.now(),   
    }
    try{
        await setDoc(reviewRef, newreview);
    }catch(e){
        console.log("error", e.message);
    }finally{
        return id;
    }
   

}

export const get_review = async({STORE_ID})=>{

    const reviewRef = collection(db, "REVIEW");

    const q = query(reviewRef, where("STORE_ID",'==',  STORE_ID));

    let reviewlist = [];

    try{
        const querySnapshot =  await getDocs(q);
        querySnapshot.forEach(function (doc) {    
            reviewlist.push(doc.data());      
        });

    }catch(e){
        console.log("error", e.message);
    }finally{
        return new Promise((resolve, resject)=>{
            resolve(reviewlist);
        }) 
    }  
}

export const get_reviewForUser = async({USER_ID})=>{

    const reviewRef = collection(db, "REVIEW");

    const q = query(reviewRef, where("USER_ID",'==',  USER_ID));

    let reviewlist = [];

    try{
        const querySnapshot =  await getDocs(q);
        querySnapshot.forEach(function (doc) {    
            reviewlist.push(doc.data());      
        });

    }catch(e){
        console.log("error", e.message);
    }finally{
        return new Promise((resolve, resject)=>{
            resolve(reviewlist);
        }) 
    }  
}


export const get_reviews= async()=>{

    const reviewRef = collection(db, "REVIEW");
    const q = query(reviewRef);
    let reviewstore = [];
    try{
        const querySnapshot =  await getDocs(q);
        querySnapshot.forEach(function (doc) {   
            reviewstore.push(doc.data()); 
        });

    }catch(e){
        console.log("error", e.message);
    }finally{
        return new Promise((resolve, resject)=>{
            resolve(reviewstore);
        }) 
    }  
}

export const delete_review = async({REVIEW_ID})=>{
 
  
    const reviewRef = doc(db, "REVIEW", REVIEW_ID);

    try{
        await deleteDoc(reviewRef);
    }catch(e){
        console.log("error", e.message);
    }finally{
        return;
    }
}
export const update_review = async({CONTENTS, REVIEW_ID}) =>{

    const reviewRef = collection(db, "REVIEW");

    const rows = query(reviewRef, where("REVIEW_ID",'==', REVIEW_ID ));

    try{
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach(function (doc) {
            updateDoc(doc.ref, {
                CONTENTS: CONTENTS,
                REGISTDATE: Date.now(),  
            });
        });
     

    }catch(e){
         console.log("error", e.message);
    }finally{
        return;
    }

}

export const update_review2 = async({SECURITY, REVIEW_ID}) =>{

    const reviewRef = collection(db, "REVIEW");

    const rows = query(reviewRef, where("REVIEW_ID",'==', REVIEW_ID ));

    try{
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach(function (doc) {
            updateDoc(doc.ref, {
                REVIWCONTENTS_SECURITY: SECURITY,
                REGISTDATE: Date.now(),  
            });
        });
     

    }catch(e){
         console.log("error", e.message);
    }finally{
        return;
    }

}


