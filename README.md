# Procedurally generated story
A procedurally generated story created with spielebuch:core, spielebuch:ui, twbs:bootstrap, thepumpinglemma:chance and fortawesome:fontawesome.

# Important:
Does only work in chrome.

# How to use it
- Clone it and start the application local or go directly to [darkforrest.meteor.com](http://darkforrest.meteor.com/).
- Create an account
- Click 'Restart' in the upper right corner.

You can navigate through the story by clicking (e.g. Go east). Sometimes you will meet GameObjects (only sheeps and cacti at the moment).
These GameObjects are marked Words you can interact with. Click on one of them and a menu with some actions will appear.
When you fight (e.g. with a sheep) you see under the button Backpack three numbers. The one in the middle is your health. It will go down fast. Those sheeps are mental!
In your Backpack you will find items that you found on your travel.
For the moment there is only one thing you can steal. The treasure of the Elfking. Just walk around, you will find him.

If you are lost, you can take a look on the map, by clicking 'Map' in the upper left corner. The map shows you surrounding.

This is a prototype so be aware, things will break.


# Description
This application is a hybrid between procedurally generated and manually generated. There are three main parts, that play together:

## Scenes
A scene is a place, it contains text. Every scene has a biome (Forrest, Dark Forrest, Swamp, Dessert or Grassland). Every biome has certain rules (what can exist here) and more or less describptive text.
Every scene has a seed that is determindated by its position in the world. That means: everything in this story looks random, but it is not. 
A scene is created by a deterministic function (when you know the input (position) you know the output). Thus everyone who plays this app will walk on the same places and will read the same text.

## Instance
An instance consists of one scene or more scenes. But it was created manually. It can be way more complex than a procedurally generated scene. 
Instances are placed on the map depending on biomes (e.g.the elfking will not celebrate in the swamp or the dessert). 

## GameObjects
GameObjects are created with one word. If one adds text to a scene and uses the right markdown, a GameObject is returned. This means an author can manually fill an instance with objects.
Every GameObjects has Effects. Effects are a bunch of rules, that give a GameObject properties. Everything in this game is controlled with effects. If the player fights a sheep. A damage-Effect is added to the sheep.
If the sheep has no more hitpoints, it will be destroyed.
Interaction with GameObjects works via events. A event is a function that is stored on the datebase and executed on the client, when the user interacts with the GameObject in a predefined way.

GameObjects can be generated procedurally. Every biome has rules, which GameObject it can contain. There are some predefined GameObjects (sheep and cactus) that are generated into the map.
A director has an eye on every object (via observer). If one GameObject is created or destroyed in one scene, the director takes care, that it stays destroyed or is not created twice.

## Video
[!Video auf Youtube](http://img.youtube.com/vi/w99yP59uV-U/0.jpg)](http://www.youtube.com/watch?v=w99yP59uV-U)

## Time needed:
19 h
(09.00 am - 04.00 am)



# Used packages:
- meteor-base            
- mobile-experience      
- mongo                   
- blaze-html-templates   
- session                 
- jquery          
- tracker              

- standard-minifiers   
- es5-shim               
- ecmascript              

- check
- reactive-var
- underscore

- accounts-base
- accounts-password
- accounts-ui

- spielebuch:core: A package to create interactive stories. Used it to create GameObjects from text.
- spielebuch:ui: A package to parse the text from spielebuch:core. Used it to create hyperlinks from markdown.

- twbs:bootstrap: Very helpful.
- thepumpinglemma:chance: Very very helpful
-fortawesome:fontawesome: These icons are not perfect for my use-case, but I cannot draw myself.




