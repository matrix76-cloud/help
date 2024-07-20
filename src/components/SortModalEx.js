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
  padding: 20px 30px;
  background-color : #fff;
  flex-wrap : wrap;
`

const MainDataItem = styled.div`
  padding :10px;
  justify-content : center;
  align-items : center;
  border-radius :5px;
  background-color :  ${({check}) => check == 1 ? "#EDEDED" : "#ff4e193b" }; 
  margin-left :10px;
  margin-bottom: 10px;
`
const MainDataItemText = styled.span`
  font-size :12px;
  font-family : ${({theme}) =>theme.REGULAR};
  color :  ${({check}) => check == 1 ? "#000" : "#FF4E19" };  

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

export default function SortModalEx({callback, data}) {
  const [open, setOpen] = React.useState(true);


  const handleClose = () =>{
    let themaarytype = [];
    setOpen(false);
    callback(themaarytype);
  } 
  const _handlefilterapply = () =>{
    let themaarytype = [];
    if(themaType1 == true){themaarytype.push("거리순")}
    if(themaType2 == true){themaarytype.push("리뷰많은순")}
    if(themaType3 == true){themaarytype.push("호감도높은순")}
    if(themaType4 == true){themaarytype.push("높은금액순")}
    if(themaType5 == true){themaarytype.push("지원자많은순")}
  
    setOpen(false);
    callback(themaarytype);

  }
  const [themaType1, setThemaType1] = React.useState(0);
  const [themaType2, setThemaType2] = React.useState(0);
  const [themaType3, setThemaType3] = React.useState(0);
  const [themaType4, setThemaType4] = React.useState(0);
  const [themaType5, setThemaType5] = React.useState(0);


  const _handleData1 =()=>{setThemaType1(!themaType1);}
  const _handleData2 =()=>{setThemaType2(!themaType2);}
  const _handleData3 =()=>{setThemaType3(!themaType3);}
  const _handleData4 =()=>{setThemaType4(!themaType4);}
  const _handleData5 =()=>{setThemaType5(!themaType5);}


  React.useEffect(()=>{

    data.map((item, index)=>{
      if(item == '거리순'){
        setThemaType1(true);
      }else if(item == '리뷰많은순'){
        setThemaType2(true);
      }else if(item == '호감도높은순'){
        setThemaType3(true);
      }else if(item == '높은금액순'){
        setThemaType4(true);
      }else if(item == '지원자많은수'){
        setThemaType5(true);
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
              <Label content={'정렬순서'} containerStyle={{marginTop:-30}}/>
            <MainData>
                <MainDataItem check={themaType1} onClick={_handleData1}><MainDataItemText  check={themaType1}>거리순</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType2} onClick={_handleData2}><MainDataItemText check={themaType2}>리뷰많은순</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType3} onClick={_handleData3}><MainDataItemText check={themaType3}>호감도높은순</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType4} onClick={_handleData4}><MainDataItemText check={themaType4}>높은금액순</MainDataItemText></MainDataItem>
                <MainDataItem check={themaType5} onClick={_handleData5}><MainDataItemText check={themaType5}>지원자많은수</MainDataItemText></MainDataItem>

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