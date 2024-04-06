import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Alert } from "@mui/material";

export default function Verify() {
  const { userId, verificationToken } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/verify/${userId}/${verificationToken}`);
        console.log("Verification response:", response.data);
        if (response.data.status === 'success') {
          setVerificationStatus("success");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
      } catch (error) {
        setVerificationStatus("error");
      }
    };

    verifyUser();
  }, [userId, verificationToken, navigate]);

  return (
    <div>
      {verificationStatus === "success" && (
        <Alert severity="success" sx={{ width: '100%', mt: 2 }}>
          Your account has been verified successfully. You will be redirected to the login page shortly. Have a great shopping trip!
        </Alert>
      )}
    </div>
  );
}
