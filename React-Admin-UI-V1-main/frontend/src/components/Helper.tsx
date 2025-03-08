import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Helper = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    localStorage.setItem("role", pathParts[1]); // Store role in localStorage
    setRole(pathParts[1]); // Extract "farmer", "admin", etc.
    redirect()
  }, []);

  const redirect = () => {
    setTimeout(() => {
      navigate(`/home`);
    }, 2000);
  
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto"></div>
        <h1 className="mt-4 text-xl font-semibold text-gray-700">
          Redirecting... to <span className="text-blue-600 font-bold">{role}</span>
        </h1>
      </div>
    </div>
  );
};

export default Helper;