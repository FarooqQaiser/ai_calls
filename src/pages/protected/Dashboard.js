import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Dashboard from "../../features/dashboard/index";
import { useNavigate } from "react-router-dom";

function InternalPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    // if (getToken) {
    //   getAllUsers()
    //   getAllGroupNames()
    //   setToken(getToken)
    // }
    if (!getToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Overview" }));
  }, [dispatch]);

  return <Dashboard />;
}

export default InternalPage;
