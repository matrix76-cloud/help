import React, {useState, forwardRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Container = styled.div`
    flex-direction : column;
    width : 100%;
    margin-top : ${({mTop}) => mTop}px;
    margin-bottom : ${({mBottom}) => mBottom}px;
    
`

const Label  = styled.span`
    font-size : 14px;
    font-weight : 600;
    margin-bottom : 6px;
    font-weight: 700;
    color : ${({theme, isFocused}) =>( isFocused ? theme.label  : theme.label)};
`

const StyledTextInput = styled.input.attrs(({theme})=>({
    placeholderTextColor : theme.inputPlaceholder
}))`
    color : ${({color})=> color};
    padding-bottom : 5px;
    font-size  : ${({textsize}) => textsize}px;
    height: ${({height}) => height}px;
    border :1px;
    font-family : ${({theme}) =>theme.BOLD};
    width:90%;




`;


const Input =  forwardRef(({
    bgcolor,
    color,
    label,
    value,
    onChangeText,
    onSubmitEditing,
    onFocus,
    onBlur,
    height,
    placeholder,
    isPassword,
    disabled,
    returnKeyType,
    maxLength,
    multiline,
    blurOnSubmit,
    labeled,
    mTop,
    mBottom,
    textsize,
    width,
    bordervalue,
    secureTextEntry,
    keyboardType,
    paddingvalue,
    Focused
},ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Container  mTop ={mTop} secureTextEntry ={secureTextEntry}  mBottom ={mBottom} width={width} 
        bordervalue ={bordervalue} textsize={textsize} color ={color} >
            {
                labeled&&<Label isFocused = {isFocused}>{label}</Label>
            }
  
          <StyledTextInput
            isFocused ={isFocused}
            bgcolor = {bgcolor}
            color ={color}
            paddingvalue ={paddingvalue}
            value ={value}
            ref = {ref}
            height = {height}
            onChange ={onChangeText}
            editable = {!disabled}
            width = {width}
            bordervalue = {bordervalue}
            onSubmitEditing = {onSubmitEditing}
            onFocus ={Focused}
            onBlur = {()=> {
                setIsFocused(false);
                onBlur();
            }}
            placeholder = {placeholder}
            secureTextEntry = {secureTextEntry}
            returnkeyType = {returnKeyType}
            maxLength = {maxLength}
            autoCapitalize ="none"
            autoCorrent = {false}
            textConentType = "none"
            textAlignVertical="top"
            blurOnSubmit = {blurOnSubmit}
            multiline = {multiline}
            keyboardType = {keyboardType}
            underlineColorAndroid ="transparent"
            textsize ={textsize}
            />
        </Container>


    )
});

Input.defaultProps = {
    onBlur : () =>{},
    height : "40",
    editable : true,
    labeled : true,
    mTop : 20,
    mBottom : 20,
    width : 100,
    bordervalue : 5,
    keyboardType : "default",
    paddingvalue : 10,
    bgcolor :"#ffffff",
    textsize  :14,
    color : "#a6a6a6",
}



export default Input;