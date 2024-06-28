# BEHAVIOR3EDITOR

![interface preview](preview.png)

**Behavior3+ Editor** is primarily a standalone behavior tree editor (but probably can still be hosted online) based on [Behaviour3 Editor](https://github.com/behavior3/behavior3editor). This version of the editor supports all of the _luabehaviourtree 2e_ (link is coming, it's also a fork I'm working on, not published yet) nodes out of the box and provides a visual and quality-of-life improvement over the original _Behaviour3 Editor_.

New features include:
- Cleaner overall visuals
- Node icons
- Property values displayed on the nodes in the tree
- New node type - Interrupts
- Automatic release builds (WIP)
- Few other minor changes and bug fixes

Behaviour3+ Editor and _luabehaviourtree 2e_ were actively used in the development of _Combat AI Behavior Overhaul_ for [OpenMW](https://openmw.org/)

## Why Behavior3 Editor?

Why should you use b3editor? What is different from other editors? Can it compete against commercial alternatives? - Well, check it out some characteristics of Behavior3 Editor:

## Requirements

Gulp pipeline has incompatibilities with some of the newer Node.js versions. 
Been tested to work fine on Node.js 20.11.0.

- **Open Source Software**: under MIT license, you can use this software freely, adapt it to your need and even use a specialized internal version in your company. You can also contribute with bug fixes, suggestions and patches to make it better.

- **Open Format**: b3editor can export the modeled trees to JSON files, following an open format. If there is no official reader on your favorite language yet, you can develop your own library and use the trees created here. 

- **Formality**: the editor works above the basis created by Behavior3JS, which in turn is based on formal description of behavior trees. Thus, the editor provides a stable solution to model agents for your games or other applications such as robotics and simulations in general.

- **Focus on Usability**: intuitiveness is the key word of b3editor. We focus on providing an easy, clean, and intuitive tool for programmers and non-programmers. If there is something obscure or too difficult to use, report it immediately!

- **Minimalist, but Functional**: b3editor follows a minimalist style, trying to reduce the amount of non-essential information presented on the screen. We focus on the important things: designing Behavior Trees. 

- **Customizable**: create your own node types and customize nodes instances individually. Create several projects and trees, change titles and add properties.

- **Big Projects Ahead**: we are working towards a collaborative tool in order to provide an awesome editor for big projects involving several designers working together. 

- **Does not depends on other tools/editors/engines**.



## Main features

- **Custom Nodes**: you can create your own node types inside one of the four basic categories - *composite*, *decorator*, *action* or *condition*. 
- **Individual Node Properties**: you can modify node titles, description and custom properties.
- **Manual and Auto Organization**: organize by dragging nodes around or just type "a" to auto organize the whole tree.
- **Create and Manage Multiple Trees**: you can create and manage an unlimited number of trees.
- **Import and Export to JSON**: export your project, tree or nodes to JSON format. Import them back. Use JSON on your own custom library or tool. You decide.


## Limitations

Nothing is perfect =( . Behavior3 Editor focus on Chrome (thus, working pretty well on Opera too), so it have some incompatibilities with Firefox, such as the image preview lag when dragging to create a node for the first time, and the ugly scroll bar inside the panels. Not tested on IE!


## Looking for Behavior Tree Libraries?

- https://github.com/behavior3/behavior3js
- https://github.com/behavior3/behavior3py

