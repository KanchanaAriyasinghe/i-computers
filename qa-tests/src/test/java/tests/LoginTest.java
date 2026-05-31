package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import java.time.Duration;

public class LoginTest {
    WebDriver driver;
    WebElement emailInput;
    WebElement passwordInput;
    WebElement signinButton;

    @BeforeTest
    public void openLoginPage(){
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://i-computers-six.vercel.app/login");

        emailInput = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[1]"));
        passwordInput = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[2]"));
        signinButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/button[1]"));
    }


    @Test
    @Parameters({"email", "wrongPassword"})
    public void testLoginPage1(String email, String wrongPassword) {

        emailInput.sendKeys(email);
        passwordInput.sendKeys(wrongPassword);

        signinButton.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement toast = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'login failed')]")
                )
        );

        String alert = toast.getText();
        System.out.println(alert);
    }

    @Test(dataProvider = "getData", dataProviderClass = LoginDetails.class)
    public void testLoginPage2(String email, String password) {

        emailInput.clear();
        emailInput.sendKeys(email);
        passwordInput.clear();
        passwordInput.sendKeys(password);

        signinButton.click();


        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement toast = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'User not found')]")
                )
        );

        String alert = toast.getText();
        System.out.println(alert);
    }

    @Test
    @Parameters({"email", "password"})
    public void testLoginPage3(String email, String password){

        emailInput.clear();
        emailInput.sendKeys(email);
        passwordInput.clear();
        passwordInput.sendKeys(password);

        signinButton.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement toast = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'Login successfully.')]")
                )
        );

        String alert = toast.getText();
        System.out.println(alert);

        String token = (String)((JavascriptExecutor)driver)
                .executeScript("return localStorage.getItem('token');");

        Assert.assertNotNull(token);

        Assert.assertTrue(
                driver.findElement(By.xpath("//*[contains(text(),'Products')]")).isDisplayed());

        driver.quit();
    }

}
