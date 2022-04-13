
class SideBarManager {
    static init() {
      if(!document.getElementById("Sidebar")){
        console.log("Sidebar 없음");
        return;
      }
        console.log("SideBarManager init실행");
        const sidebar = document.getElementById("Sidebar");
        sidebar.innerHTML = `
        <img id="side_logo" src="../img/splash_icon.png">
        <div style="font-size:20px; font-weight:800;">원터치 수목관리</div>
        <div id="side_mid_div" class="side_div">
          <div class="sidemenu_Wrapper">
            <div class="sidemenu">장비정보</div>
          </div>
  
          <div class="sidemenu_Wrapper">
            <div class="sidemenu">장비관리현황</div>
          </div>
        
          <div class="sidemenu_Wrapper">
            <div class="sidemenu">
              관수시스템
            </div>
            <div class="sidemenu_2">
              <div>관수정보</div>
              <div>토양정보</div>
              <!--
              <div>사용자설정</div>
              -->
            </div>
          </div>
        <!--
          <div class="sidemenu_Wrapper">
            <div class="sidemenu">이상 판별</div>
          </div>
        -->
          <div class="sidemenu_Wrapper" style="border:0;">
            <div class="sidemenu">관수 관리 현황</div>
          </div>
        </div>
        
        <div id="side_footer_div" class="side_div">
          <div class="sidefootermenu">
            <img src="../img/sideBar/footerimg1.png" style="width:20px; height:21.85px; margin-left:20%;">
            통합 관리
          </div>
         <!--
          <div class="sidefootermenu">
            <img src="../img/sideBar/footerimg2.png" style="width:20px; height:21.85px; margin-left:20%;">
            수목데이터
          </div>
          <div class="sidefootermenu">
            <img src="../img/sideBar/footerimg3.png" style="width:20px; height:21.85px; margin-left:20%;">
            인공지능관리
          </div>
          -->
        </div>
        `;
  
        for(let i=0; i<document.getElementsByClassName("sidemenu").length; i++){
          document.getElementsByClassName("sidemenu")[i].addEventListener("click",
          function() {
            SideBarManager.click_sidemenu(this)
          }
          )
        }
  
        for(let i=0; i<document.getElementsByClassName("sidemenu_2").length; i++){
          for(let j=0; j<document.getElementsByClassName("sidemenu_2")[i].children.length; j++){
            document.getElementsByClassName("sidemenu_2")[i].children[j].addEventListener("click",
            function() {
              SideBarManager.click_sidemenu_detail(this)
            }
            )
          }
  
        }
  
        for(let i=0; i<document.getElementsByClassName("sidefootermenu").length; i++){
          document.getElementsByClassName("sidefootermenu")[i].addEventListener("click",
            function() {
              SideBarManager.click_footer(this)
            }
          )
        }
  
        document.getElementById("side_logo").addEventListener("click",
        function() {
          SideBarManager.changebody("","/page/DeviceInfo")
        }
      )
  
    }
    static click_sidemenu = (e) => {
    // e => div에서 class가  sidemenu인 태그
    // e.parentNode = <div class="sidemenu_Wrapper">
    for(let i=0; i<document.getElementsByClassName("sidefootermenu_open").length; i++){
      document.getElementsByClassName("sidefootermenu_open")[i].className = "sidefootermenu";
    }
    let eclass = e.parentNode.className;
    console.log(eclass);
  
    if(eclass == "sidemenu_Wrapper"){
      for(let i=0; i<e.parentNode.parentNode.children.length; i++){
        
        e.parentNode.parentNode.children[i].children[0].className="sidemenu";
        e.parentNode.parentNode.children[i].className = "sidemenu_Wrapper";
        
        if(e.parentNode.parentNode.children[i].children[1]){
          e.parentNode.parentNode.children[i].children[1].style.padding = "";
          e.parentNode.parentNode.children[i].children[1].style.display = "none";
        }
      }
  
      e.className = "sidemenu_open"
      e.parentNode.className = "sidemenu_Wrapper_open";
  
      console.log("e.parent.parent",e.parentNode.parentNode.children,e.parentNode);
  
      if(e.parentNode.children[1]){
          e.parentNode.children[1].style.display = "flex";
          if(e.parentNode.className == "sidemenu_Wrapper_open"){
            e.parentNode.style.padding = "";  
          } 
          else {
            e.parentNode.style.padding = "15px 0 15px 0";
          }
          
      }
  
      switch(e.innerText) { //장비정보, 이상 판별, 관수 관리 현황
        case "장비정보":
          SideBarManager.changebody(e,"/page/DeviceInfo");
          // location.href="./DeviceInfo.html"
          console.log(e.innerText);
        break;
  
        case "장비관리현황":
          SideBarManager.changebody(e,"/page/DeviceInfoDetail");
          // location.href="./DeviceInfo.html"
          console.log(e.innerText);
        break;
  
        case "이상 판별":
          SideBarManager.changebody(e,"/page/Abnormal");
          //location.href="./Abnormal.html"
          console.log(e.innerText);
        break;
  
        case "관수 관리 현황":
          SideBarManager.changebody(e,"/page/Irrigation/status");
          console.log(e.innerText);
        break;
      }
    }
    else if (eclass == "sidemenu_Wrapper_open"){
        e.className = "sidemenu"
        e.parentNode.className = "sidemenu_Wrapper";
        if(e.parentNode.children[1]){
            e.parentNode.children[1].style.display = "none";
        }
    }
    }
      
