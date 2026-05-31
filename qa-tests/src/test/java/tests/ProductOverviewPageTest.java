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

public class ProductOverviewPageTest {
    WebDriver driver;

    @BeforeMethod
    public void openProductOverviewPage(){
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(10));
        driver.get("https://i-computers-six.vercel.app/products");
    }

    @Test
    public void testProductOverviewPage() throws InterruptedException {
        Thread.sleep(4000);
        WebElement productCard = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/a[2]"));
        String beforeClickProductName = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/a[2]/h1")).getText();

        productCard.click();
//        String afterClickProductName = driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div/div[1]/div/div[1]/div[2]/h1")).getText();
//
//        if (afterClickProductName.contains(beforeClickProductName)){
//            System.out.println("Product card clicked success");
//        }


        System.out.println("=============== Product details ================");
        System.out.println("Product Name: "+beforeClickProductName);
        Thread.sleep(20000);
        System.out.println("Other names: "+ driver.findElement(By.xpath("//div[@class='w-full lg:w-1/2 flex flex-col p-5']/h1/span[1]")).getText());
        System.out.println("Price: "+ driver.findElement(By.xpath("//div[@class='w-full mt-5 flex flex-col']/p[1]")).getText());
        System.out.println(driver.findElement(By.xpath("//div[@class='w-full mt-5 flex flex-col']/span[1]")).getText());
        System.out.println(driver.findElement(By.xpath("//div[@class='w-full mt-5 flex flex-col']/p[2]")).getText());

        WebElement subImage = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div/div[1]/div[1]/div/div/img[2]"));
        subImage.click();
        WebElement image = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div/div[1]/div/div[1]/div[1]/div/img"));
        Assert.assertEquals(subImage.getAttribute("src"),image.getAttribute("src"));


        driver.findElement(By.xpath("//button[normalize-space()='Add to Cart']")).click();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement message = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(), 'Samsung 24 LED Monitor added to cart')]")
                )
        );

        Assert.assertEquals(message.getText(), "Samsung 24 LED Monitor added to cart");

        driver.findElement(By.xpath("//a[normalize-space()='Buy Now']")).click();
        Assert.assertTrue(driver.findElement(By.xpath("//button[normalize-space()='Order now']")).isDisplayed());

    }
}
