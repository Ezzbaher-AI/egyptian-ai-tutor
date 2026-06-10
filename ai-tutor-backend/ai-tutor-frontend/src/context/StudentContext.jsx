import { createContext, useState } from "react";

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [student, setStudent] = useState({
    grade: "Grade 10",
    subject: "Math",
    weakTopics: [],
    masteredTopics: [],
  });

  return (
    <StudentContext.Provider
      value={{
        student,
        setStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}