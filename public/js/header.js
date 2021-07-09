// https://materializecss.com/sidenav.html

(function() {
  const sideNavElems = document.querySelectorAll('.sidenav');
  const sideNavInstances = M.Sidenav.init(sideNavElems, {
    inDuration: 250,
    outDuration: 200,
    draggable: false,
    onOpenStart: function() {
      // console.log('open sidebar');
    }
  });

  // wesbos꺼 참고
  // https://www.youtube.com/watch?v=5FLOBCGH3_U
  // navContent에 css 추가삭제 기능
  const navbar = document.querySelector('.navbar-fixed');
  const navContent = document.querySelector('.nav-content');
  const navbarPlace = navbar.offsetTop;
  const disappearPoint = 50;
  // window.onscroll, window.addEventListener('scroll') 같은 거임
  window.addEventListener('scroll', showNavContent);

  function showNavContent() {
    // window.scrollY 도 사용가능
    //console.log('페이지위치', window.pageYOffset);

    if (window.pageYOffset > navbarPlace + disappearPoint) {
      navContent.classList.add('nav-content-show');
    } else {
      navContent.classList.remove('nav-content-show');
    }
  }

  // top
  const top = document.querySelector('.top-box');
  // console.log('cc', top.offsetTop);
  // console.log('cc', top.offsetHeight);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > top.offsetHeight) {
      // _global.scss에 .hide
      top.classList.add('hide');
    } else {
      top.classList.remove('hide');
    }
  });

  // drop-down
  let dropDownElems = document.querySelectorAll('.dropdown-trigger');

  const options = {
    constrainWidth: false,
    coverTrigger: false,
    hover: true,
    inDuration: 300,
    outDuration: 300
  };

  M.Dropdown.init(dropDownElems[1], options);
  M.Dropdown.init(dropDownElems[3], options);
  M.Dropdown.init(dropDownElems[5], options);

  // nav에 각 borderBottom
  const pathname = window.location.pathname;
  const aboutusLink = document.querySelector(`a[href="/aboutus"]`);
  const linesLink = document.querySelectorAll(`a[href="/lines/scalppack"]`)[0];
  const linesSubLink = document.querySelectorAll('.lines-sub-link');
  const globalretailersLink = document.querySelector(
    `a[href="/globalretailers"]`
  );
  const onlineshopLink = document.querySelector(`a[href="/onlineshop"]`);
  const reviewLink = document.querySelector(`a[href="/review"]`);
  const communityLink = document.querySelectorAll(`a[href="/community"]`)[1];

  /*
  function changeBorderAndColor(element) {
    if (!element || typeof element !== 'object') {
      return; // Invalid element, return immediately
    }
    element.style.borderBottom = '1px solid #363636';
    element.style.color = '#363636';
  }

  const linesSubLinkObj = {
    scalppack: changeBorderAndColor,
    realshea: changeBorderAndColor,
    realmary: changeBorderAndColor
  };

  if ('scalppack' in linesSubLinkObj) {
    linesSubLinkObj['scalppack'](linesSubLink[0]);
  }
  */

  // * header nav
  // window.addEventListener('load', (e) => {})
  if (pathname === '/aboutus') {
    aboutusLink.style.borderBottom = '2px solid #000';
  } else if (pathname.includes('/lines')) {
    // pathname.indexOf('/lines') !== -1;
    linesLink.style.borderBottom = '2px solid #000';
  } else if (pathname === '/globalretailers') {
    globalretailersLink.style.borderBottom = '2px solid #000';
  } else if (pathname === '/onlineshop') {
    onlineshopLink.style.borderBottom = '2px solid #000';
  } else if (pathname === '/review') {
    reviewLink.style.borderBottom = '2px solid #000';
  } else if (pathname === '/community') {
    communityLink.style.borderBottom = '2px solid #000';
  }

  // *sub nav
  if (pathname.includes('/scalppack')) {
    linesSubLink[0].style.borderBottom = '1px solid #363636';
    linesSubLink[0].style.color = '#363636';
  } else if (pathname.includes('/realshea')) {
    linesSubLink[1].style.borderBottom = '1px solid #363636';
    linesSubLink[1].style.color = '#363636';
  } else if (pathname.includes('/realmary')) {
    linesSubLink[2].style.borderBottom = '1px solid #363636';
    linesSubLink[2].style.color = '#363636';
  }
})();
