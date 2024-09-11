import React, { useEffect } from "react";
import { setPageTitle } from "../../features/common/headerSlice";
import { useDispatch } from "react-redux";

const Tools = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle({ title: "Tools" }));
  }, []);
  return <div>Tools</div>;
};

export default Tools;
