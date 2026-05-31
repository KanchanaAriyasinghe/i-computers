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

public class ReviewPageTest {
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

        driver.findElement(By.xpath("//a[@href='/admin/reviews']")).click();

    }

    @Test
    public void testReviewPage() throws InterruptedException {
        Thread.sleep(3000);

        System.out.println(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[1]/div[2]/p[1]")).getText()+ ": "+ driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[1]/div[2]/p[2]")).getText());
        System.out.println(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/p[1]")).getText()+ ": "+ driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[2]/div[2]/p[2]")).getText());
        System.out.println(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[3]/div[2]/p[1]")).getText()+ ": "+ driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[3]/div[2]/p[2]")).getText());
        System.out.println(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[4]/div[2]/p[1]")).getText()+ ": "+ driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[4]/div[2]/p[2]")).getText());

        System.out.println("==========================================");

        List<WebElement> headers =  driver.findElements(By.xpath("//table//thead//tr//th"));
        for(WebElement element : headers){
            System.out.print(element.getText()+"       ");
        }
        System.out.println();

        List<WebElement> rowData =  driver.findElements(By.xpath("//table//tbody//tr[1]//td"));
        for(WebElement element : rowData){
            System.out.print(element.getText()+"       ");
        }
        System.out.println();


        String beforePID = driver.findElement(By.xpath("//table//tbody//tr[1]/td[3]")).getText();
        driver.findElement(By.xpath("//table//tbody//tr[1]")).click();
        String afterPID  = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[1]/div/div[2]/div[4]/span[2]")).getText();

        Assert.assertEquals(afterPID,beforePID);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[1]/div/div[1]/button")).click();

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/input")).sendKeys("sach");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/button")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement firstName = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//table//tbody//tr[1]//td[2]")
                )
        );

        String name = firstName.getText();
        Assert.assertTrue(name.toLowerCase().contains("sachini"));



    }


    @Test
    public void testAllStatusDropdown() throws InterruptedException {

        Thread.sleep(3000);
        Select select = new Select(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/select[2]")));
        select.selectByValue("published");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(
                By.xpath("//table//tbody//tr"), 0));

        List<WebElement> rows = driver.findElements(By.xpath("//table//tbody//tr"));

        System.out.println("Rows: " + rows.size());
        for (WebElement element: rows){
            String status = element.findElement(By.xpath("./td[6]")).getText();
            System.out.println(status);
        }
        System.out.println("All status dropdown work.");
    }

    @Test
    public void testAllRatesDropdown() throws InterruptedException {
        Thread.sleep(3000);
        Select select = new Select(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/select[1]")));
        select.selectByValue("2");

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(
                By.xpath("//table//tbody//tr"), 0));

        List<WebElement> rows = driver.findElements(By.xpath("//table//tbody//tr"));

        System.out.println("Rows: " + rows.size());
    }

    @Test
    public void testActions() throws InterruptedException {
        Thread.sleep(3000);
        driver.findElement(By.xpath("//table//tbody//tr[1]//td[7]//div//button[@title='Hide Review']")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement message = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'Review hidden')]")
                )
        );

        Assert.assertEquals(message.getText(), "Review hidden");
        System.out.println("Review hidden");

        WebElement button = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//table//tbody//tr[1]//td[7]//div//button[@title='Publish Review']")));

        Assert.assertTrue(button.getText().contains("Publish"));






        driver.findElement(By.xpath("//table//tbody//tr[1]//td[7]//div//button[@title='Publish Review']")).click();


        WebElement message1 = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'Review published')]")
                )
        );

        Assert.assertEquals(message1.getText(), "Review published");
        System.out.println("Review published");


        WebElement deleteButton = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//table//tbody//tr[2]/td[7]//div//button[@title='Delete Review']")));


        deleteButton.click();
        driver.switchTo().alert().accept();

        WebElement message2 = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'Review deleted')]")
                )
        );

        Assert.assertEquals(message2.getText(), "Review deleted");
        System.out.println("Review deleted");


    }
}
