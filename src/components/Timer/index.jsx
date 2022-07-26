/* eslint-disable no-unused-vars */
import { Box } from "@mui/material";
import axiosInstance from "config/api";
import moment from "moment";
import { useEffect, useState } from "react";
import { CgFormatSlash } from "react-icons/cg";
import { useSelector } from "react-redux";

const Timer = ({ time, id }) => {
  const [timeOut, setTimeOut] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const target = new Date(`${time}`);
    const interval = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      setHours(h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setTimeOut(true);
        axiosInstance.post("/admin/decline-transaction", {
          id,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          background: "#FF6B6B",
          // mr: 2,
          color: "white",
          width: "32px",
          height: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 1,
          fontWeight: 700,
          fontSize: "14px",
        }}
      >
        {timeOut ? 0 : hours}h
      </Box>
      <CgFormatSlash fontSize="30px" color="#FF6B6B" />
      <Box
        sx={{
          background: "#FF6B6B",
          color: "white",
          width: "32px",
          height: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 1,
          fontWeight: 700,
          fontSize: "14px",
        }}
      >
        {timeOut ? 0 : minutes}m
      </Box>
      <CgFormatSlash fontSize="30px" color="#FF6B6B" />

      <Box
        sx={{
          background: "#FF6B6B",
          // mr: 2,
          color: "white",
          width: "32px",
          height: "32px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 1,
          fontWeight: 700,
          fontSize: "14px",
        }}
      >
        {timeOut ? 0 : seconds}s
      </Box>
    </Box>
  );
};

export default Timer;
