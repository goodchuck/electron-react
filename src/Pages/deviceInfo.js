import React from "react";
import Layout from "./layout";
import "../CSS/DeviceInfo.css";
import { Chart } from "react-google-charts";
import * as DM from "../JS/doroseeModule/doroseeModule.js"
class DashInfo {
    static ajaxReturn = [];
  
    static init() {
      DashInfo.ajaxReturn = [];
      console.log("DashInfo 진입");
    //   DashInfo.getDashInfo();
    }
  
    static setValue() {
      console.log("DashInfo.ajaxReturn",DashInfo.ajaxReturn);
      let dw = document.getElementsByClassName("device_wrapper")[0];
      for(let i=0; i<DashInfo.ajaxReturn.length; i++){
        let DeviceCard = document.createElement("div");
        DeviceCard.setAttribute("class", "flex-mid device");
        DeviceCard.innerText = DashInfo.ajaxReturn[i].spot;
        DeviceCard.onclick = function() {
          DashInfo.clickCard(DeviceCard);
        }
        dw.appendChild(DeviceCard);
      }
      document.getElementById("spotValue").innerText = DashInfo.ajaxReturn[0].spot;
      document.getElementById("addressValue").innerText = DashInfo.ajaxReturn[0].address;
      document.getElementById("deviceInfo_user").innerText = DashInfo.ajaxReturn[0].admin;
      document.getElementById("DI_Temp").innerText = Math.round(DashInfo.ajaxReturn[0].temperature * 100) / 100 + "℃";
      document.getElementById("DI_Moisture").innerText = Math.round(DashInfo.ajaxReturn[0].moisture * 100) / 100 + "%";
      document.getElementById("DI_ph").innerText = Math.round(DashInfo.ajaxReturn[0].ph * 100) / 100 + "";
      document.getElementById("DI_ec").innerText = Math.round(DashInfo.ajaxReturn[0].ec * 100) / 100 + "";
      // document.getElementById("DI_n").innerText = Math.round(DashInfo.ajaxReturn[0].n * 100) / 100 + "";
      // document.getElementById("DI_p").innerText = Math.round(DashInfo.ajaxReturn[0].p * 100) / 100 + "";
      // document.getElementById("DI_k").innerText = Math.round(DashInfo.ajaxReturn[0].k * 100) / 100 + "";
      // DashInfo.ajaxReturn = [];
    }
  
    static clickCard(e) {
      for(let i=0; i<DashInfo.ajaxReturn.length; i++){
        if(e.innerText === DashInfo.ajaxReturn[i].spot){
          document.getElementById("spotValue").innerText = DashInfo.ajaxReturn[i].spot;
          document.getElementById("addressValue").innerText = DashInfo.ajaxReturn[i].address;
          document.getElementById("deviceInfo_user").innerText = DashInfo.ajaxReturn[i].admin;
          document.getElementById("DI_Temp").innerText = Math.round(DashInfo.ajaxReturn[i].temperature * 100) / 100 + "℃";
          document.getElementById("DI_Moisture").innerText = Math.round(DashInfo.ajaxReturn[i].moisture * 100) / 100 + "%";
          document.getElementById("DI_ph").innerText = Math.round(DashInfo.ajaxReturn[i].ph * 100) / 100 + "";
          document.getElementById("DI_ec").innerText = Math.round(DashInfo.ajaxReturn[i].ec * 100) / 100 + "";
          // document.getElementById("DI_n").innerText = Math.round(DashInfo.ajaxReturn[i].n * 100) / 100 + "";
          // document.getElementById("DI_p").innerText = Math.round(DashInfo.ajaxReturn[i].p * 100) / 100 + "";
          // document.getElementById("DI_k").innerText = Math.round(DashInfo.ajaxReturn[i].k * 100) / 100 + "";
  
        }
      }
      
    }
    
    // static getDashInfo() {
    //   console.log("getDashInfo실행")
    //   DM.LoginManager.start();
    //   let Request = {
    //     "url" : "https://treeplan.kr:60000/dash-info",
    //     "method" : "GET",
    //     "crossDomain": true,
    //     // "async" : false,
    //   }
    
    //   $.ajax(Request)
    //   .done(function(response){ //성공시 메인 페이지로
    //     DM.LoginManager.stop();
    //     console.log("response->",response, response.status);
    //     if (response.status == "success") {
    //       for(let i=0; i<response.result.length; i++){
    //         DashInfo.ajaxReturn.push(response.result[i])
    //         // document.getElementsByClassName("device")[i].innerText = response.result[i].spot;
    //       }
    //       DashInfo.setValue();
    
    //       //document.getElementById("device1").innerText = response.result[0].spot;
    //     }
    //   })
    //   .fail(function(response){ //실패시
    //     alert("로그인 상태를 확인해주세요");
    //   })
    // }
}

function DeviceInfo() {
    DashInfo.init();
    DM.LoginManager.start();
    DM.LoginManager.stop();
    return (
        <div style={{display:'flex', flexDirection:"column"}}>
            DeviceInfo!
            <Chart
                chartType="ScatterChart"
                data={[["Age", "Weight"], [4, 5.5], [8, 12]]}
                width="100%"
                height="400px"
                legendToggle
            />
        </div>
    )
}

export default DeviceInfo;