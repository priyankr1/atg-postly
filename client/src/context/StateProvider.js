import { createContext, useContext, useEffect, useState } from "react";
const StateContext = createContext();

const StateProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [posts,setPosts]=useState([]);
  const [token,setToken]=useState();
  const [myPost, setMyPost] = useState([]);



  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token=localStorage.getItem("token");
    setUser(userInfo);
    setToken(token);
  }, []);
  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        posts,
        setPosts,
        token,
        setToken,
        myPost,
        setMyPost
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
export const useChange = () => {
  return useContext(StateContext);
};
export default StateProvider;
