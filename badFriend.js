console.log('載入 selenium-webdriver...');
var webdriver = require('selenium-webdriver');
var assert = require('assert');

console.log('設定 Selenium 測試時使用的 Browser (Chrome)... OK');
var driver = new webdriver.Builder().
withCapabilities(webdriver.Capabilities.chrome()).
build();
console.log('Browser 設定... OK');

console.log('設定受測網址位置...');
driver.get('http://uccu.cool3c.com/');
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
var firstBrowserHeight = 510, firstBrowserWidth = 710;
driver.manage().window().setSize(firstBrowserWidth, firstBrowserHeight);

// 取當前瀏覽器大小
driver.manage().window().getSize().then(function(browserSize){
  console.log('縮小 Browser...');
  console.log('第二次取 Browser 大小...');
  console.log('調整後瀏覽器高度（' + firstBrowserHeight + '）： ' + browserSize.height + 'px');
  console.log('調整後瀏覽器寬度（' + firstBrowserWidth + '）： ' + browserSize.width + 'px');
  assert.equal(browserSize.height, firstBrowserHeight);
  assert.equal(browserSize.width, firstBrowserWidth);
  driver.sleep(2000);
});

// 取得 menu
// var menu = driver.findElement(webdriver.By.css('.sidebar-nav>li>a:first-child'));
// menu.click();

var secondBrowserHeight = 510, secondBrowserWidth = 410;
driver.manage().window().setSize(secondBrowserWidth, secondBrowserHeight);

// 取當前瀏覽器大小
driver.manage().window().getSize().then(function(browserSize){
  console.log('縮小 Browser...');
  console.log('第三次取 Browser 大小...');
  console.log('調整後瀏覽器高度（' + secondBrowserHeight + '）： ' + browserSize.height + 'px');
  console.log('調整後瀏覽器寬度（' + secondBrowserWidth + '）： ' + browserSize.width + 'px');
  assert.equal(browserSize.height, secondBrowserHeight);
  assert.equal(browserSize.width, secondBrowserWidth);
  console.log('==================結束測試==================');
  driver.sleep(2000);
});


driver.quit();