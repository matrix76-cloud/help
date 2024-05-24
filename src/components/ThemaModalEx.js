import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import Text from '../common/Text';
import { imageDB } from '../utility/imageData';
import styled from 'styled-components';
import Label from '../common/Label';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '80%',
  left: '50%',
  height:'250px',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const IconCloseView = styled.div`
  position: relative;
  top: -8px;
  left: 35%;
`
const MainData = styled.div`
  display :flex;
  flex-direction:row;
  padding: 20px 20px 0px;
  background-color : #fff;
  flex-wrap : wrap;
`

const MainDataItem = styled.div`
  padding :10px;
  justify-content : center;
  align-items : center;
  border-radius :5px;

  background-color :  ${({check}) => check == 1 ? "#ff4e193b" : "#EDEDED" }; 
  margin-left :10px;
  margin-bottom: 10px;
`
const MainDataItemText = styled.span`
  font-size :12px;
  font-family : ${({theme}) =>theme.REGULAR};
  color :  ${({check}) => check == 1 ? "#FF4E19" : "#000" };  

`
const ApplyItem = styled.div`
  display :flex;
  flex-direction : row;
  justify-content : flex-end;
  align-items : center;
  background-color : #fff;
  margin-bottom : 20px;
`
const FilterApplyButton = styled.div`
    background-color :#ff4e19;
    padding :5px 50px;
    border-radius :5px;

`
const FilterApplyButtonText = styled.span`
  color :#fff;
  font-size :14px;
  font-family : ${({theme}) =>theme.REGULAR};
`

