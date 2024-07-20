import React, {
  useState,
  useEffect,
  useContext,
  useLayoutEffect,
  useRef,
} from "react";
import {
  HashRouter,
  Route,
  Redirect,
  BrowserRouter,
  Routes,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Swipe from "../common/Swipe";
import { get_banner1, get_banner2 } from "../service/BannerService";
import ImageButton from "../common/ImageButton";
import { imageDB } from "../utility/imageData";
import Text from "../common/Text";
import styled from "styled-components";

import GroupItem from "../components/GroupItem";
import Label from "../common/Label";
import Button from "../common/Button";
import CommunityItem from "../components/CommunityItem";
import { FaHeart } from "react-icons/fa";
import { IoStorefrontOutline } from "react-icons/io5";
import { LuDog } from "react-icons/lu";
import { CiAlarmOn } from "react-icons/ci";
import { FaUserFriends } from "react-icons/fa";
import { MdSportsKabaddi } from "react-icons/md";
import { MdNightlife } from "react-icons/md";

const Container = styled.div`
  margin-top:50px;
`;
const Groups = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-x: auto;
`

const Emptyline = styled.div`
  background-color: #ededed;
  height: ${({height}) => height}px;
`;

const RefreshLayout = styled.div`
  position: fixed;
  bottom: 80px;
  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border-radius: 20px;
  font-size: 14px;
  right: 20px;
`;


const FilterRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
  padding: 10px;
  margin-top: 0px;
  overflow-x: auto
`

const FilterButton = styled.div`
  display: flex;
  border: 1px solid #f0f0f0;
  padding: 8px;
  border-radius: 15px;
  font-size: 12px;
  margin-right: 5px;
  min-width: 60px;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
`


const Stickposition = styled.div`
  display : flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position : sticky;
  top:40px;
  background:#fff;
  z-index:3;
  box-shadow: rgba(0, 0, 0, 0.01) 0px 10px 10px, rgba(0, 0, 0, 0.01) 0px 3px 3px;

`



const Communitycontainer = () => {

  const Commutiydata = [

    {
      name:"2030 구리시 술모임",
      content:"2030 구리시 술모임을 가졌습니다. 술좋아하고 동네에서 술마시고 싶으신분 그리고 동네 친구가 필요한 분 모두 모여서 술을 먹었습니다. 비도 오고 비가 오는데 삼겹살 먹으니 너무 운치가 있어서 좋더라고요. 정말 행복한 밤이었습니다",
      imgs :[imageDB.communitylist7, imageDB.communitylist8, imageDB.communitylist9, imageDB.communitylist10, imageDB.communitylist11, imageDB.communitylist12, imageDB.communitylist13],
      addr:'구리시 수내동',
      time:'10분전',
      view:'340',
    },
    {
      name:"길고양이 출현",
      content:"귀여운 길고양이 출현 집으로 데리고 싶었지만 와이프의 압박에..... 집도 없이 저렇게 다니는거 보면 맘이 무지 짠하다",
      imgs :[imageDB.communitylist6, imageDB.communitylist5],
      addr:'구리시 수내동',
      time:'10분전',
      view:'340',
    },

    {
      name:"집에 어울리는 바닥재 고르는 방법(마루 vs 장판 vs 타일 바닥재 삼국지)",
      content:"장판, 폭신한 보행감과 생활 소음 방지 역할을 해주는 실용적인 바닥재,장판은 페트 장판과 모노륨 장판 두 가지로 나눌 수 있어요장판의 장점 : 보행감과 편의성장판의 두께가 두꺼울수록 폭신한 보행감을 느끼실 수 있고, 생활 소음을 방지하는데 효과적인 바닥재라 특히 반려동물이나 어린아이가 있는 가정에서 선호하는 재료입니다. 두께가 두꺼워질 수록 보행감, 소음 감소, 내구성 등 다양한 장점이 있는 반면, 제품 자체 가격과 시공 비용이 추가됩니다.강화마루와 강마루, 많이 들어는 보셨는데 헷갈리셨죠? 강화마루와 강마루는 베이스가 되는 속자재와 시공 방식에서 차이가 있습니다. ",
      imgs :[imageDB.communitylist4],
      addr:'남양주 평내동',
      time:'3분전',
      view:'340',
    },

    {
      name:"한강 주차장에서 차박",
      content:"주차장에서 비오는날 차박을 했어요. 아내가 애지중지 하는 쏘렌토 차량에서 차박을 햇는데 너무 너무 재미있더라고요. 비오는날 맥주한캔으로 모든 근심 걱정이 없어지는듯 했어요....",
      imgs :[imageDB.group1],
      addr:'남양주 다산동',
      time:'50분전',
      view:'40',
    },
    {
      name:"생활에서 필요한 쿨팁모음 1탄",
      content:"1. 주전자 안쪽에 낀 때를 닦기 힘들 땐, 주전자에 물을 가득 담고 식초 서너방울을 떨어트린다. 하룻밤쯤 가만히 두었다가 이튿날 아침, 담긴 물을 비워내고 다시 깨끗한 물로 헹구면 때가 사라집니다 2. 화장실 변기를 뚫을 땐, 비위상하게 물리적으로 힘 쓰지 말고 뜨거운 물에 샴푸 두번 펌핑 혹은 소량의 락스나 가루세제를 섞어 부어주면 몇 분 후 뻥 뚫린답니다 3. 손 때로 더러워진 스위치는 먹다 남은 식빵이나 지우개로 닦으면 깨끗해져요",
      imgs :[imageDB.communitylist1],
      addr:'구리시 토평동',
      time:'3시간전',
      view:'29',
    },
    {
      name : "도로명주소 어디까지 아세요? 영상 한편으로 총정리 끝!",
      content :"➀ 도로명은 붙여 씁니다.➁ 도로명과 건물번호는 띄어 씁니다.➂ 건물번호와 상세주소(동ㆍ층ㆍ호) 사이에는 쉼표(,)를 찍어구분합니다.➃ 건물번호는 ⃝⃝번으로 읽습니다.예) 평화로150번길 1004 ⇒ 평화로백오십번길 천사번",
      imgs :[imageDB.communitylist3],
      addr:'구리시 인계동',
      time:'4시간전',
      view:'150',
    },
    {
      name : "내 아이에게 맞는 공부방법 찾기[오은영의 부모마음 아이마음]",
      content :"오은영 정신건강의학과 전문의·오은영 소아청소년클리닉 원장 아이 공부를 지켜보다 보면 불안해지는 부모들이 많다. 주변의 이야기를 듣다 보면 문득 ‘내가 잘 인도하고 있나? 우리 아이만 뒤처지는 건 아닐까?’ 하는 생각들이 밀려오기 때문이다. 이 불안이 지나치면 이리 흔들 저리 흔들 부모의 귀는 점점 얇아진다. 사실 귀가 얇은 부모는 아이에게 해주고 싶은 것이 많은 부모다. 아이를 잘 키우고 싶은 마음이 누구보다 크다. 그런 마음이 전혀 없다면 남의 이야기에 귀가 솔깃해지지도 않을 것이다.그런데 귀가 얇으면 부모는 혼란스럽다. 이 소리를 들으면 이걸 했어야 하는데 싶어서 확 불안해진다. 저 소리를 들으면 저것도 해야 하나 싶어 또 불안해진다. 이런 부모들의 가장 큰 문제는, 일정한 기준이나 지침이 없기 때문에 아이를 불안하게 가르친다는 것이다. 아이도 부모 따라 혼란스러워질 수밖에 없다.인간이 학습을 해나가는 과정을 보면 늘 정답이 있는 것이 아니다. 어떤 자료를 기본으로 주어진 자료와 여러 가지 사실 및 상황을 조합해서 체계적이고 합리적이고 논리적인 사고를 해나간다. 그 과정을 통해 당분간은 이렇게 해보자란 결론을 도출해낸다. 그런데 부모의 귀가 얇으면 그런 과정을 보여줄 수가 없다. 귀가 얇은 사람들의 마음에는 어떤 것이 옳으면 그것 외에는 모두 잘못된 것 같다는 두려움이 있다. 주변의 어떤 부모가 아이를 영어 유치원에 보냈다고 치자. 다른 부모들도 영어는 정말 중요하고, 영어 유치원에 보내지 않으면 영어를 잘할 수 없을까 봐 걱정이 된다고 얘기한다. 이런 얘기를 들으면 무리를 해서라도 영어 유치원에 보내야 할 것 같다. 자신의 교육적 신념이 없으면 다른 사람의 말을 들을 때마다 불안해진다.",
      imgs :"",
      addr:'남양주 호평동',
      time:'12시간전',
      view:'78',
    }, 
    {
      name:"남양주시복지재단의 다양한 캠페인에 동참해주세요.",
      content:"착한가정, 착한가게, 착한일터의 앞 글자를 따서 지어진, 일명 ‘착착착(짝짝짝) 기부릴레이’는 복지사각지대에 놓여져있는 이웃들을 돕기 위해 가정, 소상공인, 회사 등에서 매월 일정금액을후원하며 주변으로 선한 영향력을 이어가고 있는 캠페인입니다",
      imgs :[imageDB.communitylist2],
      addr:'남양주 지금로',
      time:'1일전',
      view:'23',
    }, 
    {
      name:"생활에서 필요한 쿨팁모음 2탄",
      content:"4. 빵이나 케이크, 치즈를 아주 깔끔하게 잘라야 한다면 실을 이용해서 잘라주세요 5. 햄버거를 먹을 때는 위 아래 위치를 바꿔서 먹으면 위에 올라가는 빵이 더 크기 때문에 내용물이 덜 흘러내려요.6. 사과 껍질을 끓여 냄비의 탄 부분을 문지르면 냄비가 다시 반짝반짝해진답니다",
      imgs :'',
      addr:'남양주 다산동',
      time:'3일전',
      view:'8',
    }
  ]


  const navigate = useNavigate();

  const location = useLocation();
  const scrollPositions = useRef({});
  useEffect(()=>{
    window.scrollTo(0, 0);
    return () => {};
  }, []);
  
  return (
    <Container>


      <Label content={"동네 동호회를 만드시고 홍여사에서 동호회 활동비를 지원받으세요"} containerStyle={{textAlign: "left",marginTop: "70px",padding: "10px",
      lineHeight:1.5}} />

      <Button
        buttonText={"홍여사 동호회활동 지원 알아보기"}
        callback={()=>{}}
        containerStyle={{
          color: "#fff",
          background: "#ff4e19",
          width: "180px",
          height: "25px",
          fontSize: "12px",
          marginLeft :"15px",
          borderRadius:"5px",
          boxShadow :"none"
        }}
      />

      <Groups className="group">
        <GroupItem groupimgsrc={'primary'}  groupname={'모임 둘러보기'}/>
        <GroupItem groupimgsrc={imageDB.group1}  groupname={'한강낚시'}/>
        <GroupItem groupimgsrc={imageDB.group2}  groupname={'산넘어산 육아해방'}/>
        <GroupItem groupimgsrc={imageDB.group3}  groupname={'요리한번 만들어봐요'}/>
        <GroupItem groupimgsrc={imageDB.group4}  groupname={'걸으면서 생각해봐요'}/>
        <GroupItem groupimgsrc={imageDB.group5}  groupname={'명상 수업'}/>
        <GroupItem groupimgsrc={imageDB.group6}  groupname={'워킹맘 모임'}/>
      </Groups>
      <Emptyline height={10}/>


      <Stickposition top={0}>
            <FilterRow top={0} className="filter">
              <FilterButton><FaHeart color="#ff0000" /><span style={{marginLeft:5}}>인기글</span></FilterButton>
              <FilterButton><IoStorefrontOutline /><span style={{paddingLeft:5}}>맛집</span></FilterButton>
              <FilterButton><LuDog /><span style={{paddingLeft:5}}>반려동물</span></FilterButton>
              <FilterButton><CiAlarmOn/><span style={{paddingLeft:5}}>생활편의</span></FilterButton>
              <FilterButton><FaUserFriends/> <span style={{paddingLeft:5}}>동네친구</span></FilterButton>
              <FilterButton><MdSportsKabaddi/><span style={{paddingLeft:5}}>운동</span></FilterButton>
              <FilterButton><MdNightlife/><span style={{paddingLeft:5}}>고민사연</span></FilterButton>
            </FilterRow>
         
      </Stickposition>


      {
        Commutiydata.map((data)=>(
          <CommunityItem item={data}/>
        ))
      }


      <RefreshLayout>
        <Button buttonText={"+ 글쓰기"} callback={()=>{}} containerStyle={{color: "#fff",background: "#ff4e19",width: "80px",height: "40px",fontSize: "16px",margin :"2px",borderRadius:"20px", boxShadow:"none"}}/>
      </RefreshLayout>

      <div style={{height:50}}>

      </div>
      {/* <CommunityItem name={'마지막주막..... 시간이 너무 빠르다... 하 정말 힘드네'} imgcontent={imageDB.group1}
      content = {'어디서 부터 잘못된건지 난 알수 없는 부담에 우리의 잘못된 만남이 어디서 부터 잘못된건지 난 알수 없는 부담에 우리의 잘못된 만남이'}/> */}
      
    </Container>
  );
};

export default React.memo(Communitycontainer);
