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
  top: '75%',
  left: '50%',
  height:'300px',
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
  width: 15%;
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
const Content = styled.div`
  text-align: left;
  margin-top: 10px;
  padding: 0px 30px;

`
const FilterApplyButtonText = styled.span`
  color :#fff;
  font-size :14px;
  font-family : ${({theme}) =>theme.REGULAR};
`

export default function CheckstatusModalEx({callback, state}) {
  const [open, setOpen] = React.useState(true);
  const [refresh, setRefresh] = React.useState(1);
  const [themaType1, setThemaType1] = React.useState(0);
  const [themaType2, setThemaType2] = React.useState(0);
  const [themaType3, setThemaType3] = React.useState(0);
  const [themaType4, setThemaType4] = React.useState(0);
  const [themaType5, setThemaType5] = React.useState(0);

  const handleClose = () =>{
    setOpen(false);

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
   
            <MainData>

            {
                state == 4 &&
                <div>
                    <img src={imageDB.fail} style={{width:'20%'}} />
                    <Content>
                    <div>홍여사 경품 이벤트는 하루 한번 이용가능 합니다</div>
                    <div>다음기회를 이용해주세요 </div>
                    </Content>
                </div> 
 
            }

            {
                (state == 1 || state == 2 || state ==3) &&
                <div>
                    <img src={imageDB.success} style={{width:'40%'}} />
                    <Content>
                    <div>홍여사 경품 이벤트는 하루 한번 이용가능 합니다</div>

                    <div>홍여사 시스템에서 확인후 쿠폰함으로 당첨되신 경품을 보내드립니다</div>
                    </Content>
                </div> 
 
            }


            </MainData>
      
            {/* <ApplyItem >
                <div style={{dispaly:"flex", alignItems:"flex-end", marginRight :35, justifyContent:"center"}}>   
                    <FilterApplyButton onClick ={_handlecheckstatus}><FilterApplyButtonText>닫음</FilterApplyButtonText></FilterApplyButton>
                </div>
            </ApplyItem> */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}