
import moment from 'moment';
import axios from "axios";
import { get_storeallview, get_stores } from '../service/StoreService';
import { get_review } from '../service/ReviewService';
import { get_checkuser } from '../service/CheckService';

export const serverUrl = () =>{
	return "http://13.125.229.243:3000/"

}


export const validateEmail = email =>{
    const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
}	

export const removeWhitespace = text =>{
    const regex = /\s/g;
    return text.replace(regex, '');
}

export const getDateOrTime = ts =>{
    const now = moment().startOf('day');
    const target = moment(ts).startOf('day');
    return moment(ts).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
}
export const getDateFullTime = ts =>{
    const now = moment().startOf('day');
    const target = moment(ts).startOf('day');
    return moment(ts).format('YYYY.MM.DD HH:mm');
}

export const getDate = ts =>{
    const now = moment().startOf('day');
    const target = moment(ts).startOf('day');
    return moment(ts).format('YYYY.MM.DD');
}

export const getTime = ts =>{
    const now = moment().startOf('day');
    const target = moment(ts).startOf('day');
    return moment(ts).format('HH:mm');
}
export const getFullTime = ts =>{
    const now = moment().startOf('day');
    const target = moment(ts).startOf('day');
    return moment(ts).format();
}


export const PriceRateConvert = (price,saleprice) =>{

	if(price == ''){
		alert("정상가를 입력해주세요");
		return;
	}



	if(price == saleprice){
	//	setRepresentiveratio("0");

		return "0";
	}else{
		
		let ratio =  Number((1- (Number(saleprice) / Number(price))) * 100); 
	
		return Math.round(ratio);
	}
}

export const removeemail = text =>{
    const regex = /\s/g;
    return text.replace('@gmail.com', '');
}


export const CommaFormatted = (amount) => {
    let amount_ = Number(amount);

    return amount_.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
}

export const useSleep = delay => new Promise(resolve => setTimeout(resolve, delay));

export const KeywordAddress =(address)=>{

	let addr = [];
	addr = address.split(" ");

	return addr[0] + ' '+ addr[1] + ' ' + addr[2];
}

export const ArrayIncludeData = (arraydata, data)=>{

	if(data ==''){
		return false;
	}
    if(arraydata == undefined){
        return false;
    }
    const FindIndex = arraydata.findIndex(x=>x == data);

    return FindIndex == -1 ? false : true;
}

export const StartTimeCurrentTimeDiff = (start, end) =>{

    const current = new Date();

	// 현재 시간이 영업시작 시간 안에 들어오면서

	const CurrentHour = Number(current.getHours()); // 현재시간
	const CurrentMinutes = Number(current.getMinutes());

	const starttime_time = Number(start.substr(0,2));
	const starttime_minute = Number(start.substr(3,2));

	const endtime_time = Number(end.substr(0,2));
	const endtime_minute =Number(end.substr(3,2));



	// 시작 현재 시간 비교 24시간 전이라면

	if(starttime_time < CurrentHour){
		return true;
	}else if(starttime_time == CurrentHour){

		if(endtime_minute <= CurrentMinutes ){
			return true
		}
	}

	if(CurrentHour < endtime_time){
		return true;
	}else if(endtime_time == CurrentHour){

		if(endtime_minute >= CurrentMinutes ){
			return true
		}
	}

	return false;



	// if(Hour > starttime_time){
	// 	if(endtime_time > Hour){
	// 		console.log("1");
	// 		return true;
	// 	}else if(Hour == endtime_time){
	// 		if(endtime_minute >= Minutes ){
	// 			console.log("2");
	// 			return true
	// 		}else{
	// 			console.log("3");
	// 			return false;
	// 		}

	// 	}else{
	// 		console.log("4", Hour, starttime_time,endtime_time);
	// 		return false;
	// 	}
	// }else if(Hour == starttime_time){
	// 	if(Minutes >= starttime_minute){
		
	// 		if(endtime_time > Hour){
	// 			console.log("5");
	// 			return true;
	// 		}else if(Hour == endtime_time){
	// 			if(endtime_minute >= Minutes ){
	// 				console.log("6");
	// 				return true
	// 			}else{
	// 				console.log("7");
	// 				return false;
	// 			}
	
	// 		}else{
	// 			console.log("8");
	// 			return false;
	// 		}
	// 	}else{
	// 		console.log("9");
	// 		return false;
	// 	}
	// }else{

	// 	if(Hour < 12){
	// 		if(endtime_time > Hour){
	// 			console.log("1");
	// 			return true;
	// 		}else if(Hour == endtime_time){
	// 			if(endtime_minute >= Minutes ){
	// 				console.log("2");
	// 				return true
	// 			}else{
	// 				console.log("3");
	// 				return false;
	// 			}
	
	// 		}else{
	// 			console.log("4");
	// 			return false;
	// 		}
	// 	}
	// 	console.log("10");
	// 	return false;
	// }



}

