// 회원가입 페이지

(function() {
  // form input 문자 counter
  const formSelectEl = document.querySelectorAll('select');
  M.FormSelect.init(formSelectEl, {});

  const characterCouterEl = document.querySelectorAll(
    'input#userId, input#password, input#passwordConfirm, input#name'
  );
  M.CharacterCounter.init(characterCouterEl, {});

  const modalEl = document.querySelectorAll('.modal');
  M.Modal.init(modalEl, {
    preventScrolling: false
  });

  // 우편번호 tabs
  const addressTabs = document.querySelectorAll('.tabs');
  M.Tabs.init(addressTabs, {});

  // 전체동의 checked
  const selectAll = document.querySelector('.js-formCheckboxAll');
  function registerToggle() {
    checkboxes = document.querySelectorAll('.registerAgree');

    checkboxes.forEach(checkbox => {
      checkbox.checked = selectAll.checked;
    });
  }

  selectAll.addEventListener('click', registerToggle);

  // function toggle(source) {
  //   checkboxes = document.getElementsByName('foo');
  //   for (var i = 0, n = checkboxes.length; i < n; i++) {
  //     checkboxes[i].checked = source.checked;
  //   }
  // }

  // 전체동의 Collapsible
  const agreeEl = document.querySelectorAll('.collapsible');
  M.Collapsible.init(agreeEl, {});

  // collapsible icon 바꾸기
  const collapsibleHeaderList = document.querySelectorAll(
    '.js-collapsible-header'
  );

  // 코드가 이상함
  collapsibleHeaderList.forEach(collapsibleHeader => {
    const collParentEl = collapsibleHeader.parentElement;

    const iconsElements = collapsibleHeader.children[1].children[0];

    collapsibleHeader.addEventListener('click', () => {
      if (collParentEl.classList.contains('active')) {
        iconsElements.textContent = 'add';
      } else {
        iconsElements.textContent = 'remove';
      }
    });
  });

  // input 전체동의 checkbox value

  const checkAll = document.querySelector('.js-formCheckboxAll');
  const inputCheckes = document.querySelectorAll('.registerAgree');

  // ! 리팩토링 필수
  inputCheckes.forEach(inputCheck => {
    inputCheck.addEventListener('input', e => {
      return e.target.checked
        ? (e.target.value = true)
        : (e.target.value = false);
    });
  });

  function inputAllCheckFunc(e) {
    inputCheckes.forEach(inputCheck => {
      return checkAll.checked
        ? (inputCheck.value = true)
        : (inputCheck.value = false);
    });
  }
  checkAll.addEventListener('input', inputAllCheckFunc);
})();
