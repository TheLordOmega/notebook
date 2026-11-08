notebook plan:

first few hours following FreeCodeCamps react, until the Photography part that teaches the ui

first 3hours:

for the first few hours i followed the Freecodecamp to build and learn the following in react:
- how to build a navigation bar
- how to add a footer
- made the home with multiple different notes and a image preview for now ( should become a preview of the note itself)
- make different cards so i can have variable number and name etc of notes
- how to hide and show buttons ( could be use as a sort of "fullscreen", but also just for sidebar etc.)
- how to make a color picker
all of these have been done using this course in chronological order: https://www.freecodecamp.org/learn/front-end-development-libraries-v9/#lab-music-shopping-cart-page


Goal for the next few hours:
-implement all of these in the way i'll be using them
-build the home part of the app 
-start looking on how to implement tldraw




From hour 3 to hour 6:30: 

I have seperated the scripts into muliple .jsx files
fixed an issue where some functions had the same game
made most of the css and started some of the  .jsx for the homescreen 

i have also done some research too: and have decided to not use tldraw but konva for drawing as it doesnt require a licence and the coding seems more in depth to learn


goal for the next 15h:
savestate for the notes
notes preview instead of image
dark and light mode 
fininsh the css, .jsx for the homescreen
start implementing konva
making the preview part of the notes
make sure everything works and the homescreen is complete 100%
get working on the favorites tab
maybe implement liquid glass or something of that look
make the sidebar actually more modern looking.
make the sidebar have a variable recents tab.


worked on a todo list, made a dark and light mode work
some more css improvements, these have not been fully implemented with the rest of the code

will now work on a pop up for messages and errors first, 
then a savestate way to save the notes
preview from the note for the homescreen
recents tab in the sidebar, and making favoriting actually work 
completely finishing the homescreen and sidebar in a more modern look with an easier way for the color modes.
start konva




7h45min


1h - implement todolist when i do / almost done 






3h - preview finish homescreen
3h- plan for the coming weeks, readme, shipping project, making sure eveyrthing works as intended.






description:
 A React notebook website,
 Picture is of the homescreen

 features implemented:
In the save folder:
 AddTask.js, save.jsx, TaskList.js, TasksContext.js
 are made to edit and save in a session without refreshing (to be implemented with IndexDb to be saved throughout different sessions locally)

 this guide was followed almost 1 to 1, as this part was harder than expected (took 3h to understand)
sources used in that part: 


this save folder and storage folder (currently empty) will be made into a single file when i implement Indexdb


In the components folder: 
  handwriting has not been imeplemented yet.
  but the current file has draft for a color picker and a way to hide and show buttons
  these were made following the freecodecamp course as a base.
  sources: https://www.freecodecamp.org/learn/front-end-development-libraries-v9/


  pop up sub-folder was made also using the freecodecamp tutorials for pop-ups due to errors and a pop up, these will be implemented later on for the save feature when it is fully implemented


  In the Sidebar sub-folder: 
  there is 2 drafts: 
  - a footer that will have save file button, setting and darkmode toggle (currently by itself)
  - Navbar that will be implemented as the dock with the different colors and pens for handwriting.

  these were also made along the  freecodecamp walkthrough
  source: https://www.freecodecamp.org/learn/front-end-development-libraries-v9/

  There is also the Sidebar css and jsx:
  this is the current sidebar, it was mostly done following this guide with tweaks, to make it feel more modern, the goal is to make it look more modern later (similar to claude or zen browser sidebar.)
  currently the favorites feature doesn't actually work yet and a recents tab hasn't  also been implemented but are planned.

  in Slash menu sub-folder:
  implemented a slash menu like notions with the todolist feature currently with plans for more features like more headings and bullet points, image imports and more!
  the search hasn't been finished but should be implemented for the whole app and for the specific note.
  this guide was mostly used as the basis:
  the NoteCard is the way the notes look in the homepage, it should be made in way that its easy to be not hard-coded and can be used with more notes and more options and a preview of the actual note instead of the image,

  this was built using Freecodecamp course too.

In the pages folder:
-there is the Favorites page that doesn't actually save favorites, should be implemented with indexdb
-Home css, Home jsx used for the homescreen, they use the Notecard logic and apply it to 2 hardcoded examples

this was loosely built using the Freecodecamp course too: https://www.freecodecamp.org/learn/front-end-development-libraries-v9/
-Note is used as the interface for when a note is opened, it should be implemented with the indexdb to show that specfic note when implemented and should have the konva handwirting too next.


App.css and App.jsx, index.css, main.jsx:
what ties everything together, has both dark and light  mode imeplemnted and is the where everything is tied.
maybe should be 2 files instead of 4? 


mode.css, mode.html and mode.jsx were the first implementation of darkmode following this guide:

there are not actually used now because there are mostly implemented into the other files, i left them there as an example of how the dark mode works , they will be removed from the final version next week.


this project was made using react and vite as basis and is not finished, but is a base for what's to come!



  
  
 


 
 description: 

 the past few hours i fininshed and cleaned-up everything, made sure it was working and added the slash-menu, a bit of the save, the pages, notes, preview of the note in homescreen, finished all the css.

 i used AI (claude 5.5 medium) to check everything and made some significant changes after review to BlockEditor.jsx and its connections in all the slash files, this part was the first part that felt truly out of my reach but i tried understanding it a minimum.
 

WEEK2: 

In the past hours i have made using the konva guides multiples seperate scripts: one for the overlay, one for shapes and resizing said shapes, one for drawing with a pen and one for dragging, there has been also one with performance improvememnts that i will implement at the end,

I have also improved the README.md so it is clearer and how to run instructions.


the goal for the next few hours is to finish implementing a pdfexport of the canvas, add multiple colors, and overall make all the scripts more cohesive, and make sure the notes app itself is ready for konva to be implemented in it.


i worked for an hour on more konva features.
i decided to go back and finish the savefile feature before implementing anymore of konva and fixing the new notes, but also that the notes blocks look less obstructive.
