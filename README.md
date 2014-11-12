DroppableView.js
================

In the current version of Famo.us, "interactions such as drag and drop are harder to implement, but this is intended and we are working on an elegant solution for these use-cases." The reason is there are no absolute positions available through Surfaces. This is an implementation of a DroppableView done in 24 hours. It's meant as an exercise and shouldn't be used for production code. 

API
================

Extends View. Useful for quickly adding renderables with drag and drop behavior. 
Special add methods must be used to add a renderable as a Draggable or a Droppable. 
Utilizes workarounds dealing with Surface's lack of absolute positioning. Not meant 
to see the light of day.

Emits event: 'drop' whenever a draggable element is successfully dropped into a 
Droppable element. The event contains the rendered elements as 'draggable' and 
'droppable', ready for further manipulation. 

EXAMPLES: main.js. Open index.html to see.

_____________________________________________________________________________________

**add** -- Add a child renderable to the view. Note: this will not give the renderable drag or 
drop properties

RETURNS
RenderNode

_____________________________________________________________________________________

**addDraggable(child, options)** -- Add a child renderable to the view as a draggable element. The translations cannot be
chained normally, and must be passed on as options. 

PARAMETERS | | 
------------- | ------------- | -------------
child | Object |The renderable you want to be draggable
options (optional) |	Object 	|	Same options as you would pass into a Modifier

_____________________________________________________________________________________

**addDroppable(child, options)** -- Add a child renderable to the view as a droppable element. The translations cannot be
chained normally, and must be passed on as options. 

PARAMETERS | |
------------- | ------------- | -------------
child				|	Object 	|		The renderable you want to be draggable
options (optional)|		Object 		|	Same options as you would pass into a Modifier
