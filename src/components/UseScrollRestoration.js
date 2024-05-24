import { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../context/User';

const UseScrollRestoration = () => {
  const location = useLocation();
 const scrollPositions = useRef({});

  const { user, dispatch2 } = useContext(UserContext);

  useEffect(() => {
    // 현재 스크롤 위치 저장
    scrollPositions.current[location.pathname] = window.scrollY;

    user["ref2"] = scrollPositions;
    dispatch2(user);

    console.log(
      "position save : ",
      scrollPositions.current[location.pathname],
      location.pathname
    );

    // 이전 페이지로 돌아갔을 때, 저장된 스크롤 위치로 복원
    const restoreScrollPosition = () => {
      if (user["ref2"].current[location.pathname] !== undefined) {
        window.scrollTo(0, user["ref2"].current[location.pathname]);
      }
    };

    if (
      user["ref2"].current[location.pathname] != "/home" &&
      user["ref2"].current[location.pathname] != "/"
    ) {
      restoreScrollPosition();
    }
  });
};

export default UseScrollRestoration;