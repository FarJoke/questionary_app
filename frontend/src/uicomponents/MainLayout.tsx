import { Layout } from "@consta/uikit/Layout";
import MainMenu from "./MainMenu";
import { Outlet } from "react-router-dom";

const MainLayout = ({}) => {
    return(
      <Layout style={{width: "100vw", height: "100vh", background: "#bac2c4"}}>
        <MainMenu/>
        <Layout direction="column" style={{width: "85%"}}>
           <Outlet /> 
        </Layout>
        
      </Layout>
    );
  };
  
  export default MainLayout;