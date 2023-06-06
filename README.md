# ThisThatTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.

## Marvel Character Angular App
This is a web application that allows users to search for Marvel characters and get auto-suggestions as they type. It uses the Marvel API to fetch a list of characters and provides a responsive and intuitive user interface.

# Features
* Character Auto-Suggest: As the user types in the search bar, the application provides auto-suggestions for matching character names.
* Fetch Characters: The application fetches characters from the Marvel API in a paginated manner and displays them in the auto-suggest list.
* Responsive Design: The application is designed to be responsive and works well on different screen sizes, from desktop to mobile devices.
* Dark Mode: Users can toggle between light and dark mode to customize the appearance of the application.
* Click to Select: Users can click on a character from the auto-suggest list to select it, which triggers an action (e.g., displaying an alert).
* Debounce Search: The search functionality is debounced to reduce the number of API requests and provide a smoother user experience.

#  Technologies Used
* Angular: The application is built using the Angular framework, which provides a robust and scalable architecture for web applications.
* HttpClient: The HttpClient module from Angular's @angular/common/http package is used for making HTTP requests to the Marvel API.
* Reactive Forms: Angular's Reactive Forms module is utilized to create and manage the search form and its controls.
* RxJS: The RxJS library is used for handling asynchronous operations and performing debounce time on the search input.
* CSS: The application uses CSS for styling, including layout, typography, and colour schemes.

# Getting Started
To run the Marvel Character Auto-Suggest application locally, follow these steps:

* Clone the repository
* Install the dependencies: npm install
* Open the src/environments/environment.ts file.
* Replace the YOUR_API_KEY and YOUR_HASH placeholders with your actual API key and hash.
* Start the development server: npm start
* Open your browser and navigate to http://localhost:4200 to access the application.