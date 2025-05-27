import { Layout } from "@consta/uikit/Layout";
import MainMenu from "./MainMenu";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = ({curUser}) => {
    return(
      <Layout direction="column" style={{width: "100vw", height: "100vh", background: "#bac2c4"}}>
        <Header userInfo={curUser}/>
        <Layout direction="column" style={{width: "100%"}}>
           <Outlet /> 
        </Layout>
        
      </Layout>
    );
  };
  
  export default MainLayout;