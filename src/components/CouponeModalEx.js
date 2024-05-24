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
  top: '85%',
  left: '50%',
  height:'150px',
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
font-size :14px;
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

export default function CouponModalEx({callback, data}) {
  const [open, setOpen] = React.useState(true);


  const handleClose = () =>{
    setOpen(false);

  } 
  const _handlefilterapply = () =>{
    let themaarytype = [];
    if(themaType1 == true){themaarytype.push("신규입점")}
    if(themaType2 == true){themaarytype.push("깜짝이벤트")}
    if(themaType3 == true){themaarytype.push("주간할인")}
    if(themaType4 == true){themaarytype.push("선착순할인")}
    if(themaType5 == true){themaarytype.push("첫방문할인")}
    if(themaType6 == true){themaarytype.push("후기이벤트")}
    if(themaType7 == true){themaarytype.push("단체할인")}


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

  const _handleData1 =()=>{setThemaType1(!themaType1);}
  const _handleData2 =()=>{setThemaType2(!themaType2);}
  const _handleData3 =()=>{setThemaType3(!themaType3);}
  const _handleData4 =()=>{setThemaType4(!themaType4);}
  const _handleData5 =()=>{setThemaType5(!themaType5);}
  const _handleData6 =()=>{setThemaType6(!themaType6);}
  const _handleData7 =()=>{setThemaType7(!themaType7);}


  React.useEffect(()=>{

    data.map((item, index)=>{
      if(item == '신규입점'){
        setThemaType1(true);
      }else if(item == '깜짝이벤트'){
        setThemaType2(true);
      }else if(item == '주간할인'){
        setThemaType3(true);
      }else if(item == '선착순할인'){
        setThemaType4(true);
      }else if(item == '첫방문할인'){
        setThemaType5(true);
      }else if(item == '후기이벤트'){
        setThemaType6(true);
      }else if(item == '단체할인'){
        setThemaType7(true);
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
              <Label content={'쿠폰및혜택'} containerStyle={{marginTop:-30}}/>
            <MainData>
                <MainDataItem check={themaType1} onClick={_handleData1}><MainDataItemText  check={themaType1}>신규입점</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType2} onClick={_handleData2}><MainDataItemText check={themaType2}>깜짝이벤트</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType3} onClick={_handleData3}><MainDataItemText check={themaType3}>주간할인</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType4} onClick={_handleData4}><MainDataItemText check={themaType4}>선착순할인</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType5} onClick={_handleData5}><MainDataItemText check={themaType5}>첫방문할인</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType6} onClick={_handleData6}><MainDataItemText check={themaType6}>후기이벤트</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType7} onClick={_handleData7}><MainDataItemText check={themaType7}>단체할인</MainDataItemText></MainDataItem>
            
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