import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('UI Testing using Selenium', function() {
  this.timeout(30000); // Set timeout for Mocha tests

  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    await driver.quit();
  });

  it('should load the login page', async function() {
    await driver.get('file:///C:/Users/USER/Documents/SEMESTER%205/PRAKTIKUM%20SEMESTER%205/PPMPL/Prak4/src/login.html');
    const title = await driver.getTitle();
    expect(title).to.equal('Login Page');
  });

  it('should input username and password', async function() {
    await driver.wait(until.elementLocated(By.id('username')), 10000);
    await driver.findElement(By.id('username')).sendKeys('testuser');

    await driver.wait(until.elementLocated(By.id('password')), 10000);
    await driver.findElement(By.id('password')).sendKeys('password123');

    const usernameValue = await driver.findElement(By.id('username')).getAttribute('value');
    const passwordValue = await driver.findElement(By.id('password')).getAttribute('value');

    expect(usernameValue).to.equal('testuser');
    expect(passwordValue).to.equal('password123');
  });

  it('should click the login button', async function() {
    await driver.wait(until.elementLocated(By.id('loginButton')), 10000);
    await driver.findElement(By.id('loginButton')).click();
  });

  // Test case untuk login gagal
  it('should show error message on failed login', async function() {
    await driver.get('file:///C:/Users/USER/Documents/SEMESTER%205/PRAKTIKUM%20SEMESTER%205/PPMPL/Prak4/src/login.html');
    
    // Menggunakan username dan password yang salah
    await driver.findElement(By.css('#username')).sendKeys('wronguser');
    await driver.findElement(By.css('#password')).sendKeys('wrongpass');
    await driver.findElement(By.id('loginButton')).click();

    // Tunggu dan periksa pesan error
    const errorMessage = await driver.wait(until.elementLocated(By.id('errorMessage')), 10000);
    const errorMessageText = await errorMessage.getText();
    expect(errorMessageText).to.equal('Invalid username or password'); // Sesuaikan dengan pesan error yang sebenarnya
  });

  // Test case dengan CSS Selector dan XPath
  it('should input username and password using CSS selector and XPath', async function() {
    await driver.get('file:///C:/Users/USER/Documents/SEMESTER%205/PRAKTIKUM%20SEMESTER%205/PPMPL/Prak4/src/login.html');

    // Menggunakan CSS selector
    await driver.findElement(By.css('#username')).sendKeys('testuser');
    
    // Menggunakan XPath
    await driver.findElement(By.xpath('//*[@id="password"]')).sendKeys('password123');
  });

  // Validasi visual elemen
  it('should validate if login button and input fields are displayed', async function() {
    await driver.get('file:///C:/Users/USER/Documents/SEMESTER%205/PRAKTIKUM%20SEMESTER%205/PPMPL/Prak4/src/login.html');

    const isUsernameDisplayed = await driver.findElement(By.id('username')).isDisplayed();
    const isPasswordDisplayed = await driver.findElement(By.id('password')).isDisplayed();
    const isLoginButtonDisplayed = await driver.findElement(By.id('loginButton')).isDisplayed();

    expect(isUsernameDisplayed).to.be.true;
    expect(isPasswordDisplayed).to.be.true;
    expect(isLoginButtonDisplayed).to.be.true;
  });
});
