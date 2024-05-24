import {db, auth, storage} from '../api/config';
import { collection, getDocs, query, updateDoc,where,doc,setDoc, deleteDoc, orderBy, arrayUnion, arrayRemove } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const get_stores= async() =>{
    const storeRef = collection(db, "STORE");
    const q = query(storeRef);
 
    let storelist= [];

    let success = false;
    try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            if(doc.data().STORESTATUS =='regist'){
                storelist.push(doc.data());
            }
        
        });
    
        if(querySnapshot.size > 0){
            success = true;
        }

    }catch(e){

    }finally{

        return new Promise((resolve, resject)=>{
            if(success){
                resolve(storelist);
            }else{
                resolve(null);
            }
            
        }) 

    }
   

}

export const get_storeinfoForSTOREID = async({STORE_ID}) =>{
   
    const userRef = collection(db, "STORE");
    
    const q = query(userRef, where("STORE_ID",'==', STORE_ID));
 
    let storeitem = null;

    let success = false;
    try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            storeitem =  doc.data();
        });
    
        if(querySnapshot.size > 0){
            success = true;
        }

    }catch(e){

    }finally{

        return new Promise((resolve, resject)=>{
            if(success){
                resolve(storeitem);
            }else{
                resolve(null);
            }
            
        }) 

    }
   

}
export const get_storeinfoForUSERID = async({USER_ID}) =>{
   
    const userRef = collection(db, "STORE");
    
    const q = query(userRef, where("USER_ID",'==', USER_ID));
 
    let storeitem = null;

    let success = false;
    try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            storeitem =  doc.data();
        });
    
        if(querySnapshot.size > 0){
            success = true;
        }

    }catch(e){

    }finally{

        return new Promise((resolve, resject)=>{
            if(success){
                resolve(storeitem);
            }else{
                resolve(null);
            }
            
        }) 

    }
   

}


export const updateheartonstore = async({shopdata, USER_ID}) =>{

    const storeRef = collection(db, "STORE");



    const rows = query(storeRef, where("STORE_ID",'==', shopdata.STORE_ID ));

    try{
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach(function (doc) {
            updateDoc(doc.ref, {
                HEARTUSER : arrayUnion(USER_ID),              
                REGISTDATE : Date.now(),
            });
        });
     

    }catch(e){
         console.log("error", e.message);
    }finally{
        return true;
    }

}
export const updateheartoffstore = async({shopdata, USER_ID}) =>{

    const storeRef = collection(db, "STORE");



    const rows = query(storeRef, where("STORE_ID",'==', shopdata.STORE_ID ));

    try{
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach(function (doc) {
            updateDoc(doc.ref, {
                HEARTUSER : arrayRemove(USER_ID),              
                REGISTDATE : Date.now(),
            });
        });
     

    }catch(e){
         console.log("error", e.message);
    }finally{



        return false;
    }

}

export const updatecouponestore = async ({ STORE_ID, STORECOUPONEAMOUNT }) => {
    
    const storeRef = collection(db, "STORE");

    const rows = query(storeRef, where("STORE_ID",'==', STORE_ID ));

    try{
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach(function (doc) {
            updateDoc(doc.ref, {
                STORECOUPONEAMOUNT : STORECOUPONEAMOUNT,              
            });
        });
     

    }catch(e){
         console.log("error", e.message);
    } finally {

        return;
    }

}


export const updategroupchatsettingstore = async ({ STORE_ID, STOREGROUPCHAT }) => {
    


    const storeRef = collection(db, "STORE");

    const rows = query(storeRef, where("STORE_ID",'==', STORE_ID ));

    try{
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach(function (doc) {
            updateDoc(doc.ref, {  
                STOREGROUPCHAT : STOREGROUPCHAT,
            });
        });
     

    }catch(e){
         console.log("error", e.message);
    } finally {

        return;
    }

}

export const updatechatsettingstore = async ({ STORE_ID, STORECHAT }) => {
    


    const storeRef = collection(db, "STORE");

    const rows = query(storeRef, where("STORE_ID",'==', STORE_ID ));

    try{
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach(function (doc) {
            updateDoc(doc.ref, {
                STORECHAT : STORECHAT,              
            });
        });
     

    }catch(e){
         console.log("error", e.message);
    } finally {

        return;
    }

}

export const updatecouponsettingstore = async ({ STORE_ID, STORECOUPONECONTENT, STORECOUPONEMONEY,STORECOUPONEAMOUNT }) => {
    


    const storeRef = collection(db, "STORE");

    const rows = query(storeRef, where("STORE_ID",'==', STORE_ID ));

    try{
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach(function (doc) {
            updateDoc(doc.ref, {
                STORECOUPONECONTENT : STORECOUPONECONTENT,  
                STORECOUPONEMONEY :STORECOUPONEMONEY,
                STORECOUPONEAMOUNT : STORECOUPONEAMOUNT

            });
        });
     

    }catch(e){
         console.log("error", e.message);
    } finally {

        return;
    }

}

