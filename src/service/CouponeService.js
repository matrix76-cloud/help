import {db, auth, storage} from '../api/config';
import { collection, getDocs, query, updateDoc,where,doc,setDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const get_coupone = async({USER_ID})=>{

    const couponeRef = collection(db, "COUPONEMEMBER");

    const q = query(couponeRef, where("USER_ID",'==',  USER_ID));


    let couponelist = [];

    try{
        const querySnapshot =  await getDocs(q);
        querySnapshot.forEach(function (doc) {    
            couponelist.push(doc.data());      
        });

    }catch(e){

    }finally{
        return new Promise((resolve, resject)=>{
            resolve(couponelist);
        }) 
    }  
}

export const get_storecoupone = async({STORE_ID})=>{

    const couponeRef = collection(db, "COUPONESTORE");

    const q = query(couponeRef, where("STORE_ID",'==',  STORE_ID));

    let couponelist = [];

    try{
        const querySnapshot =  await getDocs(q);
        querySnapshot.forEach(function (doc) {    
            couponelist.push(doc.data());      
        });

    }catch(e){

    }finally{
        return new Promise((resolve, resject)=>{
            resolve(couponelist);
        }) 
    }  
}

export const get_enablestorecoupone = async({STORE_ID})=>{

    const couponeRef = collection(db, "COUPONESTORE");

    const q = query(couponeRef, where("STORE_ID",'==',  STORE_ID));

    let couponelist = [];

    try{
        const querySnapshot =  await getDocs(q);
        querySnapshot.forEach(function (doc) {  
            
            if(doc.data().ENABLE == true){
                couponelist.push(doc.data());      
            }
         
        });

    }catch(e){

    }finally{
        return new Promise((resolve, resject)=>{
            resolve(couponelist);
        }) 
    }  
}

export const updatcouponemember = async({COUPONEDOC}) =>{
    
    const storeRef = collection(db, "COUPONEMEMBER");

    const rows = query(storeRef, where("COUPONEDOC",'==', COUPONEDOC ));

    try{
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach(function (doc) {
            updateDoc(doc.ref, {
                ENABLE :  false,        
            });
        });
     

    }catch(e){
         console.log("error", e.message);
    }finally{
        return;
    }

}
export const updatcouponestore = async({COUPONEDOC}) =>{

    const storeRef = collection(db, "COUPONESTORE");

    const rows = query(storeRef, where("COUPONEDOC",'==', COUPONEDOC ));

    try{
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach(function (doc) {
            updateDoc(doc.ref, {
                ENABLE :  false,        
            });
        });
     

    }catch(e){
         console.log("error", e.message);
    }finally{
        return;
    }

}

export const deletecouponestore = async({COUPONESTORE_ID})=>{

    console.log("deletecouponstore", COUPONESTORE_ID);
  
    const couponRef = doc(db, "COUPONESTORE", COUPONESTORE_ID);

    try{
        await deleteDoc(couponRef);
    }catch(e){
        console.log("error", e.message);
    }finally{
        return;
    }
}

export const add_couponemember= async({USER_ID, STORE_ID,COUPONECONTENT,COUPONEMONEY,STOREIMAGE,STORE_NAME,USER_NICKNAME,COUPONEDOC}) =>{    
    const couponeRef = doc(collection(db, "COUPONEMEMBER"));
    const id = couponeRef.id;
    const newcoupne= {
        COUPONEMEMBER_ID : id,
        COUPONECONTENT, 
        COUPONEDOC,
        COUPONEMONEY,
        ENABLE : true,
        REGISTDATE : Date.now(),
        STOREIMAGE,
        STORE_ID,
        STORE_NAME,
        USER_ID,
        USER_NICKNAME, 
    }
    try{
        await setDoc(couponeRef, newcoupne);
    }catch(e){
        console.log("error", e.message);
    }finally{
        return id;
    }
   

}
export const add_couponestore= async({USER_ID, STORE_ID,COUPONECONTENT,COUPONEMONEY,USER_NICKNAME,COUPONEDOC}) =>{    
    const couponeRef = doc(collection(db, "COUPONESTORE"));
    const id = couponeRef.id;
    const newcoupne= {
        COUPONESTORE_ID : id,
        USER_ID :USER_ID,
        STORE_ID: STORE_ID,
        REGISTDATE : Date.now(), 
        COUPONECONTENT,
        COUPONEDOC,
        COUPONEMONEY,
        ENABLE :true,
        USER_NICKNAME
    }
    try{
        await setDoc(couponeRef, newcoupne);
    }catch(e){
        console.log("error", e.message);
    }finally{
        return id;
    }
   

}


