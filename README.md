## RPG Inventory Application

This is my second project in Express and my first CRUD application.

## Project Status

This project is currently in deployment in Render for the Express application and Neon for the database.

## Project Screen Shot(s)

![image](https://github.com/user-attachments/assets/5177a123-5a1b-47e5-acf5-c916ed339806)
![image](https://github.com/user-attachments/assets/3f716c6f-61e6-4a00-90e7-5afca6debed8)
![image](https://github.com/user-attachments/assets/e56e22e3-db3e-473b-92c8-d4274d0e065a)
![image](https://github.com/user-attachments/assets/b7963e3c-8ae4-4068-9eca-f960451f802f)
![image](https://github.com/user-attachments/assets/4c8de36f-3387-4b00-b6cb-75be3e7b208c)
![image](https://github.com/user-attachments/assets/05d7a078-4a11-4e9a-b6d4-3cb5e799d564)

## Installation and Setup Instructions

#### Example:  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`   

To Start Server:

`npm --watch app.js`  

To build and watch for style changes:

`npm run build:css`
`npm run watch:css`

To Visit App:

`localhost:5000`  

## Reflection

This was a project from The Odin Project, Nodejs curriculum for me to apply what I have learned in Express MVC architecture, Database implementation, Form validation, and Deployment. It helped me piece all the pieces together by developing a CRUD app.

The interface is a bit inspired by the SkyUI in Skyrim, even though I never played it. For the main entities, I just settled with `items` and `categories` and not complicate. Not allowing deletion of the main three categories: Weapons, Armors, and Potions, I believe, will keep the theme from being RPG-based. 

The tools I used in this project is `Nodejs` as my JavaScript runtime environment, `Express` for making it easier to build backednd applications, `EJS` for the view templates, `Tailwind CLI v4` for styling and `PostgreSQL` for the database.
