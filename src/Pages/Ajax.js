import $ from 'jquery';
import axios from 'axios';
import cheerio from 'cheerio';

async function cr() {
  const response = await axios.get(
    `https://lostark.game.onstove.com/Profile/Character/%EC%A0%88%EB%AF%BF%EC%96%B4%EC%A3%BC%EC%84%B8%EC%9A%94`,
    // `https://www.yna.co.kr/sports/all`,
  {
    // headers: {
    //   'User-Agent':
    //   'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Whale/2.8.107.16 Safari/537.36',
    // 'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    // 'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8', 
    // },
  },
  {withCredentials: true}
  );

  const data = cheerio.load(response.data);
  console.log("ajaxdata", data);
}


function getAjax() {
    // let url = `https://reqres.in/api/users?page=1`
    let url = `https://lostark.game.onstove.com/Profile/Character/%EC%A0%88%EB%AF%BF%EC%96%B4%EC%A3%BC%EC%84%B8%EC%9A%94`
    console.log("testAjax 실행",url);
    let Request = {
      "url" : url,
      "method" : "GET",
      "crossDomain": true,
    }

    $.ajax(Request)
    .done(function(response){ //성공시 메인 페이지로
      console.log("response->",response, response.status);
      document.getElementById("test").innerText = JSON.stringify(response) ;
      if (response.status === "success") {
        // let S_IW = document.getElementById("S_IW"); //sensor-wrapper
        // if(response.result.length == 0){
        //     console.log("데이터가 비었음");
        //     S_IW.innerText = "";
        //     document.getElementById("graphWrapper").innerText = "데이터가 존재하지 않습니다.";
        //     return;
        // }
        for(let i=0; i<response.result.length; i++){
        }

      }
    })
    .fail(function(response){ //실패시
      alert("로그인 상태를 확인해주세요");
    })
}

const Ajax = () => {
    getAjax();
    // cr();
    return (
        <div id="test">

        </div>
    )
}

export default Ajax;