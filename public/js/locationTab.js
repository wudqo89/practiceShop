(function() {
  const tabsElement = document.querySelector('.js-communityTabs').children;

  let getDataUrl = [];

  for (let i = 0; i < tabsElement.length; i++) {
    const elements = tabsElement[i];
    let dataUrls = elements.children[0].dataset.url;
    getDataUrl.push(dataUrls);
  }

  // '/community/qna'
  const pathname = window.location.pathname;

  for (let i = 0; i < getDataUrl.length; i++) {
    const dataUrlelement = getDataUrl[i];

    if (pathname.indexOf(dataUrlelement) !== -1) {
      document
        .querySelector(`a[data-url=${getDataUrl[i]}]`)
        .classList.add('active');
    }
  }

})();
