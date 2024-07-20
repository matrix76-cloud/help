import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PrevLayout from "../screen/Layout/PrevLayout";
import CommunityDetailcontainer from "../container/CommunityDetailcontainer";

const CommunityDetailpage = () => {


  const {state} = useLocation();


  return (
    <PrevLayout
      menu={false}
      bottom={false}
      header={true}
      headerdetail={true}
      headername={"게시글"}
    >
      <CommunityDetailcontainer item={state.item} />
    </PrevLayout>
  );
};

export default CommunityDetailpage;
