import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

const Squads = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle({ title: "Squads" }));
  }, []);
  return <div>Squads</div>;
};

export default Squads;
