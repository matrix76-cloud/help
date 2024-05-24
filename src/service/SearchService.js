import moment from 'moment';
import axios from "axios";
import { get_reviews, get_reviewstore } from './ReviewService';

export const TagFilterSearch = ({resultitems, tag})=>{


    let searchItems = [];

    resultitems.map((data, index)=>{


        const FindIndex = data.STOREFILTER.findIndex(x=>x == tag);

        if(FindIndex != -1){
            searchItems.push(data);
        }
    })
    return searchItems;
}
export const ThemaFilterSearch = ({resultitems, thema})=>{
    let searchItems = [];
    resultitems.map((data, index)=>{
        const FindIndex = data.STORETHEMAARY.findIndex(x=>x == thema);

        if(FindIndex != -1){
            searchItems.push(data);
        }
    })
    return searchItems;
}
export const ThemaFilterArySearch = async({resultitems, themaary})=>{
    let searchItems = [];

    if(themaary.length == 0){
        return resultitems;
    }
    let applythemaary = [];
    themaary.map((data, index)=>{
    if(data == '여자관리사'){
        applythemaary.push('female');
        }else if(data == '남자관리사'){
            applythemaary.push('male');
        }else if(data == '20대관리사'){
            applythemaary.push('two');
        }else if(data == '30대관리사'){
            applythemaary.push('three');
        }else if(data == '40대관리사'){
            applythemaary.push('four');
        }else if(data == '주차가능'){
            applythemaary.push('car');
        }else if(data == '수면가능'){
            applythemaary.push('sleep');
        }else if(data == '샤워가능'){
            applythemaary.push('shower');
        }else if(data == '1인1실'){
            applythemaary.push('oneshop');
        }else if(data == '단체환영'){
            applythemaary.push('group');
        }else if(data == '커플환영'){
            applythemaary.push('couple');
        }else if(data == '남성전용'){
            applythemaary.push('male');
        }else if(data == '여성전용'){
            applythemaary.push('female');
        }else if(data == '남녀공용샵'){
            applythemaary.push('allhour');
        }
    })



    resultitems.map((data, index)=>{
        if(data.STOREFILTER.length > 0){
            const intersection = data.STORETHEMAARY.filter(x=>applythemaary.includes(x));
            if(intersection.length != 0){
                searchItems.push(data);
            }
        }
  
    })
    return searchItems;
}
export const PreferenceFilterArySearch = async({resultitems, preferenceary})=>{
    let searchItems = [];
    let applytary = [];
    if(preferenceary.length == 0){
        return resultitems;
    }

    const reviewlist = await get_reviews();
    reviewlist.map(async(data, index)=>{
        const intersection = data.ITEMS.filter(x=>preferenceary.includes(x));
        if(intersection.length > 0){
            applytary.push(data);
        }
      
    })


    resultitems.map((data, index)=>{
        const FindIndex = applytary.findIndex(x => x.STORE_ID == data.STORE_ID);
        if(FindIndex != -1){
            searchItems.push(data);
        }
  
    })
    return searchItems;
}

export const PriceFilterArySearch = async({resultitems, priceary}) =>{

    let applypriceary = [];
    let searchItems = [];

    if(priceary.length == 0){
        return resultitems;
    }
    priceary.map((data, index)=>{

        let money = {
            startmoney : 0,
            endmoney : 0
        }
        if(data == '1-3만원'){
            money.startmoney = 10000;
            money.endmoney = 30000;
        }else if(data == '3-5만원'){
            money.startmoney = 30000;
            money.endmoney = 50000;
        }else if(data == '5-8만원'){
            money.startmoney = 50000;
            money.endmoney = 80000;   
        }else if(data == '8-10만원'){
            money.startmoney = 80000;
            money.endmoney = 100000;    
        }else if(data == '10-15만원'){
            money.startmoney = 100000;
            money.endmoney = 150000;     
        }else if(data == '15만원이상'){
            money.startmoney = 150000;
            money.endmoney = 1000000;      
        }
        applypriceary.push(money);

    })

    resultitems.map((data, index)=>{

        applypriceary.map((money, index2)=>{
            if(
             Number(data.STOREREPRESENTIVEPRICE) >= money.startmoney
            &&  Number(data.STOREREPRESENTIVEPRICE) <= money.endmoney){
             
                searchItems.push(data);
            }
       

        })

    })

    return searchItems;
}

