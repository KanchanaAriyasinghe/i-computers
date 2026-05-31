package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class GoogleLoginTest {
    WebDriver driver;

    @BeforeTest
    public void openLoginPage() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("https://i-computers-six.vercel.app/login");
    }

    @Test
    public void testGoogleLoginAsCustomer() throws InterruptedException {
        WebElement button = driver.findElement(By.xpath("//button[normalize-space()='Sign in with Google']"));

        System.out.println(button.getText());
        button.click();

        Thread.sleep(20000);

        String token = (String)((JavascriptExecutor)driver)
                .executeScript("return localStorage.getItem('token');");

        Assert.assertNotNull(token);

        Assert.assertTrue(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div/a")).isDisplayed());

        System.out.println("Customer Google login successful");
    }
}