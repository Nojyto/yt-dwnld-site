# Project

/placeholder/

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Python 3 and pip (Python package installer)
- Node.js and npm (Node package manager)

## Setting Up Development

1. lone this repository to your local machine using `git clone <repository-url>`.
2. Install all required Python packages by running `pip install -r requirements.txt`.
3. Enter the directory where the React app is located: `cd app`.
4. Install all required npm packages by running `npm install`.

## Setting Up Build

1. **Start the React Application**
   - Within the React application directory (`app`), build the frontend for production using:

     ```sh
     npm run build
     ```

2. **Run the Flask Application**
   - Go back to the root directory of your project if you are not already there.
   - Start the Flask application by running:

     ```sh
     py app.py
     ```

   - This script should set up your Flask app to serve both the API and the static React pages.
