/**
 * Copyright (c) 2014 Infamous Industries, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a 
 * copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, 
 * and/or sell copies of the Software, and to permit persons to whom the 
 * Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in 
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
 * IN THE SOFTWARE.
 *
 * @license MIT
 */

/**
 * DroppableView
 * -----------
 *
 * DroppableView is a view that responses to drag and drop behavior.
 * Draggabe modifiers are added using the addDraggable method, and
 * Droppable surfaces with addDroppable, respectively.
 * 
 * 
 * In this example we can see that the red surface is a draggable
 * surface behind the draggable modifier. The view will emit a
 * 'drop' event whenever a draggable element is successfully dropped
 * into a droppable element. The event contains the surface that was
 * dragged and the surface that was dropped, allowing further manipulation.
 * TODO: find a better workaround for Surface's absolute position
 */

define(function(require, exports, module) {                                                                                                                                                                 
    var Engine    = require('famous/core/Engine');
    var Surface   = require('famous/core/Surface');
    var Modifier  = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Draggable = require('famous/modifiers/Draggable');
    var DroppableView = require('./DroppableView.js');
    var mainContext = Engine.createContext();

    var droppableview = new DroppableView();
    mainContext.add(new Modifier({origin:[0.5,0.5]})).add(droppableview);

    var surface = new Surface({
        size: [40, 40],
        content: 'drag',
        classes: ['red-bg'],
        properties: {
            lineHeight: '40px',
            textAlign: 'center',
            cursor: 'pointer',
            zIndex: 4
        }
    });

    var surface2 = new Surface({
        size: [60, 60],
        content: 'drop',
        properties: {
            lineHeight: '60px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: '#00FFCC',
            zIndex: 1 //Not all browsers support zIndex
        }
    });

    var surface3 = new Surface({
        size: [40, 40],
        content: '3',
        classes: ['red-bg'],
        properties: {
            lineHeight: '40px',
            textAlign: 'center',
            cursor: 'pointer',
            zIndex: 4 //Not all browsers support zIndex
        }
    });

    var surface4 = new Surface({
        size: [60, 60],
        content: '4',
        properties: {
            lineHeight: '60px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: '#00FFCC',
            zIndex: 1 //Not all browsers support zIndex
        }
    });

    var surface5 = new Surface({
        size: [40, 40],
        content: '5',
        classes: ['red-bg'],
        properties: {
            lineHeight: '40px',
            textAlign: 'center',
            cursor: 'pointer',
            zIndex: 4 //Not all browsers support zIndex
        }
    });

    var surface6 = new Surface({
        size: [60, 60],
        content: '6',
        properties: {
            lineHeight: '60px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: '#00FFCC',
            zIndex: 1 //Not all browsers support zIndex
        }
    });
    

    droppableview.on('drop', function(event){
        alert(event.draggable.getContent() + " was dragged into " + event.droppable.getContent());
    });

    var node = mainContext.add(new Modifier({origin:[0.5,0.5]}));
    droppableview.addDraggable(surface, {transform: Transform.translate(100,0,0)});
    droppableview.addDroppable(surface2);
    droppableview.addDraggable(surface3, {transform: Transform.translate(100,50,0)});
    droppableview.addDroppable(surface4, {transform: Transform.translate(0,70,0)});
    droppableview.addDraggable(surface5, {transform: Transform.translate(100,100,0)});
    droppableview.addDroppable(surface6, {transform: Transform.translate(0,140,0)});


});
