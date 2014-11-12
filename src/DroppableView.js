/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Owner: john@zhang.io
 * @license MPL 2.0
 * @copyright Infamous Industries, Inc. 2014
 */


define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var StateModifier = require('famous/modifiers/StateModifier');
    var EventHandler = require('famous/core/EventHandler');
    var RenderNode = require('famous/core/RenderNode');
    var Draggable = require('famous/modifiers/Draggable');

    function DroppableView() {
        View.apply(this, arguments);
        this._draggable = [];
        this._droppable = [];
        this.eventHandler = new EventHandler();
        EventHandler.setInputHandler(this,  this.eventHandler);
        EventHandler.setOutputHandler(this, this.eventHandler);
        this._node = new RenderNode();
    }

    DroppableView.prototype = Object.create(View.prototype);
    DroppableView.prototype.constructor = DroppableView;

    DroppableView.DEFAULT_OPTIONS = {};


    DroppableView.prototype.add = function add(child) {
        return this._node.add.apply(this._node, arguments);
    };

    DroppableView.prototype.addDraggable = function addDraggable(child, options) {
        var mod = new StateModifier(options);
        var tempDrag = new Draggable();        
        child.addClass("draggable");
        tempDrag.subscribe(child);
        this._bindDragEvents(tempDrag);
        
        this.add(mod).add(tempDrag).add(child);
        this._draggable.push({draggable: tempDrag, surface: child, pos: tempDrag.getPosition(), box: []});
    };
    
    DroppableView.prototype.addDroppable = function addDroppable(child, options) {
        var mod = new StateModifier(options);
        child.addClass("droppable");
        this.add(mod).add(child);
        this._droppable.push({surface: child, box: []});
    };

    DroppableView.prototype._bindDragEvents = function _bindDragEvents(draggable) {
        var startPos = [0,0];
        var diff = [0,0];
        var box = [];
        var dragArray = [];
        _populateDroppable();
        draggable.on('start', function(event){
            startPos[0] = event.position[0];
            startPos[1] = event.position[1];
            dragArray = document.getElementsByClassName('draggable');
            for(var i = 0; i<dragArray.length; i++){
                this._draggable[i].box = dragArray[i].getBoundingClientRect();
            }
        }.bind(this));

        draggable.on('update', function(event){
        }.bind(this));

        draggable.on('end', function(event){
            diff = [(startPos[0]-event.position[0]), (startPos[1]-event.position[1])];

            dragArray = document.getElementsByClassName('draggable');

            for(var i = 0; i<dragArray.length; i++){
                var boxDiff = dragArray[i].getBoundingClientRect();
                box = this._draggable[i].box;

                if((box.left - boxDiff.left)==diff[0] && (box.top-boxDiff.top)==diff[1]){
                    var dropArray = document.getElementsByClassName('droppable');
                    for(var j = 0; j<dropArray.length; j++){
                        var dropBox = dropArray[j].getBoundingClientRect();
                        if( boxDiff.left+boxDiff.width/2 > dropBox.left && 
                            boxDiff.top+boxDiff.height/2 > dropBox.top &&
                            boxDiff.left+boxDiff.width/2 < dropBox.right &&
                            boxDiff.top+boxDiff.height/2 < dropBox.bottom){
                            this.eventHandler.emit('drop', {draggable: this._draggable[i].surface, droppable: this._droppable[j].surface});
                        }
                    }
                }

            }
        }.bind(this));
    };

    function _populateDroppable(){
        var droppableArray = document.getElementsByClassName('droppable');
        for(var i=0; i<droppableArray.length; i++){
            this._droppable[i].box = droppableArray[i].getBoundingClientRect();
        }
    }

    module.exports = DroppableView;
});

