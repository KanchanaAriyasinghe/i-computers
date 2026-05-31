package admin;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
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
import java.util.List;

public class OrderPageTest {
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
    public void testAdminOrderPage() throws InterruptedException {

        Thread.sleep(3000);

        // Scroll the overflow container into view first
        WebElement scrollContainer = driver.findElement(
                By.xpath("//div[contains(@class,'overflow-y-auto')]")
        );
        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollTo(0, 0);", scrollContainer
        );

// Now wait for headers to be visible (not just present)
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//table//thead//tr//th[1]")
        ));

        List<WebElement> headers =  driver.findElements(By.xpath("//table//thead//tr//th"));
        System.out.println("Headers count = " + headers.size());
        for(WebElement header : headers){
            System.out.print(header.getText()+"     ");
        }
        System.out.println();

        List<WebElement> rowData = driver.findElements(By.xpath("//div[@class='w-[calc(100%-300px)] h-screen bg-primary border-[6px] border-accent rounded-2xl']//table//tr[2]/td"));

        for(WebElement d : rowData){
            System.out.print(d.getText() + "   ");
        }
        Thread.sleep(3000);
        driver.findElement(By.xpath("//table//tr[4]/td[9]")).click();

        Select select = new Select(driver.findElement(By.xpath("//select[@class='px-3 py-1 bg-gray-200 text-gray-700 rounded']")));
        select.selectByValue("processing");

        driver.findElement(By.xpath("//textarea")).sendKeys("Your order is packing");

        driver.findElement(By.xpath("//button[@class='ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700']")).click();

        WebDriverWait wait1 = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement message = wait1.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'Order updated successfully')]")
                )
        );

        Assert.assertEquals(message.getText(), "Order updated successfully");
    }
    @Test
    public void testOrderPagePagination() throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement pageInfo = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[3]/span")
                )
        );
        System.out.println(pageInfo);
        WebElement next = driver.findElement(By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[3]/button[2]"));
        if(pageInfo.getText().contains("2")){
            next.click();

            wait.until(
                    ExpectedConditions.visibilityOfElementLocated(
                            By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[3]/button[1]")
                    )
            ).click();
        }
        WebElement dropdown = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[3]/select")
                )
        );
        Select select = new Select(dropdown);
        select.selectByValue("20");
        System.out.println(wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[@id='root']/div/div[2]/div[2]/div/div[3]/span")
                )
        ).getText());
    }
}
