import axios from "axios";
export default axios.create({
  baseURL: "https://upayments-studycase-api.herokuapp.com/api/",
  headers: {
    "Content-type": "application/json",
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtoYW5pa2hsYXE5OUBnbWFpbC5jb20iLCJnaXRodWIiOiJodHRwczovL2dpdGh1Yi5jb20vaWtobGFxMSIsImlhdCI6MTY2MjM1NzI0NywiZXhwIjoxNjYyNzg5MjQ3fQ.4VEGAoVCZESrL7krc9-liAvESZEQBffrtDNrALwTvyA",
  },
});
