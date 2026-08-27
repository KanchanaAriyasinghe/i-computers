package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.awt.*;
import java.awt.event.KeyEvent;
import java.time.Duration;

public class SettingsPageTest {
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
    public void testSettingspage() throws InterruptedException, AWTException {
        Thread.sleep(4000);
        WebElement dropdown = driver.findElement(By.xpath("//select[@class='text-transparent lg:static absolute lg:text-white text-center w-full h-full']"));
        Select select = new Select(dropdown);
        select.selectByValue("option3");

        Thread.sleep(3000);
        String data = "E:\\SKYREK\\qa-tests\\profileTestPicture.jpg";

        WebElement secondNameField = driver.findElement(By.xpath("//input[@value='ariyasinghe']"));
        secondNameField.clear();
        secondNameField.sendKeys("premarathna");
        Thread.sleep(3000);
        driver.findElement(By.xpath("//input[@type='file']")).sendKeys(data);

        Robot robot = new Robot();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        //Thread.sleep(3000);
        robot.keyPress(KeyEvent.VK_ENTER);
        robot.keyRelease(KeyEvent.VK_ENTER);

        driver.findElement(By.xpath("//button[@class='px-4 py-2 bg-accent text-white rounded']")).click();

//        Thread.sleep(10000);
//        WebElement toast = driver.findElement(By.xpath("//*[contains(text(),'Profile updated successfully')]"));
//        Assert.assertEquals(toast.getText(), "Profile updated successfully");
        driver.quit();
    }
}
