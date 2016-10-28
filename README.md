# AngularTodoExample
Simple Angular Project with LocalStorage to create project, use globals to maintain fake logged user and apply to a project


# Installation
- Have Node on your machine
- Run 'npm install' from the prompt, it will download gulp necessary packages
- After it finishes, run 'gulp', it will start several tasks, download packages with bower and generate a dist folder with all the necessary files to be published
- if you want, you can run 'gulp prod' to generate a 'production' version with uglify and some minimifications on html
- for test, you can run 'gulp test', which will generate the dist package based on development and run tests with selenium and mocha
- allure report can be generated after the 'gulp test' with the command 'allure generate ./allure-results && allure report open'

