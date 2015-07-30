var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().
withCapabilities(webdriver.Capabilities.chrome()).
build();
driver.get('http://www.google.com');

var element = driver.findElement(webdriver.By.name('q'));
element.sendKeys('Cheese!');
element.submit();

driver.getTitle().then(function(title) {
  console.log('Page title is: ' + title);
});

driver.wait(function() {
  return driver.getTitle().then(function(title) {
    return title.toLowerCase().lastIndexOf('cheese!', 0) === 0;
  });
}, 3000);

driver.getTitle().then(function(title) {
  console.log('Page title is: ' + title);
});

// driver.quit();

// var driver = new webdriver.Builder().
// withCapabilities(webdriver.Capabilities.chrome()).
// build();
 
// driver.get('http://www.google.com.tw');
// driver.findElement(webdriver.By.name('q')).sendKeys('mlwmlw.org');
// driver.findElement(webdriver.By.name('btnK')).click();
// driver.wait(function() {
//   return driver.isElementPresent(webdriver.By.css("h3")).then(function(presented) {
//     return presented;
//   });
// }, 3000)
// driver.findElement(webdriver.By.css("h3")).getText().then(function(text) {
//   if(/阿喵就像家/.test(text)) {
//     console.log('Success');
//   }
//   else {
//     console.log('Failed');
//   }
// });
// driver.quit();