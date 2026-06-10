import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const sendMessage = (
  question,
  subject,
  mode,
  grade
) => {
  return API.post("/chat", {
    question,
    subject,
    mode,
    grade,
  });
};