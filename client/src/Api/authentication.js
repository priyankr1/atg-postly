import axios from "axios";
export const loginApi = async ( dataInfo ) => {
    if ( !dataInfo.email || !dataInfo.password ) {
        return {
          success: false,
          message: "Please provide all required things.",
        };
      }
      const {data}= await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/login`,{
        email: dataInfo.email,
        password: dataInfo.password,

      });
      return data;
    
      
};

export const signupApi = async (dataInfo) => {
  console.log("working");
  if (!dataInfo.name || !dataInfo.email || !dataInfo.password || !dataInfo.passwordConfirm) {
    return {
      success: false,
      message: "Please provide all required things.",
    };
  }
  try{
  const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/signup`,{
    name: dataInfo.name,
    email: dataInfo.email,
    password: dataInfo.password,
    passwordConfirm: dataInfo.passwordConfirm,
  });
  console.log("working");
  return data;

  }catch(err){
    const data={success:false,message:err.response.data.message}
    console.log(err);
    return data;
  }
};
