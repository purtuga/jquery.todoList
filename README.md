# Todolist

A simple todo list plugin. Demo here: __http://purtuga.github.io/jquery.todoList/__

## Getting Started
Download the plugin from the [Release page][rel]. Plugin is located in the `dist` folder. It currently depends on jQuery and jQuery UI Themes.

[rel]: https://github.com/purtuga/jquery.todoList/releases

In your web page:

```html
<link rel="stylesheet" href="//code.jquery.com/ui/1.10.0/themes/ui-lightness/jquery-ui.css">

<script src="jquery.js"></script>
<script src="dist/todoList.min.js"></script>
<script>
    jQuery(function($) {
        $("#your_element").todoList();
    });
</script>
```

## Documentation
jQuery.todoList Creates a todo list on the the given set of jQuery elements. Each todo list support the user adding items to it, marking items complete as well as hidding the completed items.  It currently uses jQuery UI's themes for part of its styling.


### Usage

    $("#your_element").todoList();


### Options

jQuery.todoList accepts as input an object containing the supported options below.

-   `title` : (_Type: String, Optional, Default: `Todo List`_) The title for the todo list.
-   `items` : (_Type: Array&lt;String&gt;|Array&lt;Object&gt;, Optional, Default: `[]`_) An array of items for the todo list. The content of the array can be either a String or an Object containing at least a `title` attribute (String) and optional a `done` attribute (Boolean) indicating if the task is done.
-   `removeLabel` : (_Type: String, Optional, Default: `delete?`_) The title for item delete button.
-   `newItemPlaceholder` : (_Type: String, Optional, Default: `New Item`_) The placeholder text for the new item input field
-   `editItemTooltip` : (_Type: String, Optional, Default: `Click to Edit`_) The tooltip shown when hovering over an item that can be edited.
-   `focusOnTitle` : (_Type: Boolean, Optional, Default: false_) If set to true, the Todo List Title will be shown in Edit mode with its text selected.
-   `customActions` : (_Type: Array, Optional, Default: null_) An Array of Objects with additional items to be displayed on the todolist menu. Each object must define at least two properties: `title` - the title of the menu item. `action` - a function that will be called when clicked.
    Example:

        customActions: [
            {
                title: "Delete Todo List",
                action: function(originalOptions, thisCustomActionObject){
                    // this = original selector
                }
            }
        ]


Example:

    $("#your_element").todoList({
        title: "Todo List",
        items: [
            "task 1",
            {
                title: "task 2",
                done:   true
            },
            {
                title: "task 3"
            }
        ]
    });

### Methods

Methods are called by specifing the method name as input to the `$().todoList()` method. The following methods are support in interacting with this plugin:

-   `getSetup` : Returns an object with that represents the current todo list setup.

        var todoListSetup = $("#your_element").todoList("getSetup");

        // Would return:
        {
            title: "Todo List",
            items: [
                {
                    title:  "task 1",
                    done:   false
                },
                {
                    title:  "task 2",
                    done:   true
                },
                {
                    title:  "task 3",
                    done:   false
                }
            ]
        }

### Events
Events are triggered on the element where the todolist was inserted. Event listners can be bound using jQuery. Example:

    $("#your_element").on("todolist-add-item", function(ev, options, $ui){

        // Save the setup
        yourSaveMethod($ui.todoList("getSetup"));

    });

All events will provide 3 input arguments to the listners:

-   `ev` - jQuery Event object
-   `options` - An object with the original options given to the plugin
-   `$ui` - A jQuery object of the original element the widget was bound to.

The following Events can be listen to:

-   `todolist-change` : Triggered when something has changed. Will be triggered along with other events.
-   `todolist-add` : Triggered when an item is added to the todo list. Will be suppressed during initialization.
-   `todolist-remove` : Triggered when an item is removed from the list.
-   `todolist-edit` : Triggered when an item or the list title is edited.
-   `todolist-checked` : Triggered when an item is checked.
-   `todolist-unchecked` : Triggered when an item is un-checked.


## Release History

-   **1.0.0** : First version of plugin.


