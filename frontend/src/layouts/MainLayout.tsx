import { Layout } from "@consta/uikit/Layout";
import { Outlet } from "react-router-dom";
import Header from "../uicomponents/Header";

const MainLayout = ({curUser}) => {
    return(
      <Layout direction="column" style={{width: "100vw", height: "100vh", background: "#bac2c4"}}>
        <Header userInfo={curUser}/>
        <Layout direction="column" style={{width: "100%", overflowY: "hidden"}}>
           <Outlet /> 
        </Layout>
        
      </Layout>
    );
  };
  
  export default MainLayout;