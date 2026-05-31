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

public class ProductPageTest {

    WebDriver driver;

    @BeforeMethod
    public void openProductPage(){
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(10));
        driver.get("https://i-computers-six.vercel.app/products");
    }

    @Test
    public void testProductPage() throws InterruptedException {
        Thread.sleep(3000);
        int beforeAllProducts = driver.findElements(By.xpath("//body/div/div/div/div/div[1]/a")).size();
        WebElement search = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[1]/input"));



        search.sendKeys("Lap");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[1]/button[1]")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement productName = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//a//h1")
                )
        );

        String cardProductName = productName.getText();
        //int lapCount = driver.findElements(By.xpath("//body/div/div/div/div/div[1]/a")).size();
        if (cardProductName.contains("Lap")){
            System.out.println("product search success.");
        }
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div[1]/button[2]")).click();

        Thread.sleep(3000);

        int afterAllProducts = driver.findElements(By.xpath("//body/div/div/div/div/div[1]/a")).size();

        Assert.assertEquals(afterAllProducts,beforeAllProducts);
        System.out.println("All products button work");


    }
}