export const SearchAddress = async(x, y) =>{    
	let addr ='https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x='+x+'&y='+y;
  
	let success = false;
	let data = {
		region1 : "",
		region2 : "",
		latitude :"",
		longitude : ""
	};
	try {
		let res = await axios
		  .get(
			addr,
			{
			  headers: {
				Authorization: 'KakaoAK 11ba702a58a4deb18f8dcd3f940d0a3d',  // REST API 키
			  },
		 
			},
		  )
		  .then(res => {
		
			data.region1 = res.data.documents[0].region_2depth_name;
			data.region2 = res.data.documents[0].region_3depth_name;
			data.longitude = x;
			data.latitude = y;
	  

			success= true;
	
		  });

	  } catch (error) {

		console.log(error.message);

	  }

	  return new Promise((resolve, reject)=>{
		if(success){
			resolve(data);
		}else{
			resolve(-1);
		}
	  })

}

// export const getAddressCoords = async(address) => {
// 	let addr ='https://dapi.kakao.com/v2/local/search/address.json?';

// 	console.log("address", address);
  
// 	let success = false;
// 	let data = {
// 		region1 : "",
// 		region2 : "",
// 		latitude :"",
// 		longitude : ""
// 	};
// 	try {
// 		let res = await axios
// 		  .get(
// 			addr,
// 			{
// 			  headers: {
// 				Authorization: 'KakaoAK 11ba702a58a4deb18f8dcd3f940d0a3d',  // REST API 키
// 				query : address,
// 			  },
		 
// 			},
// 		  )
// 		  .then(res => {
		
// 			console.log("res", res);
	  

// 			success= true;
	
// 		  });

// 	  } catch (error) {

// 		console.log(error.message);

// 	  }

// 	  return new Promise((resolve, reject)=>{
// 		if(success){
// 			resolve(data);
// 		}else{
// 			resolve(-1);
// 		}
// 	  })

//   };