    static click_sidemenu_detail = (e) => {
      console.log("click_sidemenu_detail 실행")
      for (let i =0; i<e.parentNode.children.length; i++){
        e.parentNode.children[i].style.color = "#51B263";
        e.parentNode.children[i].style.fontWeight = "normal";
    }
  
    switch(e.innerText){
      case "관수정보":
        SideBarManager.changebody(e,"/page/Irrigation");
        // location.href="./Irrigation.html"
      break;
  
      case "토양정보":
        SideBarManager.changebody(e,"/page/Soil");
        //location.href="./Soil.html"
      break;
  
      case "사용자설정":
        SideBarManager.changebody(e,"/page/UserConfig");
        //location.href="./UserConfig.html"
      break;
    }
  
    console.log("e.parentNode.childernNode",e.parentNode.children);
    console.log("e->",e.style.color);
    if(e.style.fontWeight == "normal"){
        // e.style.color = "#51B263";
        e.style.fontWeight = "bold";
    }
    else if(e.style.fontWeight = "bold") {
        // e.style.color = "";
        e.style.fontWeight = "normal";
    }
    
    }
      
    static click_footer = (e) => {
    // e.className = "sidefootermenu_open";
    document.getElementsByClassName("sidemenu_open")[0].className = "sidemenu"
    document.getElementsByClassName("sidemenu_Wrapper_open")[0].className = "sidemenu_Wrapper"
    document.getElementsByClassName("sidemenu_2")[0].style.padding = "";
    document.getElementsByClassName("sidemenu_2")[0].style.display = "none";
    for(let i=0; i<document.getElementsByClassName("sidefootermenu_open").length; i++){
      document.getElementsByClassName("sidefootermenu_open")[i].className = "sidefootermenu";
    }
  
    switch(e.className) {
      
      case "sidefootermenu":
        e.className = "sidefootermenu_open";
        // e.style.color = "#F1FF54";
      break;
      
      case "sidefootermenu_open":
        e.className = "sidefootermenu";
        // e.style.color = "";
      break;
    }
  
    switch(e.innerText) {
      case "통합 관리":
        SideBarManager.changebody(e,"/page/AllManagement");
      break;
  
      case "수목데이터":
        SideBarManager.changebody(e,"/page/TreeData");
      break;
  
      case "인공지능관리":
        //
      break;
    }
      
    }
  
    // static changebody = (e, page) => {
  
    //   let Contents = $("#maindiv");
    //   // lethistory_page = current_page;
    //   let current_page = page;
    //   Contents.load(current_page);
    // }
  }

  export {SideBarManager};