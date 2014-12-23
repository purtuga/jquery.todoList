( function($) {
    /*
     ======== A Handy Little QUnit Reference ========
     http://api.qunitjs.com/

     Test methods:
     module(name, {[setup][ ,teardown]})
     test(name, callback)
     expect(numberOfAssertions)
     stop(increment)
     start(decrement)
     Test assertions:
     ok(value, [message])
     equal(actual, expected, [message])
     notEqual(actual, expected, [message])
     deepEqual(actual, expected, [message])
     notDeepEqual(actual, expected, [message])
     strictEqual(actual, expected, [message])
     notStrictEqual(actual, expected, [message])
     throws(block, [expected], [message])
     */

    module('jQuery#todoList', {
        // This will run before each test in this module.
        setup : function() {
            this.elems = $('#qunit-fixture').children();
        }
    });

    test('is chainable', function() {
        expect(1);
        // Not a bad test to run on collection methods.
        strictEqual(this.elems.todoList(), this.elems, 'should be chainable');
    });

    test('Creates widget with defaults', function(){

        this.$wdg = this.elems.filter("#todolist").todoList();
        var $wdg = this.$wdg;


        ok(this.$wdg.hasClass("has-jquery-todolist"), "Container class indicator");

        ok(this.$wdg.children().length === 1, "Container has only 1 child");

        ok(this.$wdg.children(".jquery-todolist").length === 1, "Found wdg UI container");

        ok(this.$wdg.find(".jquery-todolist-title-text").length === 1, "Found wdg title container");

        ok(this.$wdg.find(".jquery-todolist-items > *").length === 0, "has no todo items");

        equal(
            this.$wdg.find(".jquery-todolist-title-text").text(),
            "Todo List",
            "Wdg title ok"
        );

        equal(
            this.$wdg.find("input.jquery-todolist-add-input-text").attr("placeholder"),
            "New Item",
            "new item label ok"
        );

        ok($wdg.find(".jquery-todolist-action-edit[title!='Click to Edit']").length === 0, "Edit labels ok");

    });

    test('Validate Input parameters', function(){

        this.$wdg = this.elems.filter("#todolist")
                    .todoList({
                        title: "title test",
                        removeLabel: "remove test",
                        newItemPlaceholder: "new item test",
                        items: [
                            "one item test"
                        ]
                    });

        // Todo list title
        equal(this.$wdg.find(".jquery-todolist-title-text").text(), "title test", "Title was set correctly");

        // Add new placeholder text
        equal(this.$wdg.find(".jquery-todolist-add input").attr("placeholder"), "new item test", "new item placeholder ok");

        this.$item1 = this.$wdg.find(".jquery-todolist-item").eq(0);
        ok(
            this.$item1.find(".jquery-todolist-item-action-remove").length,
            "Found item remove button"
        );

        this.$item1.find(".jquery-todolist-item-action-remove").click();
        equal(this.$item1.find(".jquery-todolist-button-confirm").text(), "remove test", "remove label ok");

    });

    test('Initialized twice on same element does nothing', function(){

        this.$wdg = this.elems.filter("#todolist")
                        .addClass("has-jquery-todolist")
                        .todoList();

        ok(this.$wdg.children().length === 0, "Container has no children");

    });

    test('Creates widget predefined with items on input', function(){

        this.todoListItems = [
            "Item 1 is a string",
            {
                title: "item 2 was in an object"
            },
            {
                title: "item 3 was in object and DONE",
                done: true
            }
        ];
        this.$wdg = this.elems.filter("#todolist")
                        .todoList({
                            items: this.todoListItems
                        });

        ok(
            this.$wdg.find(".jquery-todolist-item").length === 3,
            "Created correct number of items"
        );

        ok(
            this.$wdg.find(".jquery-todolist-item.jquery-todolist-item-done").index() === 2,
            "3rd item was marked done"
        );

    });


    test('Item Level Actions', function(){

        expect(27);

        this.todoListItems = [
            "Item 1 is a string",
            {
                title: "item 2 was in an object"
            },
            {
                title: "item 3 was in object and DONE",
                done: true
            }
        ];
        this.$wdg = this.elems.filter("#todolist")
                        .todoList({
                            items: this.todoListItems
                        });

        // CHECK / UNCHECK ITEM
        this.$item1 = this.$wdg.find(".jquery-todolist-item").eq(0);
        ok(!this.$item1.is(".jquery-todolist-item-done"),"Item 1 is not DONE");

        this.$wdg.one("todolist-change", function(){
            ok(true, "todolist-change triggered on item check");
        });

        this.$wdg.one("todolist-checked", function(){
            ok(true, "todolist-checked triggered");
        });


        this.$item1.find(".jquery-todolist-item-checkbox").click();
        ok(
            this.$item1.is(".jquery-todolist-item-done"),
            "Clicking checkbox icon marks item done"
        );

        this.$item1.find(".jquery-todolist-item-checkbox").click();
        ok(
            !this.$item1.is(".jquery-todolist-item-done"),
            "Clicking checkbox icon again marks item NOT done"
        );

        this.$wdg.one("todolist-change", function(){
            ok(true, "todolist-change triggered on item uncheck");
        });

        this.$wdg.one("todolist-unchecked", function(){
            ok(true, "todolist-checked triggered");
        });

        // EDIT ITEM TITLE
        this.$item1Title = this.$item1.find(".jquery-todolist-item-title");
        ok(
            !this.$item1Title.find(".jquery-todolist-edit").length,
            "item 1 title is not in EDIT mode"
        );

        this.$item1Title.click();
        ok(
            this.$item1Title.find(".jquery-todolist-edit").length,
            "Clicking item 1 title inserts EDIT form"
        );

        ok(
            this.$item1Title.find("input").length,
            "Item title edit form has Input field"
        );

        ok(
            this.$item1Title.find(".jquery-todolist-edit-save").length,
            "Item title edit form has save icon"
        );

        this.$wdg.one("todolist-change", function(){
            ok(true, "todolist-change triggered on item edit");
        });

        this.$wdg.one("todolist-edit", function(){
            ok(true, "todolist-edit triggered");
        });

        this.$item1Title.find("input").val("Item 1 is a string -- edited!");
        this.$item1Title.find(".jquery-todolist-edit-save").click();
        ok(
            !this.$item1Title.find(".jquery-todolist-edit").length,
            "Clicking item 1 title edit form save icon, removes edit form"
        );

        equal(
            this.$item1Title.find(".jquery-todolist-item-title-text").text(),
            "Item 1 is a string -- edited!",
            "Item 1 title was updated successful"
        );

        this.$item1Title.click();
        this.$item1Title.find("input").val("Item 1 is a string -- edited 2!");
        $("body").click();

        ok(
            !this.$item1Title.find(".jquery-todolist-edit").length,
            "Clicking outside of item 1 title edit form, closes edit form"
        );

        equal(
            this.$item1Title.find(".jquery-todolist-item-title-text").text(),
            "Item 1 is a string -- edited 2!",
            "Clicking outside of item 1 title edit form saved value"
        );


        // DELETE ITEM
        ok(
            this.$item1.find(".jquery-todolist-item-action-remove").length,
            "Item 1 has a delete icon"
        );

        this.$item1.find(".jquery-todolist-item-action-remove").click();
        ok(
            this.$item1.find(".jquery-todolist-item-action-remove-confirmed").length,
            "Clicking item 1 Delete icon, show confirmation button"
        );
        ok(
            this.$item1.find(".jquery-todolist-item-action-remove-cancel").length,
            "Clicking item 1 Delete icon, show confirmation cancel button"
        );

        this.$item1.find(".jquery-todolist-item-action-remove-cancel").click();
        ok(
            !this.$item1.find(".jquery-todolist-item-action-remove-confirmed").length,
            "Clicking Delete cancel button removes confirmation from item 1"
        );

        this.$item1.find(".jquery-todolist-item-action-remove").click();
        this.$item1.find(".jquery-todolist-item-action-remove-confirmed").click();
        stop(); // Delete uses animation
        var me = this;
        this.$item1.promise().then(function(){
            start();
            ok(
                !$.contains(me.$wdg.get(0), me.$item1.get(0)),
                "Item 1 removed from list when delete button is clicked"
            );
        });


        // ADD ITEMS
        this.$addCntr = this.$wdg.find(".jquery-todolist-add");
        this.$addInput = this.$addCntr.find("input");
        this.$addButton = this.$addCntr.find(".jquery-todolist-add-action");

        ok(
            this.$addInput.length,
            "Add New item has input element"
        );
        ok(
            this.$addButton.length,
            "Add New item area has Add button"
        );

        this.itemCount = this.$wdg.find(".jquery-todolist-item").length;
        this.$addButton.click();

        equal(
            this.itemCount,
            this.$wdg.find(".jquery-todolist-item").length,
            "Clicking add with nothing in input field - does nothing"
        );

        this.$wdg.one("todolist-change", function(){
            ok(true, "todolist-change triggered on item delete");
        });

        this.$wdg.one("todolist-add", function(){
            ok(true, "todolist-add triggered");
        });

        this.$addInput.val("Added a new item");
        this.$addButton.click();

        equal(
            (this.itemCount + 1),
            this.$wdg.find(".jquery-todolist-item").length,
            "Added a new item using button"
        );

    });


    test('Todo List Title actions', function(){

         this.todoListItems = [
            "Item 1 is a string",
            {
                title: "item 2 was in an object"
            },
            {
                title: "item 3 was in object and DONE",
                done: true
            }
        ];
        this.$wdg = this.elems.filter("#todolist")
                        .todoList({
                            title: "My TODO",
                            items: this.todoListItems
                        });

        this.$title = this.$wdg.find(".jquery-todolist-title");
        equal(
            this.$title.find('.jquery-todolist-title-text').text(),
            "My TODO",
            "list title ok"
        );

        this.$title.find(".jquery-todolist-title-text").click();
        ok(
            this.$title.find(".jquery-todolist-edit").length,
            "Clicking todo list title inserts edit form"
        );

        ok(
            this.$title.find("input").length,
            "Item title edit form has Input field"
        );

        ok(
            this.$title.find(".jquery-todolist-edit-save").length,
            "Item title edit form has save icon"
        );

        this.$title.find("input").val("My TODO -- edited!");
        this.$title.find(".jquery-todolist-edit-save").click();
        ok(
            !this.$title.find(".jquery-todolist-edit").length,
            "Clicking title edit form Save icon, removes edit form"
        );

        equal(
            this.$title.find(".jquery-todolist-title-text").text(),
            "My TODO -- edited!",
            "todo list title was updated successful using save icon"
        );

        this.$title.find(".jquery-todolist-title-text").click();
        this.$title.find("input").val("My TODO -- edited 2!");
        $("body").click();
        equal(
            this.$title.find(".jquery-todolist-title-text").text(),
            "My TODO -- edited 2!",
            "todo list title was updated successful when clicking outise of edit form"
        );

    });

    test('List level actions', function(){

        this.todoListItems = [
            "Item 1 is a string",
            {
                title: "item 3 was in object and DONE",
                done: true
            },
            {
                title: "item 2 was in an object"
            }
        ];
        this.$wdg = this.elems.filter("#todolist")
                        .todoList({
                            title: "My TODO",
                            items: this.todoListItems
                        });

        this.$title = this.$wdg.find(".jquery-todolist-title");

        ok(
            this.$title.find(".jquery-todolist-menu-show").length,
            "list has Actions button"
        );

        ok(
            !this.$wdg.find(".jquery-todolist-menu").length,
            "list initially has no menu"
        );

        this.$title.find(".jquery-todolist-menu-show").click();
        ok(
            this.$wdg.find(".jquery-todolist-menu:visible").length,
            "todo list menu is shown on button click"
        );


        // show/hide done
        this.$menu = this.$wdg.find(".jquery-todolist-menu:visible");
        this.$menuItemDoneToggle = this.$menu.find("[data-todolistaction='toggle done']");
        this.$item2 = this.$wdg.find(".jquery-todolist-item").eq(1);

        ok(this.$menuItemDoneToggle, "menu has Show/Hide done");

        ok(
            this.$item2.is(":visible") && this.$item2.is(".jquery-todolist-item-done"),
            "item is is done and visible"
        );

        this.$menuItemDoneToggle.click();

        ok(!this.$menuItemDoneToggle.is(":visible"), "clicking show/hide done hides menu");

        ok(!this.$item2.is(":visible"), "clicking show/hide done hides DONE items");

        this.$title.find(".jquery-todolist-menu-show").click();
        this.$menuItemDoneToggle.click();
        ok(this.$item2.is(":visible"), "clicking show/hide done again SHOWs DONE items");

    });


    test('Methods', function(){

        this.todoListItems = [
            "Item 1 is a string",
            {
                title: "item 2 was in an object"
            },
            {
                title: "item 3 was in object and DONE",
                done: true
            }
        ];
        this.$wdg = this.elems.filter("#todolist")
                        .todoList({
                            title: "My TODO",
                            items: this.todoListItems
                        });


        // GETSETUP
        this.getSetupReturnValue = this.$wdg.todoList("getSETUP");

        ok(typeof this.getSetupReturnValue === "object", "getSetup() returned object");

        ok(typeof this.getSetupReturnValue.title === "string", "getSetup() Object has title");

        equal(this.getSetupReturnValue.title, "My TODO", "Title value is OK");

        ok($.isArray(this.getSetupReturnValue.items), "getSetup() Object has items");

        equal(this.getSetupReturnValue.items.length, 3, "getSetup() items has correct amount");

        ok($.isPlainObject(this.getSetupReturnValue.items[0]), "getSetup() Items are formatted as objects");

        equal(
            this.getSetupReturnValue.items[0].title,
            "Item 1 is a string",
            "getSetup() Each item has a title property"
        );

        equal(
            this.getSetupReturnValue.items[0].done,
            false,
            "getSetup() Each item has a done property"
        );

    });

}(jQuery));
