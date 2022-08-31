import axios from "axios";
export default axios.create({
  baseURL: "https://upayments-studycase-api.herokuapp.com/api/",
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImlraGxhcTIwMUBnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vaWtobGFxMSIsImlhdCI6MTY2MTg1MjkyOCwiZXhwIjoxNjYyMjg0OTI4fQ.dXZgLvJb-bl1ttDLltgTiUrb9yfjnqZlvMjy59Rjnmg",
  },
});
