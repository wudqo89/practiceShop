// 주소 api - kakao
// http://postcode.map.daum.net/guide

(function() {
  const btnAddress = document.querySelector('.js-api-btnAddress');
  const postcode = document.querySelector('.js-api-postcode');
  const basicAddress = document.querySelector('.js-api-basicAddress');

  btnAddress.addEventListener('click', addressPopup);

  function addressPopup() {
    //팝업의 너비
    const width = 500;
    const height = 600;
    new daum.Postcode({
      width: width,
      height: height,
      oncomplete: function(data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
        // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        // console.log('data', data);
        postcode.value = data.zonecode;
        basicAddress.value = data.address;
      }
    }).open({
      // 주의 듀얼모니터라면 가운데 정렬 안된다
      left: window.screen.width / 2 - width / 2,
      top: window.screen.height / 2 - height / 2,
      popupName: 'postcodePopup'
    });
  }
})();
