package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.List;

public class MyOrdersPageTest {
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
    public void myOrdersPageTest() throws InterruptedException {
        Thread.sleep(3000);
        WebElement dropdown = driver.findElement(By.xpath("//select[@class='text-transparent lg:static absolute lg:text-white text-center w-full h-full']"));
        Select select = new Select(dropdown);
        select.selectByValue("option2");

        Thread.sleep(3000);

        List<WebElement> headers = driver.findElements(By.xpath("//table//th"));

        for(WebElement h : headers){
            System.out.print(h.getText() + "   ");
        }

        System.out.println();

        List<WebElement> rowData = driver.findElements(By.xpath("//table//tr[2]/td"));

        for(WebElement d : rowData){
            System.out.print(d.getText() + "   ");
        }

        driver.findElement(By.xpath("//table//tr[2]/td[9]")).click();
        driver.findElement(By.xpath("//button[@class='absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-red-700']")).click();
    }
}
