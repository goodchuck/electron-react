import '../CSS/sidebar.css'
import side_logo_src from '../imgs/splash_icon.png'
import footer_img_src from '../imgs/sidebar/footerimg1.png'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
    let navigate = useNavigate();

    const Sidebar = 'Sidebar';
    const side_logo = 'side_logo';
    // const img_src = '../imgs/splash_icon.png';
    const none_word = 'none';

    const click_sidemenu = (cp) => {
        // console.log("e -> ",e);
        let e = cp.target;
        // e => div에서 class가  sidemenu인 태그
        // e.parentNode = <div class="sidemenu_Wrapper">
        for(let i=0; i<document.getElementsByClassName("sidefootermenu_open").length; i++){
          document.getElementsByClassName("sidefootermenu_open")[i].className = "sidefootermenu";
        }
        let eclass = e.parentNode.className;
        console.log(eclass);
      
        if(eclass === "sidemenu_Wrapper"){
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
              if(e.parentNode.className === "sidemenu_Wrapper_open"){
                e.parentNode.style.padding = "";  
              } 
              else {
                e.parentNode.style.padding = "15px 0 15px 0";
              }   
          } else {
            switch(e.innerText){
              case "장비정보":
                  navigate("/deviceInfo")
              break;
  
              case "장비관리현황":
                  navigate("/layout")
              break;
  
              case "관수 관리 현황":
                  navigate("/web")
              break;
              
              default:
  
              break;
          }
          }
        }
        else if (eclass === "sidemenu_Wrapper_open"){
            e.className = "sidemenu"
            e.parentNode.className = "sidemenu_Wrapper";
            if(e.parentNode.children[1]){
                e.parentNode.children[1].style.display = "none";
            }
        }


    }

    const click_sidemenu_detail = (cp) => {
        let e = cp.target;
        console.log("click_sidemenu_detail 실행")
        for (let i =0; i<e.parentNode.children.length; i++){
          e.parentNode.children[i].style.color = "#51B263";
          e.parentNode.children[i].style.fontWeight = "normal";
        }

        switch(e.innerText){
            case "관수정보":
            break;
        
            case "토양정보":
            break;
        
            case "사용자설정":
            break;

            default:
            break;
          }
        
          console.log("e.parentNode.childernNode",e.parentNode.children);
          console.log("e->",e.style.color);
          if(e.style.fontWeight === "normal"){
              // e.style.color = "#51B263";
              e.style.fontWeight = "bold";
          }
          else if(e.style.fontWeight === "bold") {
              // e.style.color = "";
              e.style.fontWeight = "normal";
          }
    }

    const click_footer = (cp) => {
        let e = cp.target;
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

          default:
          break;
        }
      
        switch(e.innerText) {
          case "통합 관리":
          break;
      
          case "수목데이터":
          break;
      
          case "인공지능관리":
            //
          break;

          default:
          break;
        }
          
    }

    const sideMenu = [
      {name: '장비정보', sub : ['test1','test2']},
      {name: '장비관리현황', sub : 'none'},
      {name: '관수시스템', sub : ['관수정보','토양정보']},
      {name: '관수 관리 현황', sub : 'none'},
    ];
    // const sideMenuList = sideMenu.map((name,index) => (
    // <div className='sidemenu_Wrapper' onClick={(e) => click_sidemenu(e)} key={index}><div className="sidemenu">{name.name}</div></div>
    // ))

    const sideMenuList = sideMenu.map(function(name,index){
    if(name.sub === 'none'){
      return (
      <div className='sidemenu_Wrapper' onClick={(e) => click_sidemenu(e)} key={index}>
        <div className="sidemenu">
          {name.name}
        </div>
      </div>
      )
    } 
    else {
      let subArray = name.sub.map(function(name,index){
        return <div key={index}>{name}</div>
      })
      return (
        <div className='sidemenu_Wrapper' onClick={(e) => click_sidemenu(e)} key={index}>
          <div className="sidemenu">
            {name.name}
          </div>
          <div className="sidemenu_2" onClick={(e) => click_sidemenu_detail(e)}>
            {subArray}
          </div>
        </div>
      )
    }
    
    })
    return (
        <div id={Sidebar}>
            
            <img id={side_logo} src={side_logo_src} alt={none_word}/>
            <div style={{fontSize: 20+'px', fontWeight:800, color:'white'}}>원터치 수목관리</div>
            <div id="side_mid_div" className="side_div">
              {sideMenuList}
              {/* <div className="sidemenu_Wrapper" onClick={(e) => click_sidemenu(e)}>
                  <div className="sidemenu">장비정보</div>
              </div>
      
              <div className="sidemenu_Wrapper" onClick={(e) => click_sidemenu(e)}>
                  <div className="sidemenu">장비관리현황</div>
              </div>
              
              <div className="sidemenu_Wrapper" onClick={(e) => click_sidemenu(e)}>
                  <div className="sidemenu">
                      관수시스템
                  </div>
                  <div className="sidemenu_2" onClick={(e) => click_sidemenu_detail(e)}>
                  <div>관수정보</div>
                  <div>토양정보</div>
                  </div>
              </div>

              <div className="sidemenu_Wrapper" style={{border:0}} onClick={(e) => click_sidemenu(e)}>
                  <div className="sidemenu">관수 관리 현황</div>
              </div> */}
            </div>
              
            <div id="side_footer_div" className="side_div">
              <div className="sidefootermenu" onClick={(e) => click_footer(e)}>
                  <img src={footer_img_src} style={{width:20+'px', height:21.85+'px', marginLeft:20+'%'}} alt='none' />
                  통합 관리
              </div>

            </div>
        </div>
    )
    
}
export default SideBar;