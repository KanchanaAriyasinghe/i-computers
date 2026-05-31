package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

public class LogoutAndHomePageTest {
    WebDriver driver;

    @BeforeMethod
    public void openLoginPage(){
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(10));
        driver.get("https://i-computers-six.vercel.app/login");

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[1]")).sendKeys("wpremalatha1@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[2]")).sendKeys("sachini@1997");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/button[1]")).click();

    }

    @Test
    public void logoutHomePageTest() throws InterruptedException {
        Thread.sleep(3000);
        driver.findElement(By.xpath("//div[@class='h-full hidden lg:flex justify-center items-center gap-10']/a[@href='/']")).click();

        Assert.assertTrue(driver.findElement(By.xpath("//h1")).isDisplayed());

        WebElement dropdown = driver.findElement(By.xpath("//select[@class='text-transparent lg:static absolute lg:text-white text-center w-full h-full']"));
        Select select = new Select(dropdown);
        select.selectByValue("option4");

        System.out.println("Current URL: "+driver.getCurrentUrl());
    }
}
