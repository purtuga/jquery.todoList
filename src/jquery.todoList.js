(function($){

    var setup = {};

    setup.listTemplate = '<div class="jquery-todolist ui-widget">' +
            '<div class="jquery-todolist-title ui-widget-header">Todo List</div>' +
            '<div class="jquery-todolist-items"></div>' +
            '<div class="jquery-todolist-footer  ui-widget-content">' +
                '<div class="jquery-todolist-float-cntr">' +
                    '<span class="jquery-todolist-add-input">' +
                        '<input class="jquery-todolist-add-input-text" placeholder="New Item" type="text" name="j" name="j" value="" />' +
                    '</span>' +
                    '<a class="jquery-todolist-action jquery-todolist-add-action ui-state-default" href="javascript:">+</a>' +
                '</div>' +
            '</div>' +
        '</div>';

    setup.itemTemplate = '<div class="jquery-todolist-item ui-widget-content">' +
            '<div class="jquery-todolist-float-cntr">' +
                '<span class="jquery-todolist-item-actions jquery-todolist-item-actions-left jquery-todolist-floatLeft ui-state-default">' +
                    '<span class="jquery-todolist-action jquery-todolist-item-checkbox">&#9744;</span>' +
                '</span>' +
                '<span class="jquery-todolist-item-title jquery-todolist-floatLeft "></span>' +
                '<span class="jquery-todolist-item-actions jquery-todolist-item-actions-right ui-state-error">' +
                    '<span class="jquery-todolist-action jquery-todolist-item-action-remove">&times;</span>' +
                '</span>' +
            '</div>' +
        '</div>';

    setup.styles = '';


    $.fn.todoList = function(options){

        return this.each(function(){

            var
            $this   = $(this),
            todo    = {

                opt: $.extend({}, {
                            title: "Todo List",
                            items: []
                        },
                        options),

                /**
                 * Adds an item to the todo list
                 *
                 * @param {String} itemContent
                 *
                 * @return {jQuery}
                 *      the item created.
                 */
                addItem: function(itemContent){

                    return $(setup.itemTemplate)
                        .find(".jquery-todolist-item-title")
                            .append(itemContent)
                            .end()
                        .appendTo(todo.$ui.$items);

                },

                /**
                 * Setups up the references on todo.$ui to other UI elements.
                 */
                setupjQueryReferences: function(){

                    todo.$ui.$items = todo.$ui.find("div.jquery-todolist-items");
                    todo.$ui.$newItemInput = todo.$ui.find("input.jquery-todolist-add-input-text");
                    todo.$ui.$addButton = todo.$ui.find(".jquery-todolist-add-action");

                }

            }; //end: todo instance

            // If this item already has a jquery-todolist,
            // then parse its content and skip the UI setup
            if (!$this.hasClass("has-jquery-todo-list")) {

                todo.$ui = $(setup.listTemplate)
                            .find(".jquery-todo-title")
                                .html(todo.opt.title)
                                .end();
                todo.setupjQueryReferences();

                // If there are items defined on input, create them
                if ($.isArray(todo.opt.items)) {

                    $.each(todo.opt.items, function(i,item){

                        todo.addItem(item);

                    });

                }

                // insert into DOM
                $this.empty().append(todo.$ui).addClass("has-jquery-todo-list");

            // ELSE: UI must already be present... rebuild wiget
            } else {

                todo.$ui = $this.find(".jquery-todolist").eq(0);
                todo.setupjQueryReferences();

            }

            // Check if we already initialized this DOM object
            if (!this.jqueryTodoListInitDone) {

                this.jqueryTodoListInitDone = true;

                // Bind CLICK event handler
                todo.$ui.on("click.jqueryTodoList", ".jquery-todolist-action", function(){

                    console.log("clicked on TODO list");

                    var $this   = $(this),
                        tmp1;

                    // ADD NEW ITEM
                    if ($this.is(todo.$ui.$addButton)) {

                        tmp1 = todo.$ui.$newItemInput.val();

                        if (tmp1) {

                            todo.addItem(tmp1);

                        }

                        todo.$ui.$newItemInput.val("");
                        todo.$ui.$newItemInput.focus();

                    // REMOVE ITEM
                    } else if ($this.is(".jquery-todolist-item-action-remove")) {

                        $this.closest(".jquery-todolist-item")
                            .slideUp().promise().then(function(){

                                $(this).remove();

                            });

                    // MARK CHECKED/UNCHECKED
                    } else if ($this.is(".jquery-todolist-item-checkbox")) {

                        tmp1 = $this.closest(".jquery-todolist-item");

                        if (tmp1.hasClass("jquery-todolist-item-done")) {

                            tmp1.removeClass("jquery-todolist-item-done");

                        } else {

                            tmp1.addClass("jquery-todolist-item-done");

                        }

                    }

                });

                // Bind add input ENTER key handler
                todo.$ui.$newItemInput.on("keyup", function(ev){

                    if (ev.which === 13) {

                        todo.$ui.$addButton.click();

                    }

                });

            } //end: is this.jqueryTodoListInitDone?

            return this;

        }); //end: this.each()

    }; //end: todoList

})(jQuery);
