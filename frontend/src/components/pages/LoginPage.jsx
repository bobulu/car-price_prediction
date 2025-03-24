import Login from "../../components/Login";  

const LoginPage = () => {  // ✅ Renamed function
  return (
    <div className='p-8'>
      <Login />  
    </div>
  );
};

export default LoginPage;  // ✅ Export with new name
