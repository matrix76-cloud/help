
import axios from 'axios'



export const getToken = async code => {
    const grant_type = 'authorization_code'
    const client_id = `d943f03d1af22dc77db2c9914ab142b5`;
    const REDIRECT_URI = "https://mapapp-30.web.app/auth";
    const AUTHORIZE_CODE = code;

    const res = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
      {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    )
    const token = res.data.access_token;

    console.log("token", token);
    return token;

}

export const getKaKaoUserData = async token => {
    const kakaoUser = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
    console.log("kakaoUser", kakaoUser);
    return await kakaoUser.data
}
