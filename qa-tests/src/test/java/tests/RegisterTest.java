package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import java.time.Duration;

public class RegisterTest {
    WebDriver driver;

    @BeforeTest
    public void openLandingPage(){
        driver = new ChromeDriver();
        driver.manage().window().maximize();
    }

    @Test
    @Parameters({"firstName", "lastName", "email", "password", "confirmPassword"})
    public void testRegisterPage1(String firstName, String lastName, String email, String password, String confirmPassword){

        driver.get("https://i-computers-six.vercel.app/");

        WebElement register = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/header/div[2]/a[2]"));
        register.click();

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div/input[1]")).sendKeys(firstName);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div/input[2]")).sendKeys(lastName);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[1]")).sendKeys(email);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[2]")).sendKeys(password);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[3]")).sendKeys(confirmPassword);

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/button")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement toast = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'Registered successfully!')]")
                )
        );

        String alert = toast.getText();
        System.out.println(alert);
    }

    @Test
    @Parameters({"firstName", "lastName", "email", "password", "wrongConfirmPassword"})
    public void testRegisterPage2(String firstName, String lastName, String email, String password, String wrongConfirmPassword){

        WebElement register = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/p[2]/a"));
        register.click();

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div/input[1]")).sendKeys(firstName);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div/input[2]")).sendKeys(lastName);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[1]")).sendKeys(email);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[2]")).sendKeys(password);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[3]")).sendKeys(wrongConfirmPassword);

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/button")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement message = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'Passwords do not match!')]")
                )
        );

        Assert.assertEquals(message.getText(), "Passwords do not match!");
        System.out.println("Passwords do not match!");
    }
}
