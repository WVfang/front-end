package automationFramework;

import java.io.File;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.ie.InternetExplorerDriverService;

public class FirstTestCase {

	public static void main(String[] args) {
		
		/*
		// Mozilla
		System.setProperty("webdriver.gecko.driver", "C:\\drivers\\geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
		driver.get("http://www.toolsqa.com");
 
		driver.quit();
		*/
		
		/*
		// IE
		String service = "C:\\drivers\\IEDriverServer.exe";
		System.setProperty("webdriver.ie.driver", service);
		InternetExplorerDriver  driver = new InternetExplorerDriver();
 
		driver.get("http://www.toolsqa.com");
		*/
		/*
		String exePath = "C:\\drivers\\IEDriverServer.exe";
		InternetExplorerDriverService.Builder serviceBuilder = new InternetExplorerDriverService.Builder();
		serviceBuilder.usingPort(5555); // This specifies that sever should start at this port
		serviceBuilder.usingDriverExecutable(new File(exePath)); //Tell it where you server exe is
		serviceBuilder.withHost("3.6.0.0");
		InternetExplorerDriverService service = serviceBuilder.build(); //Create a driver service and pass it to Internet explorer driver instance
		InternetExplorerDriver driver = new InternetExplorerDriver(service);
		driver.get("http://toolsqa.wpengine.com");
		*/
		
		
		// Chrome
		
		
		String exePath = "C:\\drivers\\chromedriver.exe";
		System.setProperty("webdriver.chrome.driver", exePath);
		
		// Create a new instance of the FireFox driver
		WebDriver driver = new ChromeDriver();
		
		// Launch the WebSite
		String url = "http://localhost/only_front-end/CSS_less/";
		driver.get(url);
		
		// Storing title name
		String title = driver.getTitle();
		
		// Storing title length
		int titleLength = driver.getTitle().length();
		
		// Printing title and titleLength in the console
		System.out.println("Title of the page is: " + title);
		System.out.println("Length of the title is: " + titleLength);
		
		// Storing URL
		String actualUrl = driver.getCurrentUrl();
		
		if(actualUrl.equals(url)) {
			System.out.println("Verification Successful - The correct Url is opened.");
		} else {
			System.out.println("Verification Failed - An incorrect Url is opened.");
			System.out.println("Actual URL is: " + actualUrl);
			System.out.println("Expected URL is: " + url);
		}
		
		// Storing Page Source
		String pageSource = driver.getPageSource();
		
		// Storing Page Source length
		int pageSourceLength = pageSource.length();
		
		// Printing pageSourceLength in the console;
		System.out.println("Total length of the Page Source is: " + pageSourceLength);
		
		// Return to home page
		driver.navigate().back();
		// Again go back to Registration
		driver.navigate().forward();
		// Get admin page
		String url2 = "http://localhost/only_front-end/Gulp/";
		driver.navigate().to(url2);
		// Reload page
		driver.navigate().refresh();
		
		// Closing browser
		driver.close();
		
	}

}
