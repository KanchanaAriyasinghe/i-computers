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

public class BuyNow_Cart_Checkout_OrderNowTest {
    WebDriver driver;
    WebElement orderNowButton;

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
    public void testOrderNowAndCart() throws InterruptedException {
        Thread.sleep(2000);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/header/div[1]/a[2]")).click();
        Thread.sleep(2000);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/a[2]")).click();
        Thread.sleep(2000);
        driver.findElement(By.xpath("//a[normalize-space()='Buy Now']")).click();
        Thread.sleep(4000);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[1]/div[2]/div/button[2]")).click();
        WebElement count = driver.findElement(By.xpath("//div[@class='w-[100px] h-[30px] border rounded-full flex items-center justify-between px-2']/span"));
        Assert.assertEquals(count.getText(), "2");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[1]/div[2]/div/button[1]")).click();
        Assert.assertEquals(count.getText(), "1");

        String expectedValue  = driver.findElement(By.xpath("//p[@class='text-xl  mt-2']")).getText();
        String actualValue = driver.findElement(By.xpath("//p[@class='text-xl font-bold ml-4']")).getText();
        Assert.assertTrue(actualValue.contains(expectedValue));
        orderNowButton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/button"));
        orderNowButton.click();

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div/div/input[1]")).sendKeys("podi");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div/div/input[2]")).sendKeys("ari");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div/div/input[3]")).sendKeys("No 31/5");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div/div/input[4]")).sendKeys("Rattota");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div/div/input[5]")).sendKeys("matale");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div/div/input[6]")).sendKeys("test");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div/div/input[7]")).sendKeys("24000");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div/div/input[8]")).sendKeys("0786545334");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[2]/div/div/div/button[2]")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement message = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'Order created successfully!')]")
                )
        );

        Assert.assertEquals(message.getText(), "Order created successfully!");




    }

    @Test
    public void testCart() throws InterruptedException {
        Thread.sleep(3000);
        driver.findElement(By.xpath("//a[@href='/cart']")).click();

        driver.findElement(By.xpath("//a[@href='/checkout']")).click();

        Assert.assertTrue(driver.findElement(By.xpath("//button[@class='bg-accent text-white px-4 py-2 rounded-lg font-semibold cursor-pointer']")).isDisplayed());
    }
}
