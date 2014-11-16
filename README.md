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


<img style="max-width: 600px; max-height: 200px; padding: 2px; border: 1px solid #666;" src="data:image/png;base64,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">



### Usage

    $("#your_element").todoList();


### Options

jQuery.todoList accepts as input an object containing the supported options below.

-   `title` : (_Type: String, Optional, Default: `Todo List`_) The title for the todo list.
-   `items` : (_Type: Array&lt;String&gt;|Array&lt;Object&gt;, Optional, Default: `[]`_) An array of items for the todo list. The content of the array can be either a String or an Object containing at least a `title` attribute (String) and optional a `done` attribute (Boolean) indicating if the task is done.
-   `removeLabel` : (_Type: String, Optional, Default: `delete?`_) The title for item delete button.
-   `newItemLabel` : (_Type: String, Optional, Default: `New Item`_) The placeholder text for the new item input field
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


