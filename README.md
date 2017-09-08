# 2do-cli
Commnad line todo app.

## Installation
`npm i -g 2do-cli`

## Usage
#### Initializing 
Open up any repository that you want to use 2do-cli indside.   
Then write:  
`2do`  
2do will start, after that write :  
`init`  
And 2do-cli will generate a 2do.json file in you repo.  

#### Adding a file
To work with 2do-cli you have add a file and then todos related to that.   
Lets say you have a file named `main.js` and you want to add some todos for this file , to do so (after inializing 2do-cli in you repo) you have to type:   
`add main.js 'Here is my first todo for main.js' `  
After a while you might know that you want to add another todo for same file , so just use same command like:  
`add main.js 'Here is my second todo for main.js '`  

#### Show todo
Now if you want to see all todos of `main.js` you simply write:    
`show main.js`  
and all todos of that file will appear.  

#### Listing 
You can see all of files whitch have todos in current directory  and select any one that you want by typing :  
`list`

#### Removing
You can remove a file , which removes all of it's todos also , or you can only remove a todo of a file , to do first one you just write:  
`delete main.js`  
And if you want to remove only second todo of this file you go like:  
`delete main.js 2`  
Above command will remove second todo of main.js .  
