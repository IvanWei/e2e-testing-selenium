console.log('載入 selenium-webdriver...');
var webdriver = require('selenium-webdriver');
var assert = require('assert');

console.log('設定 Selenium 測試時使用的 Browser (Chrome)... OK');
var driver = new webdriver.Builder().
withCapabilities(webdriver.Capabilities.chrome()).
build();
console.log('Browser 設定... OK');

console.log('設定受測網址位置...');
driver.get('http://www.google.com');
console.log('設定受測網址位置... OK');

console.log('==================進入測試==================');
// 取當前瀏覽器大小
driver.manage().window().getSize().then(function(browserSize){
  console.log('第一次取 Browser 大小...');
  console.log('當前瀏覽器高度： ' + browserSize.height + 'px');
  console.log('當前瀏覽器寬度: ' + browserSize.width + 'px');
  driver.sleep(2000);
});

// 調整 Browser 大小， seleinum 準許的最小長寬是 hieght = 272，width = 400
var browserHeight = 310, browserWidth = 410;
driver.manage().window().setSize(browserWidth, browserHeight);

// 取當前瀏覽器大小
driver.manage().window().getSize().then(function(browserSize){
  console.log('縮小 Browser...');
  console.log('第二次取 Browser 大小...');
  console.log('調整後瀏覽器高度（' + browserHeight + '）： ' + browserSize.height + 'px');
  console.log('調整後瀏覽器寬度（' + browserWidth + '）： ' + browserSize.width + 'px');
  assert.equal(browserSize.height, browserHeight);
  assert.equal(browserSize.width, browserWidth);
  driver.sleep(2000);
});

// 最大視窗
driver.manage().window().maximize();

// 取當前瀏覽器大小
driver.manage().window().getSize().then(function(browserSize){
  console.log('放大 Browser...');
  console.log('第三次取 Browser 大小...');
  console.log('最大化後瀏覽器高度：' + browserSize.height + 'px');
  console.log('最大化後瀏覽器寬度：' + browserSize.width + 'px');
  driver.sleep(2000);
});

driver.getTitle().then(function(title) {
  console.log('當前標題：' + title);
  assert.equal(title, 'Google');
  driver.sleep(2000);
});

var searchBar = driver.findElement(webdriver.By.name('q'));

searchBar.getCssValue("width").then(function(searchBarWidth){
  console.log('取 SearchBar 大小...');
  console.log('搜尋列寬度：' + searchBarWidth);
  searchBar.sendKeys('Cheese!');
  driver.sleep(2000);
  console.log('輸入「Cheese!」並按下查詢');
});

searchBar.submit();

driver.wait(function() {
  return driver.getTitle().then(function(title) {
    return title.toLowerCase().lastIndexOf('cheese!', 0) === 0;
  });
}, 3000);

driver.getTitle().then(function(title) {
  console.log('點下搜尋後的標題：' + title);
  assert.equal(title, 'Cheese! - Google 搜尋');
  console.log('==================結束測試==================');
  driver.sleep(2000);
});
driver.quit();
