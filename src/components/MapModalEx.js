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
  top: '65%',
  left: '50%',
  height:'450px',
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
  margin-top:10px;
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
const CurrentPos = styled.div`
  position: absolute;

  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 35%;
  left: 45%;

`

const { kakao } = window;

export default function MapModalEx({callback, data}) {
  const [open, setOpen] = React.useState(true);


  const handleClose = () =>{
    setOpen(false);
  } 
  const _handlefilterapply = () =>{



    setOpen(false);
    callback("");

  }




  React.useEffect(() => {
    setTimeout(() => {
     console.log("1초가 딜레이됩니다.");
    
     var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
     mapOption = { 
           center: new kakao.maps.LatLng(37.54699, 127.09598), // 지도의 중심좌표
           level: 4 // 지도의 확대 레벨
       };
 
     var map = new kakao.maps.Map(mapContainer, mapOption);
   }, 500);
 }, []);


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
              <Label content={'지역선택'} containerStyle={{marginTop:-30}}/>
            <MainData>
            <div id="map" className="ShortMap"></div>
            
            <CurrentPos>
              <img src={imageDB.bottom_location} style={{width:"40px"}}/>
            </CurrentPos>

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