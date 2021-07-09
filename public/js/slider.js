/*
document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.slider')[0];
  console.log('elem', elems);

  M.Slider.init(elems, {
    height: 837,
    // default: 6000
    interval: 2000
  });
});
*/

// Component 함수 만들어서 하는 거 고치자

(function() {
  const elems = document.querySelectorAll('.slider')[0];

  M.Slider.init(elems, {
    height: 837,
    // default: 6000
    interval: 2000
  });
})();
