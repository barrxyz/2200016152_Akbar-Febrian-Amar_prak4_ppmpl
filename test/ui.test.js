import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('UI Testing using Selenium', function() {
  this.timeout(30000); // Set timeout for Mocha tests

  let driver;

  // Inisialisasi WebDriver sebelum menjalankan test case
  before(async function() {
    driver = await new Builder().forBrowser('chrome').build(); // Bisa diganti 'firefox' untuk Firefox
  });

  // Tutup webdriver setelah semua test selesai
  after(async function() {
    await driver.quit();
  });

  it('should load the login page', async function() {
    await driver.get('file:///C:/Users/USER/Documents/SEMESTER%205/PRAKTIKUM%20SEMESTER%205/PPMPL/Prak4/src/login.html'); // Ubah path sesuai lokasi file login.html
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
    // Lakukan tindakan setelah klik tombol login
  });
});

