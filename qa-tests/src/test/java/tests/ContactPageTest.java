package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;

public class ContactPageTest {
    WebDriver driver;

    @BeforeMethod
    public void openLoginPage() throws InterruptedException {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(10));
        driver.get("https://i-computers-six.vercel.app/login");

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[1]")).sendKeys("wpremalatha1@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[2]")).sendKeys("sachini@1997");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/button[1]")).click();



    }

    @Test
    public void testContactPage() throws InterruptedException {

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        WebElement contactButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"root\"]/div/div[2]/header/div[1]/a[3]")));

        contactButton.click();

        Thread.sleep(3000);
        for(int i=1; i<=4; i++){
            for(int j=1; j<=3; j++){
                System.out.print(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div[1]/div["+i+"]/div[2]/p["+j+"]")).getText()+"  ");
            }
            System.out.println();

        }

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div[2]/div[1]/form/div[1]/div[1]/input")).sendKeys("sachini Ariyasinghe");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div[2]/div[1]/form/div[1]/div[2]/input")).sendKeys("wpremalatha1@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div[2]/div[1]/form/div[2]/input[1]")).sendKeys("0776545667");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div[2]/div[1]/form/div[2]/input[2]")).sendKeys("test");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div[2]/div[1]/form/textarea")).sendKeys("test");

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div[2]/div[1]/form/button")).click();



        WebElement successMessage = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'Message sent!')]")
                )
        );

        Assert.assertTrue(successMessage.isDisplayed());

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div[3]/div[2]/div[1]/div/div/span")).click();

        Assert.assertEquals(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div[3]/div[2]/div[1]/p")).getText(), "Delivery usually takes 1-3 working days within Colombo and 2-5 working days for other areas.");

        Assert.assertTrue(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[3]/div/a")).isDisplayed());

        WebElement googleMap = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//iframe[@title='iComputers Location']")));

        Assert.assertTrue(googleMap.isDisplayed());
    }
}
