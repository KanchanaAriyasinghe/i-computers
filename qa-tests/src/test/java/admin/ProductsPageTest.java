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

import java.awt.*;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.time.Duration;
import java.util.List;

public class ProductsPageTest {
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

        driver.findElement(By.xpath("//a[@href='/admin/products']")).click();

    }

    @Test
    public void testProductPage() throws InterruptedException {

        Thread.sleep(3000);

        driver.findElement(By.xpath("//a[@href='/admin/products']")).click();

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

    }
    @Test
    public void addProduct() throws InterruptedException, AWTException {
        driver.findElement(By.xpath("//a[@href='/admin/add-product']")).click();
        Thread.sleep(5000);

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[1]/input")).sendKeys("PRD110");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[2]/input")).sendKeys("test");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[3]/input")).sendKeys("test");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[4]/input")).sendKeys("10000");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[5]/input")).sendKeys("12000");
        Select select1 = new Select(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[6]/select")));
        select1.selectByValue("Camera");

        String files =
                "E:\\SKYREK\\qa-tests\\addproductTest1.jpg\n" + "E:\\SKYREK\\qa-tests\\addproductTest2.jpg";


        driver.findElement(By.xpath("//input[@type='file']")).sendKeys(files);

        Robot robot = new Robot();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        //Thread.sleep(3000);
        robot.keyPress(KeyEvent.VK_ENTER);
        robot.keyRelease(KeyEvent.VK_ENTER);

        driver.findElement(By.xpath("//textarea")).sendKeys("test");

        Select select2 = new Select(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[9]/select")));
        select2.selectByValue("Dell");

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[10]/input")).sendKeys("test");
        WebElement stock = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[11]/input"));
        stock.clear();
        stock.sendKeys("10");

        Select select3 = new Select(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[12]/select")));
        select3.selectByValue("true");

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[1]/div/button[1]")).click();

        WebElement message = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'Product added successfully!')]")
                )
        );

        Assert.assertEquals(message.getText(), "Product added successfully!");
        System.out.println("Product added successfully!");







    }

    @Test
    public void addProductWithExsistingPID() throws InterruptedException, AWTException {
        driver.findElement(By.xpath("//a[@href='/admin/add-product']")).click();
        Thread.sleep(5000);

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[1]/input")).sendKeys("PRD110");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[2]/input")).sendKeys("test1");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[3]/input")).sendKeys("test1");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[4]/input")).sendKeys("100000");
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[5]/input")).sendKeys("12000=");
        Select select1 = new Select(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[6]/select")));
        select1.selectByValue("Laptop");

        String files =
                "E:\\SKYREK\\qa-tests\\addproductTest1.jpg\n" + "E:\\SKYREK\\qa-tests\\addproductTest2.jpg";


        driver.findElement(By.xpath("//input[@type='file']")).sendKeys(files);

        Robot robot = new Robot();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
        //Thread.sleep(3000);
        robot.keyPress(KeyEvent.VK_ENTER);
        robot.keyRelease(KeyEvent.VK_ENTER);

        driver.findElement(By.xpath("//textarea")).sendKeys("test");

        Select select2 = new Select(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[9]/select")));
        select2.selectByValue("Sony");

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[10]/input")).sendKeys("test");
        WebElement stock = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[11]/input"));
        stock.clear();
        stock.sendKeys("100");

        Select select3 = new Select(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[12]/select")));
        select3.selectByValue("true");

        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[1]/div/button[1]")).click();

        WebElement message = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'Product with this productId already exists.')]")
                )
        );

        Assert.assertEquals(message.getText(), "Product with this productId already exists.");
        System.out.println("Product with this productId already exists.");

        Thread.sleep(3000);
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[1]/div/button[2]")).click();

    }

    @Test
    public void editProduct() throws InterruptedException, AWTException {

        Thread.sleep(3000);
        driver.findElement(By.xpath("//table/tbody//tr[9]//td[11]//a[@href='/admin/edit-product']")).click();
        Thread.sleep(5000);

        if(!(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[1]/input")).isEnabled())){

            driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[2]/input")).sendKeys(" edited");
            driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[3]/input")).sendKeys(" 1");
            driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[4]/input")).sendKeys("0");
            driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[5]/input")).sendKeys("0");
            Select select1 = new Select(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[6]/select")));
            select1.selectByValue("Laptop");

            String files =
                    "E:\\SKYREK\\qa-tests\\addproductTest2.jpg";


            driver.findElement(By.xpath("//input[@type='file']")).sendKeys(files);

            Robot robot = new Robot();
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(30));
            //Thread.sleep(3000);
            robot.keyPress(KeyEvent.VK_ENTER);
            robot.keyRelease(KeyEvent.VK_ENTER);

            driver.findElement(By.xpath("//textarea")).sendKeys(" 1");

            Select select2 = new Select(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[9]/select")));
            select2.selectByValue("Sony");

            driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[10]/input")).sendKeys(" 1");
            WebElement stock = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[11]/input"));
            stock.clear();
            stock.sendKeys("100");

            Select select3 = new Select(driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[2]/div[12]/select")));
            select3.selectByValue("true");

            driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[1]/div/button[1]")).click();

            WebElement message = wait.until(
                    ExpectedConditions.visibilityOfElementLocated(
                            By.xpath("//*[contains(text(),'Product updated successfully!')]")
                    )
            );

            Assert.assertEquals(message.getText(), "Product updated successfully!");
            System.out.println("Product updated successfully!");

        }

    }

    @Test
    public void deleteProduct() throws InterruptedException {
        Thread.sleep(3000);
        driver.findElement(By.xpath("//table/tbody/tr[9]/td[11]/*[name()='svg' and contains(@class,'text-red-500')]")).click();
        driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[2]/div[2]/div/div[3]/table/tbody/tr[9]/td[11]/div/div/div/button[1]")).click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        WebElement message = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//*[contains(text(),'Product deleted successfully.')]")
                )
        );

        Assert.assertEquals(message.getText(), "Product deleted successfully.");
        System.out.println("Product deleted successfully.");
    }

}
