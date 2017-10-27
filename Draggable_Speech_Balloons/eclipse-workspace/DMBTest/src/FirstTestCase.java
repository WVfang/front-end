import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class FirstTestCase {

	public static void main(String[] args) {
		
		// Chrome
		String exePath = "C:\\drivers\\chromedriver.exe";
		System.setProperty("webdriver.chrome.driver", exePath);
		
		// Create a new instance of the FireFox driver
		WebDriver driver = new ChromeDriver();
		
		// Load the test page 
		String url = "http://localhost/front-end/draggable_speech_balloons/";
		driver.get(url);
		
		// Test1: click the button and check for new message appearence.
		// Reload page, check for saving data
		WebElement button = driver.findElement(By.id("btn-add-div"));
		List<WebElement> messages = driver.findElements(By.className("draggable-phrase"));
		
		// Get the highest id before clicking (added element will have highestId+1)
		int last = messages.size() - 1;
		String lastId = messages.get(last).getAttribute("id");
		System.out.println("The last element id before click is: " + lastId);
		
		// Click on button
		button.click();
		
		// Count id of new element 
		int nextIdNumber = Integer.parseInt(lastId) + 1;
		String nextId = Integer.toString(nextIdNumber);
		
		// Wait up to 10 seconds for element creation
		WebDriverWait wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(nextId)));
		
		// Find all messages again (expecting including new element)
		messages = driver.findElements(By.className("draggable-phrase"));
		last = messages.size() - 1;
		
		// Check whether new element exists
		boolean exists = driver.findElements(By.id(nextId)).size() != 0;
		
		if(exists) {
			String IdOfAddedElement = messages.get(last).getAttribute("id");
			System.out.println("Element with id '" + IdOfAddedElement + "' added");
		} else {
			System.out.println("Error");
			String IdOfAddedElement = messages.get(last).getAttribute("id");
			System.out.println("The last element id '" + IdOfAddedElement + "' but required: " + nextId);
		}
		
		
		// Test2: drag&drop element, check for changing its position.
		// Reload page, check for saving data
		
		// Test3: double click on message, send some text and click anywhere(or click Enter) to blur.
		// Reload page, check for saving data
		
		
		// Closing browser
		//driver.close();
	}

}
