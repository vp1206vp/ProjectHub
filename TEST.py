from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Initialize the WebDriver (assuming Chrome)
driver = webdriver.Chrome()

try:
    # Open the React Budget Dashboard
    driver.get("http://localhost:5180/budget")  # Replace with your React app's budget page URL
    time.sleep(2)  # Wait for the page to load

    # Verify the Budget Dashboard Page
    try:
        WebDriverWait(driver, 10).until(
            EC.text_to_be_present_in_element((By.NAME, "h1"), "Budget Dashboard")
        )
        print("✅ Budget Dashboard Page Loaded Successfully")
    except:
        print("❌ Budget Dashboard Page not loaded or title mismatch!")

    # Test: Add a New Transaction
    try:
        # Click the "Add Transaction" button
        add_transaction_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Transaction')]")
        add_transaction_button.click()
        time.sleep(1)

        # Wait for the modal to be visible
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//div[contains(@class, 'fixed inset-0 bg-black bg-opacity-50')]"))
        )

        # Wait for the description input field to be visible
        description_input = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//input[@placeholder='Description']"))
        )

        # Fill in the transaction form
        description_input.send_keys("Office Supplies")
        category_input = driver.find_element(By.XPATH, "//input[@placeholder='Category']")
        date_input = driver.find_element(By.XPATH, "//input[@type='date']")
        amount_input = driver.find_element(By.XPATH, "//input[@placeholder='Amount']")

        category_input.send_keys("Miscellaneous")
        date_input.send_keys("2024-04-01")
        amount_input.send_keys("1500")

        # Submit the form
        submit_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Transaction')]")
        submit_button.click()
        time.sleep(2)

        # Verify the transaction is added
        transactions_table = driver.find_element(By.TAG_NAME, "tbody")
        assert "Office Supplies" in transactions_table.text
        print("✅ Transaction Added Successfully")
    except Exception as e:
        print(f"❌ Transaction Addition Failed: {e}")

    # Test: Edit Monthly Budget
    try:
        # Ensure the "Add Transaction" modal is closed
        WebDriverWait(driver, 10).until(
            EC.invisibility_of_element_located((By.XPATH, "//div[contains(@class, 'fixed inset-0 bg-black bg-opacity-50')]"))
        )

        # Click the "Edit Budget" button
        edit_budget_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Edit Budget')]")
        edit_budget_button.click()
        time.sleep(1)

        # Wait for the "Edit Budget" modal to appear
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//div[contains(@class, 'fixed inset-0 bg-black bg-opacity-50')]"))
        )

        # Update the budget for a specific month (e.g., January)
        jan_budget_input = driver.find_element(By.XPATH, "//span[text()='Jan']/following-sibling::input")
        jan_budget_input.clear()
        jan_budget_input.send_keys("60000")

        # Close the modal
        close_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Close')]")
        close_button.click()
        time.sleep(2)

        # Verify the budget is updated
        total_budget = driver.find_element(By.XPATH, "//p[contains(text(), 'Total Budget')]/following-sibling::p")
        assert "60000" in total_budget.text
        print("✅ Budget Updated Successfully")
    except Exception as e:
        print(f"❌ Budget Update Failed: {e}")

finally:
    # Close the browser
    driver.quit()