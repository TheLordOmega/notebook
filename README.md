A notes website made using React

the beggining of a notebook app
currently typing only works, 
konva and handwriting is going to be added next week

## features
(Week1)

-a primitive save state for the title
-favorites
-a home screen
-preview of the note, can be an image too
- a slash menu like notion
- dark and light mode
- a sidebar
- new note is currently buggy after adding the slash menu but previous version used to work.
**Week (2):**
started implementing Konva, a canvas block that has differnt colors
made the notes fully working and saves between sessions locally
made an export to md option
made many improvements to the ui of the slash menu
made an export to png for konva,


## How to run: 
 the website currently is running at this link:  https://notebook-flame-nine.vercel.app/
 
 if you want to run the code, please download this repository and open it,
 then make sure the terminal is in Notebook sub-folder and run this command:
` npm run dev`
 this will make Vite (the base I've used for React ) start a local version of this webpage
 usually it is at http://localhost:5173 but it copy the one given by vite in the terminal.
 I would recommend trying /todo in one of the notes, then going back home, this will show the slash menu, the save and preview features.
 
## Features in more detail: 

### features implemented:
### In the save folder:
 AddTask.js, save.jsx, TaskList.js, TasksContext.js
 are made to edit and save in a session without refreshing (to be implemented with IndexDb to be saved throughout different sessions locally)

this guide was followed almost 1 to 1, as this part was harder than expected (took 2h to understand)
sources used in that part: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage


this save folder and storage folder (currently empty) will be made into a single file when i implement Indexdb

### In the components folder: 
  handwriting has not been imeplemented yet.
  but the current file has draft for a color picker and a way to hide and show buttons
  these were made following the freecodecamp course as a base.
  sources: https://www.freecodecamp.org/learn/front-end-development-libraries-v9/


  pop up sub-folder was made also using the freecodecamp tutorials for pop-ups due to errors and a pop up, these will be implemented later on for the save feature when it is fully implemented


~~*~~***  In the Sidebar sub-folder: ***~~*~~
  there is 2 drafts: 
  - a footer that will have save file button, setting and darkmode toggle (currently by itself)
  - Navbar that will be implemented as the dock with the different colors and pens for handwriting.

  these were also made along the  freecodecamp walkthrough
  source: https://www.freecodecamp.org/learn/front-end-development-libraries-v9/
  https://w3collective.com/react-sidebar-navigation-component/

***  There is also the Sidebar css and jsx:***
  this is the current sidebar, it was mostly done following this guide with tweaks, to make it feel more modern, the goal is to make it look more modern later (similar to claude or zen browser sidebar.)
  currently the favorites feature doesn't actually work yet and a recents tab hasn't  also been implemented but are planned.

***  in Slash menu sub-folder:***
  implemented a slash menu like notions with the todolist feature currently with plans for more features like more headings and bullet points, image imports and more!
  the search hasn't been finished but should be implemented for the whole app and for the specific note.
  this guide was mostly used as the basis:
  the NoteCard is the way the notes look in the homepage, it should be made in way that its easy to be not hard-coded and can be used with more notes and more options and a preview of the actual note instead of the image,

  this was built using Freecodecamp course too.

### In the pages folder:
-there is the Favorites page that doesn't actually save favorites, should be implemented with indexdb
-Home css, Home jsx used for the homescreen, they use the Notecard logic and apply it to 2 hardcoded examples

this was loosely built using the Freecodecamp course too: https://www.freecodecamp.org/learn/front-end-development-libraries-v9/
-Note is used as the interface for when a note is opened, it should be implemented with the indexdb to show that specfic note when implemented and should have the konva handwirting too next.


***App.css and App.jsx, index.css, main.jsx:***
what ties everything together, has both dark and light  mode imeplemnted and is the where everything is tied.
maybe should be 2 files instead of 4? 


***mode.css, mode.html and mode.jsx were the first implementation of darkmode following this guide:***


there are not actually used now because there are mostly implemented into the other files, i left them there as an example of how the dark mode works , they will be removed from the final version next week.

## Week 2 : 

moved some of the things i thought i would be able to implement this week into tht edrafts such as a footer, the pop up message for errors.


most of the new stuff is in : 
- taskcontext: some of the old save folder
- storage folder: localstorage logic behind it 
some guides followed: 
https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a

- inkblock folder: mostly follwoed through these konva guides: 
https://konvajs.org/docs/react/Free_Drawing.html
https://konvajs.org/docs/sandbox/Canvas_Editor.html
https://konvajs.org/docs/overview.html
https://konvajs.org/docs/drag_and_drop/Drag_and_Drop.html
https://konvajs.org/docs/sandbox/Canvas_to_PDF.html





this project was made using react and vite as basis and is not finished, but is a base for what's to come!
