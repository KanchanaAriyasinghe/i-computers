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

import java.time.Duration;

public class CustomerReviewsPageTest {
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
    public void testCustomerReviewsPage() throws InterruptedException {
        Thread.sleep(2000);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/header/div[1]/a[2]")).click();
        Thread.sleep(2000);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/a[2]")).click();

        String firstReviewTitle = "Crisp Display and Excellent Value";
        Thread.sleep(10000);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div/div[2]/div[1]/button")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div/div[2]/div[1]/div/div[2]/div/span[1]")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div/div[2]/div[1]/div/div[2]/div/span[2]")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div/div[2]/div[1]/div/div[3]/input")).sendKeys(firstReviewTitle);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div/div[2]/div[1]/div/div[4]/textarea")).sendKeys("he Samsung 24” LED Monitor delivers a sharp and clear Full HD display with vibrant colors that make it ideal for both work and entertainment");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div/div[2]/div[1]/div/div[5]/button[2]")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement message = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'Review posted successfully!')]")
                )
        );

        Assert.assertEquals(message.getText(), "Review posted successfully!");



        WebElement dropDown1 = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div/div[2]/div[3]/select[1]"));

        Select select = new Select(dropDown1);
        select.selectByValue("2");
        Thread.sleep(3000);
        String reviewTitle = driver.findElement(By.xpath("//h4[contains(@class,'font-semibold')]")).getText();
        Assert.assertEquals(reviewTitle,firstReviewTitle);
        System.out.println("Rate dropdown work.");
        select.selectByContainsVisibleText("All Ratings");

        WebElement dropDown2 = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div/div[2]/div[3]/select[2]"));

        Select select1 = new Select(dropDown2);
        select1.selectByContainsVisibleText("Highest Rated");
        System.out.println("Order dropdown work.");

        driver.quit();

    }
}
