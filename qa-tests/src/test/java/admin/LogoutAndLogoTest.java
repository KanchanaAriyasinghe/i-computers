package admin;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

public class LogoutAndLogoTest {
    WebDriver driver;

    @BeforeMethod
    public void openLoginPage(){
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(10));
        driver.get("https://i-computers-six.vercel.app/login");

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[1]")).sendKeys("ariyasinghekanchana@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[2]")).sendKeys("1234");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/button[1]")).click();

    }

    @Test
    public void testLogout() throws InterruptedException {
        Thread.sleep(3000);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[1]/div[3]/button")).click();
        String currentURL = driver.getCurrentUrl();
        Assert.assertEquals(currentURL, "https://i-computers-six.vercel.app/login");
        System.out.println("Logout success");
    }

    @Test
    public void testLogo() throws InterruptedException {
        Thread.sleep(3000);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[1]/div[1]/a/img")).click();
        String currentURL = driver.getCurrentUrl();
        Assert.assertEquals(currentURL, "https://i-computers-six.vercel.app/");
        System.out.println("Logo clickable");
    }
}
