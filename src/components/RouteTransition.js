


import { cloneElement } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Transition from "react-transition-group/Transition";

const RouteTransition = ({ location, children }) => {
  const pathname = location.pathname;
  const state = location.state;

  console.log("pathname", pathname);

  return (
    <TransitionGroup
      className={"transition-wrapper"}
      childFactory={(child) => {
        return cloneElement(child, {
          classNames: location.state?.direction || "navigate-push",
        });
      }}
    >
      {pathname == "/store" ? (
        <CSSTransition exact key={pathname} timeout={1000}>
          {children}
        </CSSTransition>
      ) : (
        <CSSTransition exact key={pathname} timeout={0}>
          {children}
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

export default RouteTransition;
