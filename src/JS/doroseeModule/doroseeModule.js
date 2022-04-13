// import {dateFilter} from "./dateFilter.js";
// import {SideBarManager} from "./SideBar.js";
import $ from 'jquery';
// import '../../CSS/loading.css';
class LoginManager { //현재 안씀
    static id = "";
    static pw = "";
    static token = "";
    static async start() {
        console.log("로딩중 페이지 출력")
        // if (document.getElementById('wfLoading')) {
        //     return;
        // }
        //   var ele = document.createElement('div');
        //   ele.setAttribute('id', 'wfLoading');
        //   ele.classList.add('loading-layer');
        //   // ele.innerHTML = '<span class="loading-wrap"><span class="loading-text"><span>.</span><span>.</span><span>.</span></span></span>';
        //   ele.innerHTML = '<div class="loader"></div>';
        //   document.body.append(ele);
      
        //   // Animation
        //   //ele.classList.add('active-loading');
        //   return "start";
        var ele = document.createElement('div');
        ele.setAttribute("class", "loadingWrapper");
        ele.innerHTML = `
        <div class="spinner-border" role="status" style="width:10rem; height:10rem;">
          <span class="visually-hidden">Loading...</span>
        </div>
        `
        document.body.appendChild(ele);

    }
  
    static async stop() {
        console.log("로딩중 페이지 사라짐")
        document.getElementsByClassName("loadingWrapper")[0].remove();
        // var ele = document.getElementById('wfLoading');
        // if (ele) {
        //   ele.remove();
        // }
        // return "stop";
    }
}

class AjaxManager {
    static async execute_ajax(text) {
        console.log("ajax실행")
        let message;
        $.ajax(text)
        .done(function(response){ //성공시
            console.log("response->",response, response.result);
            if (response.status == "success") {

            }
            message = response;
          })
          .fail(function(response){ //실패시
            console.log(response);
          })
        return message;
    }
    static test() {
        return "commonjs 모듈 테스트";
    }
}


class PagingManager {
  static async showPaging(page, perPage, total) {
    var $paging = $('.paging').empty();
    var numPages = 5;
    var pageStart = Math.floor((page - 1) / numPages) * numPages + 1;
    var pageEnd = pageStart + numPages - 1;
    var totalPages = Math.floor((total - 1) / perPage) + 1;

    if (pageEnd > totalPages)
      pageEnd = totalPages;

    var prevPage = pageStart -1;

    if(prevPage <1)
      prevPage = 1;

    var nextPage = pageEnd + 1;

    if(nextPage > totalPages)
      nextPage = totalPages;

    var $prevElem = $(`<a href="javascript:search(${prevPage},${perPage})">이전</a>`);
    $prevElem.addClass('prev');
    $paging.append($prevElem);

    for(let i = pageStart; i <= pageEnd; i++){
      var $elem = $(`<a href="javascript:search(${i},${perPage})">${i}</a>`);

      if ( i === page) {
        $elem.addClass('current');
      }

      $paging.append($elem);
    }

    var $nextElem = $('<a href ="javascript:search(' + nextPage + ',' + perPage + ')">다음</a>');
    $nextElem.addClass('next');
    $paging.append($nextElem);
  }
}

class dateManager {
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
}

let test = "ttttt";
// function swalfire() {
//     Swal.fire({
//       text: '최대 30초 정도 소요될 수 있습니다!',
//       // className: "SwalClass",
//       allowOutsideClick: false,
//       showConfirmButton: false,
//       heightAuto: false,
//       // html : '<div class="loader" style="width:100%; height:100%;"></div>'
//       didOpen: () => {
//         Swal.showLoading()
//       }
//     });
// }

// export {AjaxManager,LoginManager,dateFilter,SideBarManager,dateManager};
export {AjaxManager,LoginManager,dateManager,test};