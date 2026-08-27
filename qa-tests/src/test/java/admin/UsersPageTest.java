package admin;

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
import java.util.List;

public class UsersPageTest {
    WebDriver driver;

    @BeforeMethod
    public void openLoginPage() throws InterruptedException {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(10));
        driver.get("https://i-computers-six.vercel.app/login");

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[1]")).sendKeys("ariyasinghekanchana@gmail.com");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/input[2]")).sendKeys("1234");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/button[1]")).click();

        Thread.sleep(3000);

        driver.findElement(By.xpath("//a[@href='/admin/users']")).click();

    }

    @Test
    public void testAdminUserPage() throws InterruptedException {
        Thread.sleep(3000);
        System.out.println(driver.findElement(By.xpath("//div[@class='mb-8']//h2")).getText());
        List<WebElement> headers =  driver.findElements(By.xpath("//div[@class='mb-8']//table//thead/tr/th"));
        for(WebElement element : headers){
            System.out.print(element.getText()+"       ");
        }
        System.out.println();
        List<WebElement> rowData =  driver.findElements(By.xpath("//div[@class='mb-8']//table//tbody/tr[1]/td"));
        for(WebElement element : rowData){
            System.out.print(element.getText()+"       ");
        }

        System.out.println("---------------------------------------");

        System.out.println(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/h2")).getText());
        List<WebElement> headers1 =  driver.findElements(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/div[1]/table/thead/tr/th"));
        for(WebElement element : headers1){
            System.out.print(element.getText()+"       ");
        }
        System.out.println();
        List<WebElement> rowData1 =  driver.findElements(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/div[1]/table/tbody/tr[3]/td"));
        for(WebElement element : rowData1){
            System.out.print(element.getText()+"       ");
        }

        Thread.sleep(1000);

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/div[1]/table/tbody/tr[5]/td[8]")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement message = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'User blocked successfully')]")
                )
        );

        Assert.assertEquals(message.getText(), "User blocked successfully");
        System.out.println("User blocked successfully");

        Thread.sleep(4000);

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/div[1]/table/tbody/tr[5]/td[8]")).click();


        WebElement message1 = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'User unblocked successfully')]")
                )
        );

        Assert.assertEquals(message1.getText(), "User unblocked successfully");
        System.out.println("User unblocked successfully");

    }

    @Test
    public void testOrderPagePagination() throws InterruptedException {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement dropdown = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/div[2]/select")
                )
        );

        Select select = new Select(dropdown);
        select.selectByValue("5");

        WebElement pageInfo = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/div[2]/span")
                )
        );
        System.out.println(pageInfo);
        WebElement next = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/div[2]/button[2]"));
        if(pageInfo.getText().contains("2")){
            next.click();

            wait.until(
                    ExpectedConditions.visibilityOfElementLocated(
                            By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/div[2]/button[1]")
                    )
            ).click();
        }

    }

}
