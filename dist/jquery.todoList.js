/*! TodoList - v0.1.0 - 2015-05-10
* https://github.com/purtuga/jquery.todoList
* Copyright (c) 2015 Paul Tavares; Licensed MIT */
(function(factory){
    if ( typeof define === "function" && define.amd ) {

        // AMD. Request jQuery and then run the plugin
        define([ "jquery" ], factory );

    } else {

        // Global jQuery
        factory( jQuery );

    }
}(function($) {

    var setup = {
        isInitDone: false
    };

    setup.listTemplate = "<div class=\x22jquery-todolist ui-widget\x22 style=\x22display:none;\x22>\n    <div class=\x22jquery-todolist-title ui-widget-header\x22>\n        <div class=\x22jquery-todolist-action-edit jquery-todolist-action\x22>\n            <span class=\x22jquery-todolist-title-text\x22></span>\n        </div>\n        <span class=\x22jquery-todolist-menu-show jquery-todolist-action ui-widget-header\x22>...</span>\n    </div>\n\n    <div class=\x22jquery-todolist-items\x22></div>\n\n    <div class=\x22jquery-todolist-footer ui-widget-content\x22>\n        <div class=\x22jquery-todolist-add ui-state-default\x22>\n            <span class=\x22jquery-todolist-add-input ui-widget-content\x22>\n                <input class=\x22jquery-todolist-add-input-text\x22 placeholder=\x22New Item\x22 type=\x22text\x22 name=\x22j\x22 name=\x22j\x22 value=\x22\x22 />\n            </span>\n            <a class=\x22jquery-todolist-action jquery-todolist-add-action\x22 href=\x22javascript:\x22>+</a>\n        </div>\n    </div>\n</div>";

    setup.itemTemplate = "<div class=\x22jquery-todolist-item\x22>\n    <div class=\x22ui-state-default\x22>\n        <div class=\x22jquery-todolist-item-title ui-widget-content jquery-todolist-action-edit jquery-todolist-action\x22>\n            <span class=\x22jquery-todolist-item-title-text\x22></span>\n        </div>\n    </div>\n    <span class=\x22jquery-todolist-item-actions-left\x22>\n        <span class=\x22jquery-todolist-action jquery-todolist-item-checkbox\x22>&#9744;</span>\n    </span>\n    <span class=\x22jquery-todolist-item-actions-right\x22>\n        <span class=\x22jquery-todolist-action jquery-todolist-item-action-remove\x22>&times;</span>\n    </span>\n</div>";

    setup.itemEditTemplate = "<div class=\x22jquery-todolist-edit\x22>\n    <div class=\x22jquery-todolist-edit-input\x22>\n        <input type=\x22text\x22 name=\x22e\x22 value=\x22\x22 />\n    </div>\n    <span class=\x22jquery-todolist-edit-save\x22 title=\x22Save\x22>Save</span>\n</div>";

    setup.confirmButtonTemplate = "<span class=\x22jquery-todolist-button ui-state-default\x22>\n    <span class=\x22jquery-todolist-action jquery-todolist-button-confirm\x22>continue?</span>\n    <span class=\x22jquery-todolist-action jquery-todolist-button-cancel\x22>&times;</span>\n</span>";

    setup.menuTemplate = "<div class=\x22jquery-todolist-menu ui-widget-content\x22>\n    <div class=\x22jquery-todolist-menu-actions\x22>\n        <a href=\x22javascript:\x22 class=\x22jquery-todolist-action\x22 data-todolistaction=\x22close menu\x22>&times</a>\n    </div>\n    <div class=\x22jquery-todolist-menu-items\x22>\n        <a href=\x22javascript:\x22 class=\x22ui-state-default jquery-todolist-action jquery-todolist-menu-item\x22 data-todolistaction=\x22toggle done\x22>Show/Hide Done</a>\n    </div>\n</div>\n";

    setup.styles = ".jquery-todolist{position:relative;min-width:15em}.jquery-todolist *,.jquery-todolist *:before,.jquery-todolist *:after{margin:0;padding:0;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.jquery-todolist .jquery-todolist-title{padding:.5em 2em .5em .5em;position:relative;max-height:5em;overflow:hidden}.jquery-todolist .jquery-todolist-title-text{display:inline-block;width:100%}.jquery-todolist .jquery-todolist-menu-show{display:block;position:absolute;right:-1px;top:-1px;font-weight:900;cursor:pointer;vertical-align:middle;font-size:.9em;height:6em;padding:.2em}.jquery-todolist .jquery-todolist-menu{position:absolute;top:0px;right:0px;width:10em;padding:.2em;z-index:1}.jquery-todolist .jquery-todolist-menu-actions{position:absolute;right:.2em;top:.2em}.jquery-todolist .jquery-todolist-menu-actions .jquery-todolist-action{padding:.2em;display:inline-block}.jquery-todolist .jquery-todolist-menu-items{max-height:10em;overflow-y:auto;margin:2em 0em 1em}.jquery-todolist .jquery-todolist-menu-items a{display:block;padding:.2em;margin-bottom:0.5em}.jquery-todolist .jquery-todolist-footer{position:relative}.jquery-todolist .jquery-todolist-action{cursor:pointer;text-decoration:none}.jquery-todolist .jquery-todolist-button{display:inline-block}.jquery-todolist .jquery-todolist-button-confirm{display:inline-block;padding:.2em;height:6em;border-top:none;border-bottom:none;border-right:none}.jquery-todolist .jquery-todolist-button-cancel{display:inline-block;padding:.2em;height:6em}.jquery-todolist .jquery-todolist-add{padding:1px 40px 1px 1px;position:relative;border:none}.jquery-todolist .jquery-todolist-add-input,.jquery-todolist .jquery-todolist-add-action{line-height:1.5em;display:inline-block}.jquery-todolist .jquery-todolist-add-input{width:100%;border:none}.jquery-todolist .jquery-todolist-add-input-text{width:100%;border:none;line-height:1.5em;padding:.5em}.jquery-todolist .jquery-todolist-add-action{display:inline-block;text-decoration:none;overflow:hidden;font-weight:900;padding:0em;text-align:center;font-size:2em;line-height:1.1em;position:absolute;width:40px;top:0px;right:0px}.jquery-todolist .jquery-todolist-edit{position:relative}.jquery-todolist .jquery-todolist-edit-input{width:100%;padding-right:40px}.jquery-todolist .jquery-todolist-edit-input input{width:100%;padding:.5em;line-height:1.5em}.jquery-todolist .jquery-todolist-edit-save{background-repeat:no-repeat;display:inline-block;text-indent:-1000px;overflow:hidden;position:absolute;right:12px;top:0px;width:25px;text-align:center;line-height:2em;cursor:pointer;background-image:url(\x22data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACCklEQVRIib2Wy27TQBSGR4pJvOA5YNtHmKUjjDQbC3EHpYAIK1iCmtSWmqob0rSOnfTOVULpS3ST90gXbEhbsDP2JI71s6B1cyc0Dr90dqPv05kz0hlCeqJpWpJSKs9SmqYlyWAopQuMsXpaUXxVVfkslVYUnzFWp5QuRALGWP2wVkMYhpg1YRjisFYDY6weXUtaUfw44L2StKL4mqYlCaVUVlWVx0Y/j6qqnFIqxyIQQuCd+RmF7W/RNccmEELgqWFD2nRw/f13vFmrotvtxiPwfR9PdAvSpgNSBUgFuGkc4bjRmF3geR4eL1uQzEu4tNFCRrchhBgtCIIAb81PeF08QKvVmgh/lC9DMt0euIuMbsPzPAAjZhAEAbIFC3K1icSuh3vLFlzXHYJzzvFwEF5ykNEt+L4fnRsSHDcauLF2BPIRIB+AxI6Hu/l+CeccD3JmH/xaycHiAHxsBy9XK0hVz0AOALIPJLY83Fky4TgOOOe4v2RCKrd64L+wqFsQQgx1OnIGnU4H2dUKUvYpyB5AdoFExcOt3D5u5/b64es/8WwMfKwgkhRspMwTkB2AbJ/XFiJ4cv0Mz43x8ImCPslG80rwvwqAP082u2JBLjUv4cVTvDDKaLfbE+FTCS4kr1YsyMUfSBVPpoZPLbiQGPZX5Mtfpob/k+CqiQRzXzhzX5n/ZenP89vyG9UicsE1jZqPAAAAAElFTkSuQmCC\x22)}.jquery-todolist .jquery-todolist-item{margin:.3em 0em .3em;position:relative;overflow:hidden}.jquery-todolist .jquery-todolist-item-title{border-bottom:medium none;border-top:medium none;border-right:medium none;line-height:1.5em;padding:0.5em;margin-left:40px;padding-right:23px;max-height:6em;overflow:hidden}.jquery-todolist .jquery-todolist-item-title-text{display:inline-block;width:100%}.jquery-todolist .jquery-todolist-item-actions-left{display:inline-block;position:absolute;top:.5em;left:7px}.jquery-todolist .jquery-todolist-item-actions-right{display:inline-block;position:absolute;top:0px;right:0px;height:6em}.jquery-todolist .jquery-todolist-item-action-remove{background-repeat:no-repeat;display:inline-block;text-indent:-1000px;text-align:center;overflow:hidden;background-image:url(\x22data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABA0lEQVQ4jY3Sz0oCYRQF8N+ssrdIJ1chopuQ3qBFuOjNLLJAEFwIvkUZBSW9Sq6qZYs7xuf4VR6YxXfPPefO/cMuehjjC0/V94EbdDP5PzjEBFOcZPgOZrhFIyd+w/lfFSpc4KVuMtlTvMFQtInoeZqQZygzojYGyXuumsnYds8lHmsmx1XsKIn1cE1Mu47UpMSyJoYCa2JNOWxMcuINXv8zWOIezV9yVvCZIdKem3hAq5ZT4J24sE5CtO0OrFX9TWrSx4hYxSwhBvI9lzhN3ou08J24sH1xias00BDnOdxT/IyDOtEQRzUXR1IkXCF6XlSVd8QpuuLC1mLPKzHtke1hg295iTKQEXiRlAAAAABJRU5ErkJggg==\x22);position:absolute;right:5px;top:.5em;height:17px;width:17px;cursor:pointer}.jquery-todolist .jquery-todolist-item-action-remove-confirm{background-repeat:no-repeat;text-indent:-1000px;text-align:center;overflow:hidden;display:inline-block;padding:.2em;width:19px;height:24px;background-image:url(\x22data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAYCAYAAAAYl8YPAAACTUlEQVQ4T62VS0iVURSFVRpYGCnlxKIGUdBLbRA9zGgmaYI0SKVhEWVENCjTgVGgUhhElBrmSAslGvlqJhg9iAbaAyVKpHQghqFYEkH2LTkH9v05XW/ggcVZe+91193/Oec/f3JS/JFCeZWR/IT/+ddPkuN4qTYCthrNG/ieeGYTFLOW6DCR8rj+fQqsS0S9hGZKZmkgdRnM5mWmRf4IVjhDLfB2MAxU/wV2gE+uPsu8G3w2DXxXzm/AV4INprgGrrVU1zJLB/OuLm0+GDP6d/Bsb/aKYK8pboS/BOsDZu/JnQBDRv8UfsSbPSE4Zoq74J1Ajxvt7Dm5KjBg9K3wU97sDsF5UzwIvwkOBMx6yDWDLqO/Dr/qzS4T3DDFo/Bzaj1g9ohcH2gz+tPwFm+mNWg3RcXFoCxg1kTuA7hr9EXwXm92mKDfFCvg2eBMwKye3ByoNfpc+JA320Kgs+ZHNUTHozJgdoXcWnDJ6DPh37yZboYfpqj1mwF1AbOz5HRotU4a2u2VYMHeGtMkMpxAu/UWNAbMysmVgFKnHWXeLG7NdIp3OkEHs7b+YcCskNwFUOC0z5gPRc10ir1AW38PdAfM8sjdAvvMH6vbmM4eEJ90ghfMWnz9a/QNUPePwTanbWBe3Az7mNeIa5xA50hnTI8eNdOF8Br4C/Ui/HbUTLtz35npxtgPvgTMVpObBP7bcNx1GtOZFlbvnYY+HFo/PeZvoCtHN8sC0DdA3wI/9P7qhokxyyEeNKJE6Sb3BDFmOtVaq/8Z6lR3n7pP+guXqYbxgVDCfwAAAABJRU5ErkJggg==\x22)}.jquery-todolist .jquery-todolist-item-checkbox{background-repeat:no-repeat;display:inline-block;text-indent:-1000px;text-align:center;overflow:hidden;height:26px;width:26px;background-image:url(\x22data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAh0lEQVRIie3WsQ3DMAxEUY6gUT6OC2hDjeZRNILdhEYgpwlMu+IBbPUoNTozMwOapCFpuvueMZKmpAE0C8Tdtyzgx2xAM0nja4sBdLsZoK/nWjyXpHEXWBOYpGmhZtxkDUCcf0LZSKSgggoqqKCC/oEAshGgn9BrX/lD5YRLOXmtbn02eLxAHkhQNNgPmtd0AAAAAElFTkSuQmCC\x22);opacity:.7;cursor:pointer}.jquery-todolist .jquery-todolist-item-done .jquery-todolist-item-checkbox{background-image:url(\x22data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABIUlEQVRIib3WYZGDMBQE4CcBCZWws2sACUg4CZVwDiKlEpCAhEpAwt0fwnC59yCdpGWGP5DkS5aQxMzMAAwkE8lV0k+Pm+RKMgEYLCOSll6Acy8ABiOZDr1IAEZrvACMZbuW4yKZWoHyyhjJ1bLaOhIAIPm9f5PtWW5/hxqR4ZDMKmnK77pCkh7lJOgOSZqcmTZ3hY6RHf8fALeukBcZyXtRpg26iqwLVBNZFbQ19OefKCp7kX0FZX2oWPuWEiN5dyJ7RKMPIWeB3TEAtyAyd+SnEMlntAJLmp13U4RcRQdvXwr2qjCyS+gMeyWyKqgSO42sGrrALiN7CfIwks+ayEIIAM4wSfOGhOWceuMOfWwrf9PhBP8OJx87bm09ePsB8hfZBPJdtEbBiQAAAABJRU5ErkJggg==\x22)}.jquery-todolist .jquery-todolist-item-done .jquery-todolist-item-title-text{text-decoration:line-through;font-style:italic;font-size:.9em}.jquery-todolist .jquery-todolist-item-done:hover .jquery-todolist-item-title-text{text-decoration:none}.jquery-todolist .jquery-todolist-hide-done .jquery-todolist-item-done{display:none}";

    /**
     * Creates a todoList within the given selection of elements.
     *
     * @param {Object} [options]
     * @param {String} [options.title="Todo List"]
     * @param {Array<Object>|Array<String>} [options.items]
     * @param {String} [options.removeLabel="delete?"]
     * @param {String} [options.newItemLabel="New Item"]
     * @param {String} [options.editItemTooltip="Click to Edit"]
     * @param {Boolean} [options.focusOnTitle=false]
     * @param {Array<Object>} [options.customActions=null]
     *
     * @return {jQuery}
     */
    $.fn.todoList = function(options) {

        if (!setup.isInitDone){

            setup.isInitDone = true;
            $('<style>' + setup.styles + '</style>').appendTo('head');

            // Setup global listener: If a click is dont outside an edit
            // item, close it.
            $("body").on("click", function(ev){

                var $elements = $("div.jquery-todolist-edit"),
                    $cntr;

                // close edit Forms
                if ($elements.length) {

                    $cntr = $(ev.target).closest(".jquery-todolist-action-edit");

                    if (!$cntr.length) {

                        $elements.find(".jquery-todolist-edit-save").click();

                    } else {

                        // Close any edit item that does not have the current
                        // target in inside of it.
                        $elements.each(function(){

                            if (!$.contains($cntr[0], this)){

                                $(this).find(".jquery-todolist-edit-save").click();

                            }

                        });

                    }

                } //end: if: edit containers

                // Hide todo list menu
                $elements = $("div.jquery-todolist-menu:visible");

                if ($elements.length) {

                    // FIXME: need to hide menu if clicked outside of it.

                }


            });

        }

        var returnValue = this;

        this.each(function(){

            if (this.jqueryTodoList && typeof options === "string") {

                switch (String(options).toLowerCase()) {

                    // options = returns a copy of the internal options object.
                    case "getsetup":

                        returnValue = this.jqueryTodoList.getSetup();

                        break;

                }

                return this;

            } //end: options === string

            // Exit if this element already has a todo list
            if ($(this).hasClass("has-jquery-todolist")) {

                return this;

            }

            var
            todo    = {

                $ele: $(this),

                opt: $.extend(
                    {},
                    {
                        title: "Todo List",
                        items: [],
                        removeLabel: "delete?",
                        newItemPlaceholder: "New Item",
                        editItemTooltip: "Click to Edit",
                        focusOnTitle: false,
                        customActions: null
                    },
                    options
                ),

                /**
                 * Returns the setup for this todo instance.
                 *
                 * @return {Object}
                 */
                getSetup: function(){

                    var instSetup = {
                        title: todo.$ui.find(".jquery-todolist-title-text").text(),
                        items: []
                    };

                    todo.getItems().each(function() {

                        var $thisItem = $(this);

                        instSetup.items.push({
                            done: $thisItem.is(".jquery-todolist-item-done"),
                            title: $thisItem
                                    .find(".jquery-todolist-item-title-text")
                                        .text()
                        });

                    });

                    return instSetup;

                }, //end: getSetup()

                /**
                 * Adds an item to the todo list
                 *
                 * @param {Object} itemContent
                 *      An object that represents a todo list item. Object
                 *      must have a 'title' and 'done' property
                 *
                 * @return {jQuery}
                 *      the item created.
                 */
                addItem: function(itemContent, suppressEvents){

                    var $newItem = $(setup.itemTemplate)
                            .find(".jquery-todolist-item-title-text")
                                .append(itemContent.title)
                                .end()
                            .addClass(
                                (itemContent.done ? "jquery-todolist-item-done" : "")
                            )
                            .find(".jquery-todolist-action-edit")
                                .attr("title", todo.opt.editItemTooltip)
                                .end()
                            .appendTo(todo.$ui.$items);

                    if (!suppressEvents) {

                        todo.$ele.trigger("todolist-add", options, todo.$ele);
                        todo.$ele.trigger("todolist-change", options, todo.$ele);

                    }

                    return $newItem;

                }, //end: addItem()

                /**
                 * Gets the list of items from the UI
                 *
                 * @return {jQuery}
                 */
                getItems: function(){

                    return todo.$ui.$items.find("div.jquery-todolist-item");

                }, //end: getItems()

                /**
                 * Shows the edit form for the item clicked on
                 *
                 * @param {jQuery} $ele
                 *
                 */
                showEdit: function($ele){

                    var
                    $titleText = $ele.find(
                            ".jquery-todolist-item-title-text,.jquery-todolist-title-text"
                        ).eq(0),
                    $titleEdit = $(setup.itemEditTemplate)
                        .css("display", "none")
                        .find("input")
                            .val($titleText.text())
                            .end()
                        .appendTo($ele),
                    saveValue = function(){

                        $titleText.html($titleEdit.find("input").val());
                        $titleEdit.hide().delay("500").remove();
                        $titleText.show();
                        $ele.addClass("jquery-todolist-action");

                        todo.$ele.trigger("todolist-edit", options, todo.$ele);
                        todo.$ele.trigger("todolist-change", options, todo.$ele);

                    };

                    $ele.removeClass("jquery-todolist-action");
                    $titleText.hide();
                    $titleEdit.show().promise().then(function(){
                        $titleEdit.find("input").focus();
                    });

                    // Setup events
                    $titleEdit
                        .find(".jquery-todolist-edit-save")
                            .on("click", saveValue)
                            .end()
                        .find("input")
                            .on("keyup", function(ev){

                                if (ev.which === 13){
                                    saveValue();
                                }

                            });


                }, //end: showEdit()

                /**
                 * Sets up the list menu and stores it in todo.$ui.$menu
                 */
                setupListMenu: function(){

                    todo.$ui.$menu = $(setup.menuTemplate)
                                            .css("display", "none")
                                            .appendTo(todo.$ui);

                    // Add custom actions
                    if ($.isArray(todo.opt.customActions)) {

                        var itemTemplate = todo.$ui.$menu
                                .find(".jquery-todolist-menu-items > a:first")
                                    .clone(),
                            additionalItems = $();

                        $.each(todo.opt.customActions, function(){

                            if ($.isPlainObject(this)){

                                var thisCustomAction = this;

                                additionalItems = additionalItems.add(
                                    itemTemplate.clone()
                                        .text(this.title || "Action?")
                                        .attr("data-todolistaction", "custom action")
                                        .click(function(){
                                            if ($.isFunction(thisCustomAction.action)) {

                                                return thisCustomAction.action.call(
                                                    todo.$ele, options, thisCustomAction
                                                );

                                            }
                                        })
                                );

                            }

                        });

                        todo.$ui.$menu.find(".jquery-todolist-menu-items")
                            .append(additionalItems);

                    }


                } //end: setupListMenu()

            }; //end: todo instance

            todo.$ui = $(setup.listTemplate)
                        .appendTo(
                            todo.$ele.empty().addClass("has-jquery-todolist")
                        )
                        .find(".jquery-todolist-title-text")
                            .html(todo.opt.title)
                            .end()
                        .find(".jquery-todolist-add-input-text")
                            .attr("placeholder", todo.opt.newItemPlaceholder)
                            .end()
                        .find(".jquery-todolist-action-edit")
                            .attr("title", todo.opt.editItemTooltip)
                            .end();

            // Add references to the UI elements
            todo.$ui.$menu          = null;
            todo.$ui.$items         = todo.$ui.find("div.jquery-todolist-items");
            todo.$ui.$newItemInput  = todo.$ui.find("input.jquery-todolist-add-input-text");
            todo.$ui.$addButton     = todo.$ui.find(".jquery-todolist-add-action");

            // If there are items defined on input, create them
            if ($.isArray(todo.opt.items)) {

                $.each(todo.opt.items, function(i,item){

                    var thisItem = {
                        title: 'todo item',
                        done: false
                    };

                    if ($.isPlainObject(item)) {

                        $.extend(thisItem, item);

                    } else {

                        thisItem.title = String(item) || "Item " + (i + 1);
                    }

                    todo.addItem(thisItem, true);

                });

            }

            // Bind CLICK event handler
            todo.$ui.on("click.jqueryTodoList", ".jquery-todolist-action", function(){

                var $this   = $(this),
                    tmp1;

                // ADD NEW ITEM
                if ($this.is(todo.$ui.$addButton)) {

                    tmp1 = todo.$ui.$newItemInput.val();

                    if (tmp1) {

                        todo.addItem({title: tmp1});

                    }

                    todo.$ui.$newItemInput.val("");
                    todo.$ui.$newItemInput.focus();

                // SHOW ITEM REMOVE CONFIRM
                } else if ($this.is(".jquery-todolist-item-action-remove")) {

                    $this
                        .hide()
                        .closest(".jquery-todolist-item-actions-right")
                        .append(
                            $(setup.confirmButtonTemplate)
                                .find(".jquery-todolist-button-confirm")
                                    .addClass("ui-state-error jquery-todolist-item-action-remove-confirmed")
                                    .html(todo.opt.removeLabel)
                                    .end()
                                .find(".jquery-todolist-button-cancel")
                                    .addClass("jquery-todolist-item-action-remove-cancel")
                                    .end()
                        );

                // CANCEL DELETE OF ITEM
                } else if ($this.is(".jquery-todolist-item-action-remove-cancel")) {

                    $this
                        .closest(".jquery-todolist-item-actions-right")
                            .find(".jquery-todolist-item-action-remove")
                                .show()
                                .end()
                            .end()
                        .closest(".jquery-todolist-button")
                            .remove();

                // REMOVE ITEM
                } else if ($this.is(".jquery-todolist-item-action-remove-confirmed")) {

                    $this.closest(".jquery-todolist-item")
                        .slideUp().promise().then(function(){

                            $(this).remove();

                        });

                    $this.trigger("todolist-remove", options, $this);
                    $this.trigger("todolist-change", options, $this);

                // MARK CHECKED/UNCHECKED
                } else if ($this.is(".jquery-todolist-item-checkbox")) {

                    tmp1 = $this.closest(".jquery-todolist-item");

                    if (tmp1.hasClass("jquery-todolist-item-done")) {

                        tmp1.removeClass("jquery-todolist-item-done");

                        $this.trigger("todolist-unchecked", options, $this);
                        $this.trigger("todolist-change", options, $this);

                    } else {

                        tmp1.addClass("jquery-todolist-item-done");

                        $this.trigger("todolist-checked", options, $this);
                        $this.trigger("todolist-change", options, $this);

                    }

                // SHOW EDIT FORM?
                } else if ($this.is(".jquery-todolist-action-edit")) {

                    todo.showEdit($this);

                // SHOW THE TODOLIST MENU
                } else if ($this.is(".jquery-todolist-menu-show")) {

                    if (!todo.$ui.$menu) {

                        todo.setupListMenu();

                    }

                    if (todo.$ui.$menu.is(":visible")) {

                        todo.$ui.$menu.hide();

                    } else {

                        todo.$ui.$menu.show();

                    }


                // SHOW/HIDE DONE ITEMS
                } else if ($this.is(".jquery-todolist-menu-item")){


                    if ($this.data("todolistaction") === "toggle done") {

                        if (todo.$ui.$items.hasClass("jquery-todolist-hide-done")) {

                            todo.$ui.$items.removeClass("jquery-todolist-hide-done");

                        } else {

                            todo.$ui.$items.addClass("jquery-todolist-hide-done");

                        }

                    } //end: toggle done

                    $this.closest(".jquery-todolist-menu").hide();


                // CLOSE A MENU
                } else if ($this.data("todolistaction") === "close menu") {

                    $this.closest(".jquery-todolist-menu").hide();

                }

            });

            // Bind add input ENTER key handler
            todo.$ui.$newItemInput.on("keyup", function(ev){

                if (ev.which === 13) {

                    todo.$ui.$addButton.click();

                }

            });


            // Store this instance object on the dom element
            this.jqueryTodoList = todo;
            todo.$ui.css("display", "");

            // Focus on Title?
            if (todo.opt.focusOnTitle){

                setTimeout(function(){

                    todo.$ui.find("div.jquery-todolist-title")
                        .find(".jquery-todolist-title-text")
                            .click()
                            .end()
                        .find("input")
                            .select();

                }, 500);

            }

            return this;

        }); //end: this.each()

        return returnValue;

    }; //end: $.fn.todolist

}));
