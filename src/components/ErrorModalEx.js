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
import { theme } from '../theme/theme';

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
  top: '70%',
  left: '50%',
  height: '670px',
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top:10px;
`

const MainDataItem = styled.div`
  padding: 10px 25px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  background-color: #fff;
  margin-left: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #ededed;
  width: 100%;
`
const MainDataItemText = styled.span`
  font-size :14px;
  font-family : ${({theme}) =>theme.REGULAR};
  color :  ${({check}) => check == 1 ? "#FF4E19" : "#000" };  

`
const ApplyItem = styled.div`
  display :flex;
  flex-direction : row;
  justify-content : center;
  align-items : center;
  background-color : #FF4E19;
  margin-bottom : 20px;
  width: 80%;
  margin: 10px 10%;
  height: 40px;

`
const FilterApplyButton = styled.div`
    padding :5px 100px;
    border-radius :5px;

`
const FilterApplyButtonText = styled.span`
  color :#fff;
  font-size :14px;
  font-family : ${({theme}) =>theme.REGULAR};
`

const CheckItem = styled.div`
  background: ${({check}) => check == true ? ('#FF4E19') :('#FFF')};
  height:15px; 
  width:15px; 
  borderRadius:15px;
  border : ${({check}) => check == true ? (null) :('1px solid #000')};
`

export default function ErrorModalEx({callback}) {
  const [open, setOpen] = React.useState(true);
  const [errorcontent, setErrorcontent] = React.useState('');
  const [refresh, setRefresh] = React.useState(1);

  const [errorcheckitems, setErrorcheckitems] = React.useState([0,0,0,0,0,0,0]);

  const handleClose = () =>{
    setOpen(false);
    callback();
  } 
  const _handleapply = () =>{
    alert("신고 완료 하였습니다");
    setOpen(false);
    callback();
  }
  const handleCheck = (index) =>{
    if(errorcheckitems[index] == 0){
      errorcheckitems[index] = 1;
    }else{
      errorcheckitems[index] = 0;
    }
    setErrorcheckitems(errorcheckitems);

    setRefresh(refresh => refresh + 1);

  }


  // React.useEffect(()=>{
  //   let errorcheckitems= [0,0,0,0,0,0,0];
  //   setErrorcheckitems(errorcheckitems);
  // },[])

  React.useEffect(()=>{
    setErrorcheckitems(errorcheckitems);
  },[refresh])


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
              <Label content={'발견된 오류를 제보해주세요!'} containerStyle={{marginTop:-30}}/>
      
              <MainData>
                  <MainDataItem>
                    <CheckItem check={errorcheckitems[0]} onClick={()=>{handleCheck(0)}}></CheckItem>
                    <Text size={14} value={'영업하지 않는 샵이에요!'} containerStyle={{paddingLeft:10}}></Text>
                  </MainDataItem>
                  <MainDataItem>
                    <CheckItem check={errorcheckitems[1]} onClick={()=>{handleCheck(1)}}></CheckItem>
                    <Text size={14} value={'샵주소가 맞지 않아요!'} containerStyle={{paddingLeft:10}}></Text>
                  </MainDataItem>
                  <MainDataItem>
                    <CheckItem check={errorcheckitems[2]} onClick={()=>{handleCheck(2)}}></CheckItem>
                    <Text size={14} value={'샵이름이 맞지 않아요!'} containerStyle={{paddingLeft:10}}></Text>
                  </MainDataItem>
                  <MainDataItem>
                    <CheckItem check={errorcheckitems[3]} onClick={()=>{handleCheck(3)}}></CheckItem>
                    <Text size={14} value={'잘못된 코스내용이에요!'} containerStyle={{paddingLeft:10}}></Text>
                  </MainDataItem>
                  <MainDataItem>
                    <CheckItem check={errorcheckitems[4]} onClick={()=>{handleCheck(4)}}></CheckItem>
                    <Text size={14} value={'가격이 맞지 않아요!'} containerStyle={{paddingLeft:10}}></Text>
                  </MainDataItem>
                  <MainDataItem>
                    <CheckItem check={errorcheckitems[5]} onClick={()=>{handleCheck(5)}}></CheckItem>
                    <Text size={14} value={'전화번호가 잘못되었어요!'} containerStyle={{paddingLeft:10}}></Text>
                  </MainDataItem>
                  <MainDataItem>
                    <CheckItem check={errorcheckitems[6]} onClick={()=>{handleCheck(6)}}></CheckItem>
                    <Text size={14} value={'기타!'} containerStyle={{paddingLeft:10}}></Text>
                  </MainDataItem>

                  <div style={{marginTop:10, width:"90%", marginLeft:'5%'}}>
                    <textarea type="text"
                        style={{fontSize:14, width:"80%", height:70,
                        padding: 10,
                        fontSize: '12px',
                        resize :"none",
                        fontFamily: 'SF-Pro-Text-Regular'}}
                        placeholder ={"상세내역을 입력해주세여"}
                        onChange = {e => {
                            setErrorcontent(e.target.value);
                            setRefresh(refresh => refresh + 1);
                        }}>

                    </textarea>
                  </div>

              </MainData>
      
            <ApplyItem >
                <div style={{dispaly:"flex", alignItems:"flex-end", marginRight :35, justifyContent:"center"}}>   
                    <FilterApplyButton onClick ={_handleapply}><FilterApplyButtonText>등록</FilterApplyButtonText></FilterApplyButton>
                </div>
            </ApplyItem>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}