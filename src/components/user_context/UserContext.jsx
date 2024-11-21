import { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/") {
      const fetchUserData = async () => {
        try {
          const response = await fetch("/api/user/validate-current-user", {
            method: "GET",
          });
          const result = await response.json();
          if (response.ok) {
            setUser(result);
            return;
          }
          navigateTo("/");
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };
      fetchUserData();
    }
  }, [location.pathname, navigateTo]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
