package tests;

import org.testng.annotations.DataProvider;

public class LoginDetails {
    @DataProvider
    public Object[][] getData(){
        Object[][] data = {
                {"abc123@gmail.com", "1234"},
                {"abc123@gmail.com", "123"}
        };
        return data;
    }
}
