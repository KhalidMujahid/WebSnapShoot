# Web Snap Shoot

This project is a simple web app tool that lets you take screenshots of your webcam. It uses Node.js, Express, and HTML5 to create a user interface that allows you to start a countdown, capture a screenshot, and then display the captured image

## Features

*   **Countdown:** The app provides a visual countdown before capturing the screenshot.
*   **Webcam capture:** Uses the HTML5 `getUserMedia()` API to access your webcam.
*   **Image saving:** Saves the captured image to the `public/uploads` directory.

## How it Works

*   **Node.js:** The server-side runtime environment.
*   **Express:** A web framework for Node.js.
*   **HTML5:** The web standard used to create the user interface.
*   **JavaScript:** The programming language used to handle user interactions and image processing.

The app listens for a POST request on the `/endpoints` route. When a request is received, it extracts the base64 encoded image data from the request body, decodes it, and saves it to a file with a unique filename. The app then responds with a boolean value indicating whether the image was saved successfully.

## Customize

You can customize the app by modifying the following:

*   **Countdown duration:** Change the `countdown` variable in `public/script.js` to adjust the duration of the countdown.
*   **Image filename:** The filename of the saved image is generated based on the current timestamp. You can modify the `filename` variable in `index.ts` to use a different naming convention.
*   **Image directory:** The saved images are stored in the `public/uploads` directory. You can change this directory by modifying the `filePath` variable in `index.ts`.


## Getting Started
1. **Clone the repository:**
   ```bash
   git clone https://github.com/KhalidMujahid/WebSnapShoot.git
   
2. **Navigate to the Project Directory:**
   ```bash
   cd WebSnapShoot
   
3. **Install Dependencies:**
   ```bash
   bun install
4. **Start the Server:**
   ```bash
   bun start
5. **Open the Webpage:**
   The web app will be available at http://localhost:3000 in your web browser.

**Usage:**
1. Access http://localhost:3000 in your web browser.
2. The countdown will begin, and when it reaches zero, a screenshot will be taken and displayed in the console. After that, check the 'uploads' folder in the directory to preview the image
3. The capture will continue until you stop the server.
   
## License

This project is FREE to use.