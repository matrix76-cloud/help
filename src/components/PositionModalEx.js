import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import Text from '../common/Text';
import { imageDB } from '../utility/imageData';
import styled from 'styled-components';
import Label from '../common/Label';
import Button from '../common/Button';
import { BiCrosshair, BiMapAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User';
import { SearchAddress } from '../utility/common';

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
  top: '90%',
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
  width:90%;
`
const FilterApplyButton = styled.div`
    background-color :#ff4e19;
    padding :5px 5%;
    border-radius :5px;

`
const FilterApplyButtonText = styled.span`
  color :#fff;
  font-size :14px;
  font-family : ${({theme}) =>theme.REGULAR};
`

export default function PostionModalEx({callback, data}) {

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const {user, dispatch2} = React.useContext(UserContext);


  const handleClose = () =>{
    setOpen(false);
  } 

  const _handlecurrentpos = ()=>{
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          command: "requestposition",
          param1: "",
          param2 :"",
        })
      )
    }
 
  
  }
  const _handlemap = () =>{
    navigate("/region",{state:{type:"map"}});
  }



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
              <Label content={'내위치 지정'} containerStyle={{marginTop:-30}}/>

      
              <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", marginTop:20}}>
                <div 
                onClick={_handlecurrentpos}
                style={{backgroundColor: "rgb(231 231 231)",width:"85%", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                <BiCrosshair size={22} />
                <Button buttonText ={'현재위치로 재검색'} callback={_handlecurrentpos} containerStyle={{backgroundColor: "rgb(231 231 231)", fontWeight:700,
                  color: "rgb(12 12 12)",margin:'10px', width:"120px", height:25,justifyContent: "flex-start"}}/>
                </div>


                <div 
                onClick={_handlemap}
                style={{backgroundColor: "#FF5826",width:"85%", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", marginTop:5}}>
                <BiMapAlt size={22} color={'#fff'} />
                <Button buttonText ={'지도에서 위치 지정'} callback={_handlemap} containerStyle={{backgroundColor: "#FF5826", fontWeight:700,
                  color: "#fff",margin:'10px', width:"120px", height:25,justifyContent: "flex-start"}}/>
                </div>

              </div>
            {/* <ApplyItem >
                <div style={{dispaly:"flex", alignItems:"flex-end", marginRight :15, justifyContent:"center"}}>   
                    <FilterApplyButton onClick ={_handlemapapply}><FilterApplyButtonText>현재위치로 재검색</FilterApplyButtonText></FilterApplyButton>
                </div>
            </ApplyItem>

            <ApplyItem >
                <div style={{dispaly:"flex", alignItems:"flex-end", marginRight :15, justifyContent:"center"}}>   
                    <FilterApplyButton onClick ={_handlemapapply}><FilterApplyButtonText>지도로 위치 지정</FilterApplyButtonText></FilterApplyButton>
                </div>
            </ApplyItem> */}

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}