export const get_heartstorescount= async() =>{
    const storeRef = collection(db, "STORE");
    const q = query(storeRef);
    let heartusers= [];
    let success = false;
    let heartcount = 0;
    try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            if(doc.data().STORESTATUS =='regist' ){

                if(doc.data().HEARTUSER != undefined){
                    heartusers = doc.data().HEARTUSER;
                    heartcount = heartusers.length;
                    success = true;

                }
       
             
            }
        
        });
  

    }catch(e){

    }finally{

        return new Promise((resolve, resject)=>{
            if(success){
                resolve(heartcount);
            }else{
                resolve(0);
            }
            
        }) 

    }
   

}

export const get_heartstores= async() =>{
    const storeRef = collection(db, "STORE");
    const q = query(storeRef);
    let heartusers= [];
    let success = false;

    try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

            if(doc.data().STORESTATUS =='regist' ){

                if(doc.data().HEARTUSER != undefined){
                    heartusers.push(doc.data().HEARTUSER);
                    success = true;
                }
       
             
            }
        
        });
  

    }catch(e){

    }finally{

        return new Promise((resolve, resject)=>{
            if(success){
                resolve(heartusers);
            }else{
                resolve(heartusers);
            }
            
        }) 

    }
   

}

export const get_heartstore= async({storedata, USER_ID}) =>{



    const storeRef = collection(db, "STORE");


    const rows = query(storeRef, where("STORE_ID",'==', storedata.STORE_ID ));

    let success = false;
    let heartusers = [];
    try{
     
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach((doc) => {

            if(doc.data().STORESTATUS =='regist' ){

                if(doc.data().HEARTUSER != undefined){
                    heartusers = doc.data().HEARTUSER;

   
                    const FindIndex = heartusers.findIndex(x=> x == USER_ID );
                    if(FindIndex != -1){
    
                        success = true;
                    }

                }
       
             
            }
        
        });
  

    }catch(e){

    }finally{

        return new Promise((resolve, resject)=>{
            if(success){
                resolve(success);
            }else{
                resolve(success);
            }
            
        }) 

    }

}

export const get_storeinfoForLng = async({latitude, longitude}) =>{
   
    const userRef = collection(db, "STORE");


    
    const q = query(userRef);
 
    let storeitem = null;

    let success = false;
    try{
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {

           // storeitem = doc.data();

            if(Math.trunc(latitude * 100)  == Math.trunc(doc.data().STORELATITUDE * 100)  )
            {
                if(Math.trunc(longitude * 100) == Math.trunc(doc.data().STORELONGITUDE * 100)  ){
                    storeitem = doc.data();
                }
            }

            // if((Math.trunc(doc.data().STORELATITUDE  * 100) /100)) == Math.trunc(latitude * 100) / 100 )
            // && (Math.trunc(doc.data().STORELONGITUDE * 100) / 100 == Math.trunc(longitude * 100) / 100){
            //     storeitem = doc.data();
            // }
        });
    
        if(querySnapshot.size > 0){
            success = true;
        }

    }catch(e){

    }finally{

        return new Promise((resolve, resject)=>{
            if(success){
                resolve(storeitem);
            }else{
                resolve(null);
            }
            
        }) 

    }
   

}

export const regist_storeview= async({STORE, deviceid}) =>{


    const storeviewRef = doc(collection(db, "STOREVIEW"));
    const id = storeviewRef.id;
    const newstoreview = {
        STOREVIEW_ID: id,
        DEVICE_ID: deviceid,
        STORE_ID: STORE.STORE_ID,
        STORE: STORE
    };
    try{
        await setDoc(storeviewRef, newstoreview);
    }catch(e){
        console.log("error", e.message);
    }finally{
        return id;
    }
}
export const get_storeviewcheck = async({STORE_ID, deviceid})=>{
    let productlist = [];

    const storeRef = collection(db, "STOREVIEW");

    const rows = query(storeRef, where("DEVICE_ID",'==', deviceid ));

    try{
        const querySnapshot =  await getDocs(rows);
        querySnapshot.forEach(function (doc) {  

            if(STORE_ID == doc.data().STORE_ID){
                productlist.push(doc.data());
            }
           
        });

    }catch(e){
        console.log("error", e.message);
    }finally{
        return new Promise((resolve, resject)=>{
            resolve(productlist);
        }) 
    } 
}

export const get_storeallview = async({deviceid})=>{
    let productlist = [];

    const storeRef = collection(db, "STOREVIEW");

    const rows = query(storeRef, where("DEVICE_ID",'==', deviceid ));

    try{
        const querySnapshot =  await getDocs(rows);
        querySnapshot.forEach(function (doc) {    
            productlist.push(doc.data());
           
        });

    }catch(e){
        console.log("error", e.message);
    }finally{
        return new Promise((resolve, resject)=>{
            resolve(productlist);
        }) 
    } 
}