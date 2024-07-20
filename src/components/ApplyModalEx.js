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
import { REQUESTTYPE } from '../utility/contentDefine';

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
  top: '60%',
  left: '50%',
  height:'550px',
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
  padding :10px 50px;
  border-radius :5px;

`
const FilterApplyButtonText = styled.span`
  color :#fff;
  font-size :14px;
  font-family : ${({theme}) =>theme.REGULAR};
`

const InputData = styled.input`
  border: none;
  font-size: 14px;
  width: 85%;
  margin-bottom: 10px;
  border-radius: unset;
  padding-left: 10px;
  margin-left: 10px;
  background-color : #f9f9f9;
`;

const MainLabel = styled.div`
margin: 10px auto;
display: flex;
justify-content: flex-start;
align-items: flex-start;
text-align: left;
width: 90%;
`
const Agree = styled.div`
font-size: 12px;
width: 94%;
margin: 8px;
text-align: left;
overflow-y: auto;
height: 450px;

`

export default function ApplyModalEx({callback, data}) {
  const [open, setOpen] = React.useState(true);

  const [name, setName] = React.useState('');
  const [refresh, setRefresh] = React.useState('');
  const [applymove, setApplymove] = React.useState(false);
  const [licensemove, setLicensemove] = React.useState(false);


  const handleClose = () =>{
    let themaarytype = [];
    setOpen(false);
    callback(themaarytype);
  } 


  const _handlelicenseapply = () =>{

    const type = 1;
    setOpen(false);
    callback("");
  }





  React.useEffect(()=>{
    setApplymove(applymove);
    setLicensemove(licensemove);
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
            <Label content={'서비스형태'} containerStyle={{marginTop:-30}}/>
          <MainData>

            <MainLabel>
              언제마다 청소하시기를 원하시나여?
            </MainLabel>

            <InputData
              type="text"
              placeholder={"2024년 7월20일"}
              value={name}
              onChange={(e) => {
             
                setName(e.target.value);
                setRefresh((refresh) => refresh + 1);
              }}
            />

            <MainLabel>
              청소 가격은 얼마 인가요?
            </MainLabel>

            <InputData
              type="text"
              placeholder={"50000원"}
              value={name}
              onChange={(e) => {
             
                setName(e.target.value);
                setRefresh((refresh) => refresh + 1);
              }}
            />


            <MainLabel>
              청소 지역은 어디인가요?
            </MainLabel>

            <InputData
              type="text"
              placeholder={"남양주시 다산동 금강아파트 701동 180호"}
              value={name}
              onChange={(e) => {
             
                setName(e.target.value);
                setRefresh((refresh) => refresh + 1);
              }}
            />

            <MainLabel>
              청소는 주로 어디를 하나요
            </MainLabel>

            <InputData
              type="text"
              placeholder={"방 두개 화장실 포함 설겆이 포함"}
              value={name}
              onChange={(e) => {
             
                setName(e.target.value);
                setRefresh((refresh) => refresh + 1);
              }}
            />

          <MainLabel>
              청소는 몇시간을 해야 하나여?
            </MainLabel>

            <InputData
              type="text"
              placeholder={"3시간"}
              value={name}
              onChange={(e) => {
             
                setName(e.target.value);
                setRefresh((refresh) => refresh + 1);
              }}
            />

          </MainData>
    
          <ApplyItem >
              <div style={{dispaly:"flex", alignItems:"flex-end", marginRight :35, justifyContent:"center"}}>   
                  <FilterApplyButton onClick ={_handlelicenseapply}><FilterApplyButtonText>확인</FilterApplyButtonText></FilterApplyButton>
              </div>
          </ApplyItem>
          </Box>

          {/* {
            licensemove == true &&  (<Box sx={style}>
              <IconCloseView onClick={handleClose} >
                <img src={imageDB.close} style={{width:"15px", height:"15px"}}/>
              </IconCloseView>
              <Label content={'계약서 작성'} containerStyle={{marginTop:-30}}/>
            <MainData>
            <Agree>
										제1장 총칙<br/>
										제1조(목적)<br/>
										①본 약관은 서울특별시 중구 AI내편중구 홈페이지(이하“당 사이트 ”)에서 제공하는 모든 서비스(이하“서비스”)의 이용조건 및 절차, 이용자와 당 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.<br/>
										제2조 (약관의 효력 및 변경)<br/>
										① 본 약관은 이용자에게 공시함으로써 효력을 발생하며 합리적인 사유가 발생할 경우 변경할 수 있습니다.<br/>
										② 당 사이트가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 당 사이트의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다.<br/>
										③ 이용자는 변경된 약관에 동의하지 않을 경우 탈퇴(해지)를 요청할 수 있으며, 변경된 약관의 효력 발생일로부터 7일 이후에도 거부의사를 표시하지 아니하고 서비스를 계속 사용할 경우 약관의 변경사항에 동의한 것으로 간주됩니다.<br/>
										④ 변경된 약관에 대한 정보를 알지 못해 발생하는 이용자의 피해는 당 사이트에서 책임지지 않습니다.<br/>
										제3조 (약관외 준칙)<br/>
										① 본 약관에 명시되지 않은 사항은 관계법령 및 서비스별 안내에서 정하는 바에 의합니다.<br/>
										제4조 (용어의 정의) 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.<br/>
										- 이 용 자 : 본 약관에 따라 당 사이트가 제공하는 서비스를 받는 자<br/>
										- 이용계약 : 서비스 이용과 관련하여 당 사이트에서 제공하는 소정의 신청양식을 작성하여 당사이트와 이용자간에 체결하는 계약<br/>
										- 가 입 : 당 사이트가 제공하는 신청서 양식에 해당정보를 기입하고, 본 약관에 동의하여 서비스 이용계약을 완료시키는 행위<br/>
										- 탈퇴(해지) : 이용자가 이용계약을 종료시키는 행위<br/>
										
										제2장 이용 계약의 체결<br/>
										제5조 (이용계약의 성립)<br/>
										① 이용계약은 이용자가 당 사이트에서 제공하는 소정의 신청양식에서 요구하는 사항을 기록하여 가입을 완료하는 것으로 성립합니다.<br/>
										제6조 (서비스 이용 신청)<br/>
										① 이용자로 가입하여 본 서비스를 이용하고자 하는 이용자는 당 사이트에서 요청하는 제반정보(이름, 휴대폰번호 등)를 제공하여야 합니다.<br/>
										제7조 (이용신청의 제한)<br/>
										① 당 사이트는 다음 각 호에 해당하는 이용계약 신청에 대하여는 이를 승낙하지 아니합니다.<br/>
										- 타인의 명의를 이용하여 신청한 경우<br/>
										- 이용계약 신청서의 내용을 허위로 기재한 경우<br/>
										- 영리 추구 및 미풍양속 저해할 목적으로 본 서비스를 이용하고자 하는 경우<br/>
										- 당 사이트를 이용하여 법령과 본 약관이 금지하는 행위를 하는 경우<br/>
										② 당 사이트는 다음 각 항에 해당하는 경우 그 사유가 해소될 때까지 이용계약 성립을 유보할 수 있습니다.<br/>
										- 서비스 관련 제반 용량이 부족한 경우<br/>
										- 기술상 장애 사유가 있는 경우<br/>
										
										제3장 서비스의 이용<br/>
										제8조 (서비스 이용시간)<br/>
										① 서비스 이용시간은 당 사이트의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다.<br/>
										② 제1항의 이용시간 중 정기점검 등의 필요로 인하여 당 사이트가 정한 날 또는 시간은 예외로 합니다.<br/>
										제9조 (서비스의 중지)<br/>
										① 당 사이트는 시스템 정기점검, 증설 및 교체를 위해 당 사이트가 정한 날 이나 시간에 서비스를 일시 중단할 수 있으며, 예정되어 있는 작업으로 인한 서비스 일시중단은 홈페이지에 사전 공지합니다.<br/>
										② 당 사이트는 국가 비상사태, 정전, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 정상적인 서비스 제공이 불가능할 경우, 서비스의 전부 또는 일부를 제한하거나 중지할 수 있습니다.<br/>
										③ 당 사이트는 제1항 또는 제2항의 사유로 인한 서비스 중지로 본 서비스에 보관 또는 전송된 메시지와 기타 통신메시지 등의 내용이 보관되지 못하거나 삭제 또는 전송되지 못한 경우 및 기타 통신 데이터의 손실이 있을 경우에 책임을 부담하지 아니합니다.<br/>
										제10조 (게시물의 관리)<br/>
										① 당 사이트는 다음 각 호에 해당하는 게시물이나 자료를 사전통지 없이 삭제하거나 이동할 수 있습니다.<br/>
										- 본 서비스 약관에 위배되거나 상용 또는 불법, 음란, 저속하다고 판단되는 게시물을 게시한 경우<br/>
										- 다른 이용자 또는 제3자를 비방하거나 중상모략으로 명예를 손상시키는 내용<br/>
										- 공공질서 및 미풍양속에 위반되는 내용인 경우<br/>
										- 범죄적 행위에 결부된다고 인정되는 내용일 경우<br/>
										- 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우<br/>
										- 정치적 견해차이, 인종‧성별‧지역‧종교에 대한 차별 또는 비하내용인 경우<br/>
										- 기타 관계법령에 위배되는 경우<br/>
										
										제11조 (정보 제공 및 홍보물 게재)<br/>
										① 당 사이트는 이용자에게 서비스 이용에 필요가 있다고 인정되는 각종 정보를 전자우편, SMS(문자메시지 전송서비스), 알림톡 등의 방법으로 제공할 수 있습니다.<br/>
										② 당 사이트는 서비스에 적정하다고 판단되거나 공익성이 있는 홍보물을 게재할 수 있습니다.<br/>
										
										제4장 계약 당사자의 의무<br/>
										제12 조 (당 사이트의 의무)<br/>
										① 당 사이트는 이 약관에서 정한 바에 따라 계속적, 안정적으로 서비스를 제공할 의무가 있습니다.<br/>
										② 제1항의 이용시간 중 정기점검 등의 필요로 인하여 당 사이트가 정한 날 또는 시간은 예외로 합니다.<br/>
										- 법률에 특별한 규정이 있는 경우<br/>
										- 범죄에 대한 수사상의 목적으로 국가기관의 요구가 있는 경우<br/>
										- 정보통신윤리위원회의 요청이 있는 경우<br/>
										③ 당 사이트는 개인정보 보호를 위해 보안시스템을 구축하며 개인정보 보호정책을 공시하고 준수합니다.<br/>
										④ 당 사이트는 이용자로부터 제기되는 의견이나 불만이 정당하다고 인정할 경우에는 즉시 처리하여야 합니다. 다만, 즉시 처리가 곤란한 경우에는 이용자에게 그 사유와 처리일정을 통보하여야 합니다.<br/>
										제13조 (이용자의 의무)<br/>
										① 이용자는 회원가입 또는 가입정보 변경시 실명으로 모든 사항을 사실에 근거하여 작성하여야 하며, 허위 또는 타인의 정보를 등록할 경우 일체의 권리를 주장할 수 없습니다.<br/>
										② 이용자는 본 약관에서 규정하는 사항과 당 사이트가 공지하는 사항 및 관계법령을 준수하여야 하며, 기타 당 사이트의 업무에 방해가 되는 행위, 당 사이트의 명예를 손상시키는 행위를 해서는 안됩니다.<br/>
										③ 당 사이트가 관계법령 및 ‘개인정보 보호정책’에 의거하여 그 책임을 지는 경우를 제외하고 이용자의 로그인 정보 관리소홀, 부정사용에 의하여 발생하는 모든 결과에 대한 책임은 이용자에게 있습니다.<br/>
										④ 이용자는 당 사이트 및 제3자의 지적재산권을 침해해서는 안됩니다.<br/>
										⑤ 이용자는 다음 각 호에 해당하는 행위를 하여서는 안되며, 해당 행위를 하는 경우에 당 사이트는 서비스 이용제한 및 금지를 포함한 제재를 가할 수 있습니다.<br/>
										- 다른 이용자의 로그인 정보를 도용하는 행위<br/>
										- 당 사이트의 운영진, 직원 또는 관계자를 사칭하는 행위<br/>
										- 당 사이트로부터 특별한 권리를 부여받지 않고 당 사이트의 클라이언트 프로그램을 변경하거나, 당 사이트의 서버를 해킹하거나, 웹사이트 또는 게시된 정보의 일부분 또는 전체를 임의로 변경하는 행위<br/>
										- 당 사이트의 전자우편, SMS(문자메시지 전송서비스) 서비스 등을 사전승낙 없이 영리목적에 이용하는 경우<br/>
										- 본 서비스를 통해 얻은 정보를 당 사이트의 사전 승낙 없이 서비스 이용 외의 목적으로 복제하거나, 이를 출판 및 방송 등에 사용하거나, 제3자에게 제공하는 행위<br/>
										- 공공질서 및 미풍양속에 위반되는 저속, 음란한 내용의 정보, 문장, 도형, 음향, 동영상을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게 유포하는 행위<br/>
										- 모욕적이거나 개인신상에 대한 내용이어서 타인의 명예나 프라이버시를 침해할 수 있는 내용을 전송, 게시, 전자우편 또는 기타의 방법으로 타인에게 유포하는 행위<br/>
										- 다른 이용자를 희롱 또는 위협하거나, 특정 이용자에게 지속적으로 고통 또는 불편을 주는 행위<br/>
										- 타인의 의사에 반하여 광고성 정보 등 일정한 내용을 지속적으로 전송하는 행위<br/>
										- 당 사이트의 승인을 받지 않고 다른 사용자의 개인정보를 수집 또는 저장하는 행위<br/>
										
										제5장 계약 해지 및 이용 제한<br/>
										제14조 (계약 해지)<br/>
										① 이용자가 당 사이트에서 제공하는 서비스를 제공받을 의사가 없는 등의 사유가 있을 경우에는 언제든지 탈퇴를 할 수 있습니다.<br/>
										제15조 (이용제한)<br/>
										① 당 사이트는 이용자가 본 약관 제13조(이용자의 의무) 등 본 약관의 내용에 위배되는 행위를 한 경우 사전 동의 없이 서비스 사용을 제한하거나 이용계약을 해지할 수 있습니다.<br/>
										제16조 (손해배상)<br/>
										① 당 사이트는 무료로 제공되는 서비스 이용과 관련하여 어떠한 손해가 발생하더라도 당 사이트가 고의로 행한 범죄행위를 제외하고는 이에 대하여 책임을 지지 않습니다.<br/>
										제17조 (면책조항)<br/>
										① 당 사이트는 무료로 제공되는 서비스 이용과 관련하여 어떠한 손해가 발생하더라도 당 사이트가 고의로 행한 범죄행위를 제외하고는 이에 대하여 책임을 지지 않습니다.<br/>
										② 당 사이트는 천재지변, 전쟁 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 대한 책임이 면제됩니다.<br/>
										③ 당 사이트는 기간통신 사업자가 전기통신 서비스를 중지하거나 정상적으로 제공하지 아니하여 손해가 발생한 경우 책임이 면제됩니다.<br/>
										④ 당 사이트는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 부득이한 사유로 발생한 손해에 대한 책임이 면제됩니다.<br/>
										⑤ 당 사이트는 이용자의 귀책사유로 인한 서비스의 이용 장애 또는 손해에 대하여 책임을 지지 않습니다.<br/>
										⑥ 당 사이트는 이용자의 컴퓨터 오류에 의해 손해가 발생한 경우 또는 이용자 신상정보 및 전자우편 주소를 부실하게 기재하여 손해가 발생한 경우 책임을 지지 않습니다.<br/>
										⑦ 당 사이트는 이용자가 서비스를 이용하면서 얻은 자료로 인한 손해에 대하여 책임을 지지 않습니다. 또한 당 사이트는 이용자가 서비스를 이용하며 타 이용자로 인해 입게 되는 정신적 피해에 대하여 보상할 책임을 지지 않습니다.<br/>
										⑧ 당 사이트는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.<br/>
										⑨ 당 사이트는 이용자가 서비스에 게재한 각종 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 대하여 책임을 지지 않습니다.<br/>
										⑩ 당 사이트는 이용자 상호간 및 이용자와 제3자간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임도 없습니다.<br/>
										⑪ 당 사이트에서 이용자에게 무료로 제공하는 서비스의 이용과 관련해서 어떠한 손해도 책임을 지지 않습니다.<br/>
										제18조(관할법원)
										① 이 약관에 명시되지 않은 사항은 전기통신사업법 등 관계법령과 상위법에 따릅니다.<br/>
										서비스 이용으로 발생한 분쟁에 대해 소송이 제기되는 경우 서울특별시 중구를 관할하는 법원을 관할 법원으로 합니다.<br/>
										
										[부칙]<br/>
										(시행일) 본 약관은 2024년 2월 29일부터 적용됩니다.<br/>
								
							
										</Agree>
            
            </MainData>
      
            <ApplyItem >
                <div style={{dispaly:"flex", alignItems:"flex-end", marginRight :35, justifyContent:"center"}}>   
                    <FilterApplyButton onClick ={_handlelicenseapply2}><FilterApplyButtonText>계약 내용을 이해 하였고 이에 동의합니다</FilterApplyButtonText></FilterApplyButton>
                </div>
            </ApplyItem>
            </Box>)
          } */}
    
        </Fade>
      </Modal>
    </div>
  );
}