import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authstatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      if (authentication && authstatus !== authentication) {
        navigate("/login");
      } else if (!authentication && authstatus !== authentication) {
        navigate("/");
      }
      setLoader(false);
    }, 500); // Delay prevents state update conflicts
  }, [authstatus, authentication, navigate]);

  return loader ? <Loader /> : children;
};

export default AuthLayout;