export const distanceFunc = (lat1, lon1, lat2, lon2) => {
	const R = 6371; // 지구 반지름 (단위: km)
	const dLat = deg2rad(lat2 - lat1);
	const dLon = deg2rad(lon2 - lon1);
	const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			  Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
			  Math.sin(dLon/2) * Math.sin(dLon/2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	const distance = R * c; // 두 지점 간의 거리 (단위: km)
	return distance;
  }
  
  export const  deg2rad = (deg)=> {
	return deg * (Math.PI/180);
  }

  export const fn_smsShare =(phone) =>
	{
			var sBody = "[RELATION.CO.KR~~!! ]n"
			+ "안녕하세요. n"
			+ "마원 앱보고 문자드립니다.~n"
			+ "SMS 테스트 페이지 입니다.n"
			+ "n"
			+ "감사합니다.";
		
			sBody = sBody.replace(/(n|rn)/g,"%0a");
			return  "sms:"+phone+"?body=" + sBody;
  }
  export const fn_telShare =(phone) =>
	{
		// phone = phone.replace(
		// 	/(\d{2})(\d{3,4})(\d{4})/,
		// 	'$1-$2-$3'
		//   )
		return  "tel:"+phone;
  }
  export const convertSearchcategory = (searchfilter)=>{

	if(searchfilter =='korea'){
		return '한국';
	}
	if(searchfilter =='china'){
		return '중국';
	}
	if(searchfilter =='tileland'){
		return '태국';
	}
	if(searchfilter =='oneshop'){
		return '1인샵';
	}
	if(searchfilter =='wacksing'){
		return '왁싱';
	}
	if(searchfilter =='meridian'){
		return '경락';
	}
	if(searchfilter =='sports'){
		return '스포츠';
	}
	if(searchfilter =='aroma'){
		return '아로마';
	}
	if(searchfilter =='swedish'){
		return '스웨디시';
	}
	if(searchfilter =='foot'){
		return '발마사지';
	}
  }
  export const convertSearchthema = (searchfilter)=>{

	if(searchfilter =='car'){
		return '주차가능';
	}
	if(searchfilter =='shower'){
		return '샤워가능';
	}
	if(searchfilter =='oneshop'){
		return '1인1실';
	}
	if(searchfilter =='two'){
		return '20대관리사';
	}
	if(searchfilter =='three'){
		return '30대관리사';
	}
	if(searchfilter =='four'){
		return '40대관리사';
	}
	if(searchfilter =='couple'){
		return '커플가능';
	}
	if(searchfilter =='group'){
		return '단체가능';
	}
	if(searchfilter =='male'){
		return '남성전용';
	}
	if(searchfilter =='femal'){
		return '여성전용';
	}
  }

export const convertTo_security = (data) => {
	  
	let security = "사장님에의해 블라이드 처리된 댓글입니다";

	// for (var i = 0; i < data.length; i++){
   	// 	security += '*';
    // }

	return security;

  }

  export const getStoreData = async ({user, latitude, longitude}) =>{


	return new Promise(async (resolve, reject)=>{

		const stores = await get_stores();

		await useSleep(1000);

		console.log("stores", stores);
		let premiumshoplist = [],goldshoplist = [],silvershoplist = [], allshoplist = [];
	
		stores.map(async(data) => {
		  // const lat1 = "37.630013553801";
		  // const lon1 = "127.15545777991";
	
		  const lat1 = latitude;
		  const lon1 = longitude;
	
	
		  const lat2 = data.STORELATITUDE;
		  const lon2 = data.STORELONGITUDE;
		  const dist = distanceFunc(lat1, lon1, lat2, lon2);
	
		  console.log("policydistance",  dist, user.distance);
		  let policydistance = 0;
	
		  if (user.distance == "") {
			policydistance = 10;
		  } else {
			policydistance = user.distance;
		  }
		  if (dist <= policydistance) {
			if (data.STORELEVEL.indexOf("premium") != -1) {
			  data["dist"] = dist;
	
			  const STORE_ID = data.STORE_ID;
			  const reviewdata = await get_review({ STORE_ID });
		
			  data["reviewdata"] =reviewdata;
			  const USER_ID = data.USER_ID;
			  const checks = await get_checkuser({ USER_ID });
	
			  data["checks"] =checks;
			  premiumshoplist.push(data);

			  console.log("premium", data);
			}
			if (data.STORELEVEL.indexOf("gold") != -1) {
			  data["dist"] = dist;
	
			  const STORE_ID = data.STORE_ID;
			  const reviewdata = await get_review({ STORE_ID });
		
			  data["reviewdata"] =reviewdata;
			  const USER_ID = data.USER_ID;
			  const checks = await get_checkuser({ USER_ID });
	
			  data["checks"] =checks;
	
			  goldshoplist.push(data);
			}
			if (data.STORELEVEL.indexOf("silver") != -1) {
			  data["dist"] = dist;
	
			  const STORE_ID = data.STORE_ID;
			  const reviewdata = await get_review({ STORE_ID });
		
			  data["reviewdata"] =reviewdata;
			  const USER_ID = data.USER_ID;
			  const checks = await get_checkuser({ USER_ID });
	
			  data["checks"] =checks;
	
			  silvershoplist.push(data);
			}
			const STORE_ID = data.STORE_ID;
			const reviewdata = await get_review({ STORE_ID });
	  
			data["reviewdata"] =reviewdata;
			const USER_ID = data.USER_ID;
			const checks = await get_checkuser({ USER_ID });
	
			data["checks"] =checks;
			allshoplist.push(data);
	  
		  }
		});
	
		allshoplist.sort(function (a, b) {
		  // 오름차순
		  return parseInt(a.dist) < parseInt(b.dist)
			? -1
			: parseInt(a.dist) > parseInt(b.dist)
			? 1
			: 0;
		});
	
		premiumshoplist.sort(function (a, b) {
		  // 오름차순
		  return parseInt(a.dist) < parseInt(b.dist)
			? -1
			: parseInt(a.dist) > parseInt(b.dist)
			? 1
			: 0;
		});
	
		goldshoplist.sort(function (a, b) {
		  // 오름차순
		  return parseInt(a.dist) < parseInt(b.dist)
			? -1
			: parseInt(a.dist) > parseInt(b.dist)
			? 1
			: 0;
		});
		silvershoplist.sort(function (a, b) {
	
		  console.log("silvershop sort", parseFloat(a.dist),parseFloat(b.dist));
		  // 오름차순
		  return parseFloat(a.dist) < parseFloat(b.dist)
			? -1
			: parseFloat(a.dist) > parseFloat(b.dist)
			? 1
			: 0;
		});
		// allshoplist.map((data)=>{
		// 	user.storelist.push(data);
		// })
		// premiumshoplist.map((data)=>{

		// 	user.premiumshoplist.push(data);
		// })
		// goldshoplist.map((data)=>{
		// 	user.goldshoplist.push(data);
		// })
		
		// silvershoplist.map((data)=>{
		// 	user.silvershoplist.push(data);
		// })
	

	

		const deviceid = user.deviceid;
		const recentstoresTmp = await get_storeallview({ deviceid });
		user["storeviewlist"] = recentstoresTmp;
		user["storelist"] = allshoplist;
		user["premiumshoplist"] = premiumshoplist;
		user["goldshoplist"] = goldshoplist;
		user["silvershoplist"] = silvershoplist;
	
	
		console.log("user info", user);
	
	
	
		resolve(user);
	})
	
  }

  export const getStoreDB = async ({user, latitude, longitude}) =>{

	const stores = await get_stores();

	console.log("stores", stores);
	let premiumshoplist = [],goldshoplist = [],silvershoplist = [], allshoplist = [];

	stores.map(async (data) => {
		// const lat1 = "37.630013553801";
		// const lon1 = "127.15545777991";

		const lat1 = latitude;
		const lon1 = longitude;


		const lat2 = data.STORELATITUDE;
		const lon2 = data.STORELONGITUDE;
		const dist = distanceFunc(lat1, lon1, lat2, lon2);


		let policydistance = 0;

		if (user.distance == "") {
		policydistance = 10;
		} else {
		policydistance = user.distance;
		}
		if (dist <= policydistance) {
		if (data.STORELEVEL.indexOf("premium") != -1) {
			data["dist"] = dist;

			const STORE_ID = data.STORE_ID;
			const reviewdata = await get_review({ STORE_ID });
	
			data["reviewdata"] =reviewdata;
			const USER_ID = data.USER_ID;
			const checks =  await get_checkuser({ USER_ID });

			data["checks"] =checks;
			premiumshoplist.push(data);

			console.log("premium", data);
		}
		if (data.STORELEVEL.indexOf("gold") != -1) {
			data["dist"] = dist;

			const STORE_ID = data.STORE_ID;
			const reviewdata =  await get_review({ STORE_ID });
	
			data["reviewdata"] =reviewdata;
			const USER_ID = data.USER_ID;
			const checks =  await get_checkuser({ USER_ID });

			data["checks"] =checks;

			goldshoplist.push(data);
		}
		if (data.STORELEVEL.indexOf("silver") != -1) {
			data["dist"] = dist;

			const STORE_ID = data.STORE_ID;
			const reviewdata =  await get_review({ STORE_ID });
	
			data["reviewdata"] =reviewdata;
			const USER_ID = data.USER_ID;
			const checks =  await get_checkuser({ USER_ID });

			data["checks"] =checks;

			silvershoplist.push(data);
		}
		const STORE_ID = data.STORE_ID;
		const reviewdata =  await get_review({ STORE_ID });
	
		data["reviewdata"] =reviewdata;
		const USER_ID = data.USER_ID;
		const checks =  await get_checkuser({ USER_ID });

		data["checks"] =checks;
		allshoplist.push(data);
	
		}
	});

	allshoplist.sort(function (a, b) {
		// 오름차순
		return parseInt(a.dist) < parseInt(b.dist)
		? -1
		: parseInt(a.dist) > parseInt(b.dist)
		? 1
		: 0;
	});

	premiumshoplist.sort(function (a, b) {
		// 오름차순
		return parseInt(a.dist) < parseInt(b.dist)
		? -1
		: parseInt(a.dist) > parseInt(b.dist)
		? 1
		: 0;
	});

	goldshoplist.sort(function (a, b) {
		// 오름차순
		return parseInt(a.dist) < parseInt(b.dist)
		? -1
		: parseInt(a.dist) > parseInt(b.dist)
		? 1
		: 0;
	});
	silvershoplist.sort(function (a, b) {

		console.log("silvershop sort", parseFloat(a.dist),parseFloat(b.dist));
		// 오름차순
		return parseFloat(a.dist) < parseFloat(b.dist)
		? -1
		: parseFloat(a.dist) > parseFloat(b.dist)
		? 1
		: 0;
	});

	user.storelist = [];
	allshoplist.map((data)=>{
		user.storelist.push(data);
	})
	user.premiumshoplist = [];
	premiumshoplist.map((data)=>{
		user.premiumshoplist.push(data);
	})
	user.goldshoplist = [];
	goldshoplist.map((data)=>{
		user.goldshoplist.push(data);
	})
	user.silvershoplist = [];
	silvershoplist.map((data)=>{
		user.silvershoplist.push(data);
	})




	const deviceid = user.deviceid;
	const recentstoresTmp = await get_storeallview({ deviceid });
	user["storeviewlist"] = recentstoresTmp;


	console.log("user info", user);

	return new Promise((resolve, resject)=>{
		resolve(user);
	}) 



	
  }

