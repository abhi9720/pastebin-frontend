

# Paste Frontend Application Documentation
=====================================

## Overview
--------

Paste Frontend is a web application built using React, allowing users to create, edit, and share text and file pastes. This documentation provides an overview of the application's features, functionality, and technical details.

## Features
--------

### Paste Creation

* Users can create new text pastes by typing in the editor
* Users can upload files to create file pastes
* Pastes can be given a title and content

### Paste Management

* Users can view a list of all their pastes
* Users can edit and update existing pastes
* Users can delete pastes

### Sharing

* Users can share pastes via a unique URL
* Users can copy the paste content to their clipboard

### Authentication

* Users can log in using Google authentication
* Users can log out of the application

## Technical Details
-------------------

### Frontend

* Built using React and React Router
* Uses Tailwind CSS for styling
* Utilizes React Hot Toast for notifications

### Backend

* Communicates with the Paste Backend API (not included in this repository)
* Uses Axios for API requests

### Dependencies

* react: ^19.1.0
* react-dom: ^19.1.0
* react-router-dom: ^7.6.0
* axios: ^1.9.0
* tailwindcss: ^3.4.17
* react-hot-toast: ^2.5.2

## Setup and Installation
-------------------------

1. Clone the repository: `git clone https://github.com/[username]/paste-frontend.git`
2. Install dependencies: `npm install` or `yarn install`
3. Start the application: `npm start` or `yarn start`

## API Documentation
-------------------

The Paste Frontend application communicates with the Paste Backend API. API documentation can be found in the [Paste Backend repository](https://github.com/abhi9720/paste-backend).

## Contributing
------------

Contributions are welcome! Please submit a pull request with your changes and a brief description of what you've added or fixed.