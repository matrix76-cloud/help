import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from "../common/Button";
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import Text from '../common/Text';
import { imageDB } from '../utility/imageData';
import styled from 'styled-components';
import Label from '../common/Label';
import Swipe from '../common/Swipe';
import { setRef } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  top: '75%',
  left: '40%',
  transform: 'translate(-50%, -50%)',
  width: '100%'
};
const IconCloseView = styled.div`
  position: relative;
  top:58px;
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

const EventMain = styled.div`
  position: absolute;
  top: 60px;
  left: 50px;
  font-size: 25px;
  color: #000;
  

`

const EventDesc1 = styled.div`
  position: absolute;
  top: 120px;
  left: 50px;
  font-size: 18px;
  color: #fff;

  text-align:left;
  line-height:1.5;

`

const EventDesc2 = styled.div`
  position: absolute;
  top: 150px;
  left: 25px;
  font-size: 18px;
  color: #fff;

  width:100%;

`

const EventButton = styled.div`
  position: absolute;
  top: 230px;
  left: 60px;
  font-size: 18px;
  color: #fff;

  width:100%;

`

export default function AdvertiseModalEx({callback, data}) {

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(true);

  const [imgs, setImgs] = React.useState([]);

  const [seq, setSeq] = React.useState(1);
  const [refresh, setRefresh] = React.useState(1);

  // React.useEffect(() => {
  //   // 설정된 시간 간격마다 setInterval 콜백이 실행된다. 
  //   const id = setInterval(() => {
  //     // 타이머 숫자가 하나씩 줄어들도록
  //     if(seq == 1){
  //       setSeq(2);
  //     }else if(seq == 2){
  //       setSeq(1);
  //     }
  //   }, 5000);
    
  //   setRefresh((refresh) => refresh+1);

  //   return () => clearInterval(id);
  //   // 카운트 변수가 바뀔때마다 useEffecct 실행
  // }, [seq]);


  const handleClose = () =>{
    setOpen(false);
  } 

  const handletodayClose = () =>{

    setOpen(false);

    let date = Date.now();
    window.localStorage.setItem("popup", date);
  }

  const _handlefilterapply = () =>{
  }

  React.useEffect(()=>{

    setSeq(seq);
  }, [refresh])

  React.useEffect(()=>{

    let imgs = [];
    imgs.push(imageDB.advertise1);
    imgs.push(imageDB.advertise2);
    imgs.push(imageDB.advertise3);
    setImgs(imgs);

  }, [])

  const _handleevent = () =>{
    navigate("/event");
  }


  return (
    <div>

    {
      seq == 1 &&       
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
      <Fade in={open} bottom>
        <Box sx={style}>
            <div>
                  <EventMain>
                    홍여사 출시 이벤트<span className='blink' style={{fontSize:16, marginLeft:10}}>7월 한달 진행</span>
                  </EventMain>

                  <EventDesc1>
                    이벤트 화면 이나 모든 배너 화면등은 추후에  쉽게 고칠수 있도록 디자인 되었으면 합니다
                  </EventDesc1>
                  <EventDesc2>
              
                  </EventDesc2>

                  <EventButton>
                  <Button
                      callback={_handleevent}
                      buttonText={"이벤트 보러가기"}
                      containerStyle={{
                        backgroundColor: "#1d1d1d",
                        color: "#fff",
                        margin: "10px 2px",
                        width: "120px",
                        borderRadius: 5,
                        height: "50px",
                        boxShadow : "none",
                      }}
                  />

                  <Button
                      callback={handletodayClose}
                      buttonText={"오늘 그만보기"}
                      containerStyle={{
                        backgroundColor: "#656363",
                        color: "#fff",
                        margin: "10px 2px",
                        width: "120px",
                        borderRadius: 5,
                        height: "50px",
                        boxShadow : "none",
                      }}
                  />

                  </EventButton>

                  <img src={imageDB.advertise1} style={{
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10,
                        height: "400px"}}/>
            
            </div>

        </Box>
        </Fade>
      </Modal>
    }

    {
      seq == 2 &&       
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
      <Fade in={open} left>
        <Box sx={style}>
            <div>
                  <EventMain>
                    홍여사 출시 이벤트
                  </EventMain>

                  <EventDesc1>
                    지금 홍여사로 등록하면 
                    홍여사 가입 수수료 모두 평생 면제등의 혜택을 확인하세요
                  </EventDesc1>
                  <EventDesc2>
                
                  </EventDesc2>

                  <EventButton>
                  <Button
                      callback={_handleevent}
                      buttonText={"이벤트 보러가기"}
                      containerStyle={{
                        backgroundColor: "#1d1d1d",
                        color: "#fff",
                        margin: "10px 2px",
                        width: "120px",
                        borderRadius: 5,
                        height: "50px",
                        boxShadow : "none",
                      }}
                  />

                  <Button
                      callback={handletodayClose}
                      buttonText={"오늘 그만보기"}
                      containerStyle={{
                        backgroundColor: "#656363",
                        color: "#fff",
                        margin: "10px 2px",
                        width: "120px",
                        borderRadius: 5,
                        height: "50px",
                        boxShadow : "none",
                      }}
                  />

                  </EventButton>

                  <img src={imageDB.advertise1} style={{
                        borderTopLeftRadius:10,
                        borderTopRightRadius:10,
                        height: "400px"}}/>
            
            </div>

        </Box>
        </Fade>
      </Modal>
    }

    </div>
  );
}