import {db, auth, storage} from '../api/config';
import { collection, getDocs, query, updateDoc,where,doc,setDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



export const get_popup = async()=>{  
    let popupitem = {};

    const popupRef = collection(db, "POPUP");

    const q = query(popupRef);

    try{
        const querySnapshot =  await getDocs(q);
        querySnapshot.forEach(function (doc) {    
        
            popupitem = doc.data();
            
               
        });

    }catch(e){
        console.log("error", e.message);
    }finally{
        return new Promise((resolve, resject)=>{
            resolve(popupitem);
        }) 
    }  
}
export const update_popupcheck = async({DEVICEID}) =>{
 
    const tokendeviceRef = collection(db, "DEVICETOKEN");

    const rows = query(tokendeviceRef, where("DEVICEID",'==', DEVICEID ));

    try{
        const querySnapshot =  await getDocs(rows);

        querySnapshot.forEach(function (doc) {
            updateDoc(doc.ref, {
                CHECKDATE  : new Date().getDate() +1,
            });
        });
     

    }catch(e){
         console.log("error", e.message);
    }finally{
        return;
    }

}