export default function ThemaModalEx({callback, data}) {
  const [open, setOpen] = React.useState(true);


  const handleClose = () =>{
    setOpen(false);
  } 
  const _handlefilterapply = () =>{
    let themaarytype = [];
    if(themaType1 == true){themaarytype.push("24시간")}
    if(themaType2 == true){themaarytype.push("단체환영")}
    if(themaType3 == true){themaarytype.push("커플환영")}
    if(themaType4 == true){themaarytype.push("샤워가능")}
    if(themaType5 == true){themaarytype.push("주차가능")}
    if(themaType6 == true){themaarytype.push("수면가능")}
    if(themaType7 == true){themaarytype.push("남성전용")}
    if(themaType8 == true){themaarytype.push("여성전용")}
    if(themaType9 == true){themaarytype.push("1인1실")}
    if(themaType10 == true){themaarytype.push("20대관리사")}
    if(themaType11 == true){themaarytype.push("30대관리사")}
    if(themaType12 == true){themaarytype.push("40대관리사")}
    if(themaType13 == true){themaarytype.push("1인샵")}
    if(themaType14 == true){themaarytype.push("남자관리사")}
    if(themaType15 == true){themaarytype.push("여자관리사")}


    setOpen(false);
    callback(themaarytype);

  }
  const [themaType1, setThemaType1] = React.useState(0);
  const [themaType2, setThemaType2] = React.useState(0);
  const [themaType3, setThemaType3] = React.useState(0);
  const [themaType4, setThemaType4] = React.useState(0);
  const [themaType5, setThemaType5] = React.useState(0);
  const [themaType6, setThemaType6] = React.useState(0);
  const [themaType7, setThemaType7] = React.useState(0);
  const [themaType8, setThemaType8] = React.useState(0);
  const [themaType9, setThemaType9] = React.useState(0);
  const [themaType10, setThemaType10] = React.useState(0);
  const [themaType11, setThemaType11] = React.useState(0);
  const [themaType12, setThemaType12] = React.useState(0);
  const [themaType13, setThemaType13] = React.useState(0);
  const [themaType14, setThemaType14] = React.useState(0);
  const [themaType15, setThemaType15] = React.useState(0);

  const _handleData1 =()=>{setThemaType1(!themaType1);}
  const _handleData2 =()=>{setThemaType2(!themaType2);}
  const _handleData3 =()=>{setThemaType3(!themaType3);}
  const _handleData4 =()=>{setThemaType4(!themaType4);}
  const _handleData5 =()=>{setThemaType5(!themaType5);}
  const _handleData6 =()=>{setThemaType6(!themaType6);}
  const _handleData7 =()=>{setThemaType7(!themaType7);}
  const _handleData8 =()=>{setThemaType8(!themaType8);}
  const _handleData9 =()=>{setThemaType9(!themaType9);}
  const _handleData10 =()=>{setThemaType10(!themaType10);}
  const _handleData11 =()=>{setThemaType11(!themaType11);}
  const _handleData12 =()=>{setThemaType12(!themaType12);}
  const _handleData13 =()=>{setThemaType13(!themaType13);}
  const _handleData14 =()=>{setThemaType14(!themaType14);}
  const _handleData15 =()=>{setThemaType15(!themaType15);}

  React.useEffect(()=>{

    data.map((item, index)=>{
      if(item == '24시간'){
        setThemaType1(true);
      }else if(item == '단체환영'){
        setThemaType2(true);
      }else if(item == '커플환영'){
        setThemaType3(true);
      }else if(item == '샤워가능'){
        setThemaType4(true);
      }else if(item == '주차가능'){
        setThemaType5(true);
      }else if(item == '수면가능'){
        setThemaType6(true);
      }else if(item == '남성전용'){
        setThemaType7(true);
      }else if(item == '여성전용'){
        setThemaType8(true);
      }else if(item == '1인1실'){
        setThemaType9(true);
      }else if(item == '20대관리사'){
        setThemaType10(true);
      }else if(item == '30대관리사'){
        setThemaType11(true); 
      }else if(item == '40대관리사'){
        setThemaType12(true);
      }else if(item == '1인샵'){
        setThemaType13(true);
      }else if(item == '남자관리사'){
        setThemaType14(true);
      }else if(item == '여자관리사'){
        setThemaType15(true);
      }
    })
  },[])

  return (
    <div>

      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
              <IconCloseView onClick={handleClose} >
                <img src={imageDB.close} style={{width:"15px", height:"15px"}}/>
              </IconCloseView>
              <Label content={'테마선택'} containerStyle={{marginTop:-30}}/>
            <MainData>
                <MainDataItem check={themaType1} onClick={_handleData1}><MainDataItemText  check={themaType1}>24시간</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType2} onClick={_handleData2}><MainDataItemText check={themaType2}>단체환영</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType3} onClick={_handleData3}><MainDataItemText check={themaType3}>커플환영</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType4} onClick={_handleData4}><MainDataItemText check={themaType4}>샤워가능</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType5} onClick={_handleData5}><MainDataItemText check={themaType5}>주차가능</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType6} onClick={_handleData6}><MainDataItemText check={themaType6}>수면가능</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType7} onClick={_handleData7}><MainDataItemText check={themaType7}>남성전용</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType8} onClick={_handleData8}><MainDataItemText check={themaType8}>여성전용</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType9} onClick={_handleData9}><MainDataItemText check={themaType9}>1인1실</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType10} onClick={_handleData10}><MainDataItemText check={themaType10}>20대관리사</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType11} onClick={_handleData11}><MainDataItemText check={themaType11}>30대관리사</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType12} onClick={_handleData12}><MainDataItemText check={themaType12}>40대관리사</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType13} onClick={_handleData13}><MainDataItemText check={themaType13}>1인샵</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType14} onClick={_handleData14}><MainDataItemText check={themaType14}>남자관리사</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType15} onClick={_handleData15}><MainDataItemText check={themaType15}>여자관리사</MainDataItemText></MainDataItem>
            </MainData>
      
            <ApplyItem >
                <div style={{dispaly:"flex", alignItems:"flex-end", marginRight :35, justifyContent:"center"}}>   
                    <FilterApplyButton onClick ={_handlefilterapply}><FilterApplyButtonText>적용</FilterApplyButtonText></FilterApplyButton>
                </div>
            </ApplyItem>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}