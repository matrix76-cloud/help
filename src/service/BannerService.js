import {db, auth, storage} from '../api/config';
import { collection, getDocs, query, updateDoc,where,doc,setDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



export const get_banner1 = async() =>{
    const bannerRef = collection(db, "BANNER1");
    let banner1list = [];

    const rows = query(bannerRef);
    try{
        const querySnapshot =  await getDocs(rows);
        querySnapshot.forEach(function (doc) {          
            banner1list.push(doc.data().BANNER1_URL);
        });

    }catch(e){

    }finally{
        return new Promise((resolve, resject)=>{
            resolve(banner1list);
        }) 
    } 
}
export const get_banner2 = async() =>{
    const banner2Ref = collection(db, "BANNER2");
    let banner2list = [];

    const rows = query(banner2Ref);
    try{
        const querySnapshot =  await getDocs(rows);
        querySnapshot.forEach(function (doc) {          
            banner2list.push(doc.data().BANNER2_URL);
        });

    }catch(e){

    }finally{
        return new Promise((resolve, resject)=>{
            resolve(banner2list);
        }) 
    } 
}