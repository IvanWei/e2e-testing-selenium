console.log('載入 selenium-webdriver...');
var webdriver = require('selenium-webdriver');
console.log('設定 Selenium 測試時使用的 Broswer (Chrome)... OK');
var driver = new webdriver.Builder().
withCapabilities(webdriver.Capabilities.chrome()).
build();
console.log('設定受測網址位置...');
driver.get('http://www.google.com');
console.log('設定受測網址位置... OK');

console.log('==================進入測試==================');
// 取當前瀏覽器大小
driver.manage().window().getSize().then(function(broswerSize){
  console.log('當前瀏覽器高度： ' + broswerSize.height + 'px');
  console.log('當前瀏覽器寬度: ' + broswerSize.width + 'px');
});
// 調整 Broswer 大小， seleinum 準許的最小長寬是 hieght = 272，width = 400
var broswerHeight = 310, broswerWidth = 410;
driver.manage().window().setSize(broswerWidth, broswerHeight);
// 取當前瀏覽器大小
driver.manage().window().getSize().then(function(broswerSize){
  console.log('調整後瀏覽器高度（' + broswerHeight + '）： ' + broswerSize.height + 'px');
  console.log('調整後瀏覽器寬度（' + broswerWidth + '）： ' + broswerSize.width + 'px');
});
// 最大視窗
driver.manage().window().maximize();
// 取當前瀏覽器大小
driver.manage().window().getSize().then(function(broswerSize){
  console.log('最大化後瀏覽器高度：' + broswerSize.height + 'px');
  console.log('最大化後瀏覽器寬度：' + broswerSize.width + 'px');
});

var searchBar = driver.findElement(webdriver.By.name('q'));
searchBar.getCssValue("width").then(function(searchBarWidth){
  console.log('搜尋列寬度：' + searchBarWidth);  
});
searchBar.sendKeys('Cheese!');
searchBar.submit();

driver.getTitle().then(function(title) {
  console.log('當前標題：' + title);
});

driver.wait(function() {
  return driver.getTitle().then(function(title) {
    return title.toLowerCase().lastIndexOf('cheese!', 0) === 0;
  });
}, 3000);

driver.getTitle().then(function(title) {
  console.log('點下搜尋後的標題：' + title);
  console.log('==================結束測試==================');
});
driver.quit();
