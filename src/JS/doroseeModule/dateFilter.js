import * as sensor from "../sensor.js";
import * as irrigation from "../Irrigation.js";
import * as AM from "../AllManagement.js";
class dateFilter{
    static async init() {
      try{
        console.log("데이터필터생성");
        let Sd = document.getElementById("Start_date");
        Sd.innerHTML = `
        <div id="selectWrapper" class="flex_mid">
          <select>
            <option>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;시스템 1</option>
            <option>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;시스템 2</option>
            <option>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;시스템 3</option>
            <option>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;시스템 4</option>
          </select>
          <img src="../img/icon/SelectDownArrow.png" style="position:absolute; right:10px; width:10px; height:10px;">
        </div>
        
        <div id="Start_date_right">
          <input name="month" id="PeriodStart" type="date">
          ~
          <input name="month" id="PeriodEnd" type="date">
        </div>
        
        <div id="dateBtnSort">
          <button class="dateBtn" id="btn_Today" style="border-radius: 2.62px 0px 0px 2.62px;"
            >오늘</button>
          <button class="dateBtn">1주일</button>
          <button class="dateBtn">1개월</button>
          <button class="dateBtn">6개월</button>
          <button class="dateBtn" style="border-radius: 0px 2.62px 2.62px 0px;"
            >1년
          </button>
        </div>

        <img src="../img/Irrigation/mag.png" style="width:37px; height:35px;">
        `
        for(let i=0; i<document.getElementsByClassName("dateBtn").length; i++){
          document.getElementsByClassName("dateBtn")[i].addEventListener("click",
          function() {
            dateFilter.search(this);
          })
        }
      }
      catch(e) {
        alert(e);
      }
    }

    static async search(e) {
      let ParentClassName = e.parentElement.className;
      let eText = e.innerText;
      switch(ParentClassName) {
        case "soil":
          sensor.SensorManager.getSoilValue(eText);
        break;
        
        case "irrigation":
          irrigation.Irrigation.getIrrigationValue(eText);
        break;

        case "AM":
          AM.AllManagement.getAjax(eText);
        break;
      }
      console.log("클릭함",e,e.parentElement.className ,e.innerText);
    }

    static getDateArray() {
      const today = new Date()
      const tomorrow = new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)
      const yesterday = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000)
      const beforeWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      const beforeMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      const beforeThreeMonth = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
      const beforeSixMonth = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()); 
      const beforeYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      let returnObject = {
        today:dateFilter.formatDate(today), 
        tomorrow:dateFilter.formatDate(tomorrow), 
        yesterday:dateFilter.formatDate(yesterday), 
        beforeWeek:dateFilter.formatDate(beforeWeek), 
        beforeMonth:dateFilter.formatDate(beforeMonth),
        beforeThreeMonth:dateFilter.formatDate(beforeThreeMonth),
        beforeSixMonth:dateFilter.formatDate(beforeSixMonth),
        beforeYear:dateFilter.formatDate(beforeYear)
      }
      return returnObject;
    }

    static formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
    }

    static getStartEndDate(period){
      let startDate = document.getElementById("PeriodStart");
      let endDate = document.getElementById("PeriodEnd");
      let sD;
      let eD;
      let DateObject = dateFilter.getDateArray();
      console.log("DMdFgDA",DateObject);
      switch(period){
        
          case "오늘":
              period="1D"
              sD = DateObject.today
              eD = DateObject.tomorrow
          break;

          case "1주일":
              period="1W"
              sD = DateObject.beforeWeek
              eD = DateObject.today
          break;

          case "1개월":
              period="1M"
              sD = DateObject.beforeMonth
              eD = DateObject.today
          break;

          case "6개월":
              period="6M"
              sD = DateObject.beforeSixMonth
              eD = DateObject.today
          break;

          case "1년":

              period="1Y"
              sD = DateObject.beforeYear
              eD = DateObject.today
          break;
      }
      startDate.value = sD;
      endDate.value = eD;
      let returnObject = {
        startDate : sD, 
        endDate : eD, 
        period : period
      }
      return returnObject;
    }
}

export {dateFilter};