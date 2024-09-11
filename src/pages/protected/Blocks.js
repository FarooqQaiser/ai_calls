import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

const Blocks = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle({ title: "Blocks" }));
  }, []);
  return <div>Blocks</div>;
};

export default Blocks;
