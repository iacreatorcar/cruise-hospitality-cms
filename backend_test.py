import requests
import sys
import json
from datetime import datetime

class CruiseHospitalityAPITester:
    def __init__(self, base_url="https://sea-services.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, timeout=30):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=timeout)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=timeout)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return True, response.json()
                except:
                    return True, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'error': str(e)
            })
            return False, {}

    def test_basic_endpoints(self):
        """Test basic API endpoints"""
        print("=" * 60)
        print("TESTING BASIC ENDPOINTS")
        print("=" * 60)
        
        # Test root endpoint
        self.run_test("API Root", "GET", "", 200)
        
        # Test data initialization
        self.run_test("Initialize Data", "POST", "init-data", 200)

    def test_restaurants_api(self):
        """Test restaurants endpoints"""
        print("\n" + "=" * 60)
        print("TESTING RESTAURANTS API")
        print("=" * 60)
        
        # Get all restaurants
        success, restaurants = self.run_test("Get All Restaurants", "GET", "restaurants", 200)
        
        if success and restaurants:
            print(f"   Found {len(restaurants)} restaurants")
            
            # Test getting specific restaurant
            if len(restaurants) > 0:
                restaurant_id = restaurants[0]['id']
                self.run_test(f"Get Restaurant {restaurant_id}", "GET", f"restaurants/{restaurant_id}", 200)
                
                # Test QR code generation
                self.run_test(f"Generate QR Code for {restaurant_id}", "GET", f"qrcode/{restaurant_id}", 200)
        
        # Test creating new restaurant
        new_restaurant = {
            "name": "Test Restaurant",
            "type": "Test Cuisine",
            "description": "Test description",
            "hours": "10:00 - 22:00",
            "image_url": "https://example.com/test.jpg",
            "menu": [
                {
                    "name": "Test Dish",
                    "description": "Test dish description",
                    "price": 15.99,
                    "category": "Test Category",
                    "allergens": ["test"]
                }
            ]
        }
        self.run_test("Create Restaurant", "POST", "restaurants", 200, new_restaurant)

    def test_excursions_api(self):
        """Test excursions endpoints"""
        print("\n" + "=" * 60)
        print("TESTING EXCURSIONS API")
        print("=" * 60)
        
        # Get all excursions
        success, excursions = self.run_test("Get All Excursions", "GET", "excursions", 200)
        
        if success and excursions:
            print(f"   Found {len(excursions)} excursions")
        
        # Test creating new excursion
        new_excursion = {
            "name": "Test Excursion",
            "description": "Test excursion description",
            "duration": "2 hours",
            "price": 49.99,
            "image_url": "https://example.com/test.jpg",
            "available_dates": ["2025-01-20", "2025-01-21"]
        }
        self.run_test("Create Excursion", "POST", "excursions", 200, new_excursion)

    def test_entertainment_api(self):
        """Test entertainment endpoints"""
        print("\n" + "=" * 60)
        print("TESTING ENTERTAINMENT API")
        print("=" * 60)
        
        # Get all entertainment
        success, entertainment = self.run_test("Get All Entertainment", "GET", "entertainment", 200)
        
        if success and entertainment:
            print(f"   Found {len(entertainment)} entertainment events")
        
        # Test creating new entertainment
        new_entertainment = {
            "name": "Test Show",
            "type": "Test Performance",
            "description": "Test show description",
            "venue": "Test Venue",
            "time": "20:00",
            "image_url": "https://example.com/test.jpg"
        }
        self.run_test("Create Entertainment", "POST", "entertainment", 200, new_entertainment)

    def test_packages_api(self):
        """Test internet packages endpoints"""
        print("\n" + "=" * 60)
        print("TESTING INTERNET PACKAGES API")
        print("=" * 60)
        
        # Get all packages
        success, packages = self.run_test("Get All Packages", "GET", "packages", 200)
        
        if success and packages:
            print(f"   Found {len(packages)} internet packages")
        
        # Test creating new package
        new_package = {
            "name": "Test Package",
            "duration": "1 day",
            "price": 9.99,
            "features": ["Test feature 1", "Test feature 2"],
            "speed": "25 Mbps"
        }
        self.run_test("Create Package", "POST", "packages", 200, new_package)

    def test_services_api(self):
        """Test guest services endpoints"""
        print("\n" + "=" * 60)
        print("TESTING GUEST SERVICES API")
        print("=" * 60)
        
        # Get all services
        success, services = self.run_test("Get All Services", "GET", "services", 200)
        
        if success and services:
            print(f"   Found {len(services)} guest services")
        
        # Test creating new service
        new_service = {
            "name": "Test Service",
            "description": "Test service description",
            "hours": "24/7",
            "location": "Test Location",
            "contact": "Test Contact"
        }
        self.run_test("Create Service", "POST", "services", 200, new_service)

    def test_bookings_api(self):
        """Test bookings endpoints"""
        print("\n" + "=" * 60)
        print("TESTING BOOKINGS API")
        print("=" * 60)
        
        # Get all bookings
        success, bookings = self.run_test("Get All Bookings", "GET", "bookings", 200)
        
        if success and bookings:
            print(f"   Found {len(bookings)} bookings")
        
        # Test creating new booking
        new_booking = {
            "excursion_id": "test-excursion",
            "guest_name": "Test Guest",
            "guest_email": "test@example.com",
            "date": "2025-01-20",
            "num_guests": 2
        }
        self.run_test("Create Booking", "POST", "bookings", 200, new_booking)

    def test_chat_api(self):
        """Test chatbot API"""
        print("\n" + "=" * 60)
        print("TESTING CHATBOT API")
        print("=" * 60)
        
        # Test chat functionality
        chat_message = {
            "message": "Ciao, puoi aiutarmi con informazioni sui ristoranti?",
            "session_id": f"test_session_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        }
        
        print("   Testing AI chatbot with GPT-5.2...")
        success, response = self.run_test("Chat with AI", "POST", "chat", 200, chat_message, timeout=60)
        
        if success and response:
            print(f"   AI Response: {response.get('response', 'No response')[:100]}...")

    def run_all_tests(self):
        """Run all API tests"""
        print("🚢 CRUISE HOSPITALITY CMS - API TESTING")
        print(f"Testing against: {self.base_url}")
        print("=" * 80)
        
        self.test_basic_endpoints()
        self.test_restaurants_api()
        self.test_excursions_api()
        self.test_entertainment_api()
        self.test_packages_api()
        self.test_services_api()
        self.test_bookings_api()
        self.test_chat_api()
        
        # Print final results
        print("\n" + "=" * 80)
        print("FINAL RESULTS")
        print("=" * 80)
        print(f"📊 Tests passed: {self.tests_passed}/{self.tests_run}")
        print(f"📊 Success rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ Failed tests ({len(self.failed_tests)}):")
            for test in self.failed_tests:
                error_msg = test.get('error', f"Expected {test.get('expected')}, got {test.get('actual')}")
                print(f"   - {test['name']}: {error_msg}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = CruiseHospitalityAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())