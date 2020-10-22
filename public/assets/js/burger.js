$(function() {
    $(".change-devour").on("click", function(event) {
        let id = $(this).data("id"); // setting id to burger id from db
        let devouredVariable = $(this).data("devouredvariable");

        const latestDevouredState = { devoured: devouredVariable };

        // Send PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: latestDevouredState
        }).then(function() {
            console.log("changed devoured to", devouredVariable);

            location.reload(); // Reload page for updates list
        });
    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        let newBurger = {
            burger_name: $("#burger-name").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim() // TODO: Check what this is doing; needs to output boolean. Does this need to be changed for radio buttons to work?
        };

        // Send POST requrest
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("Created a new burger");

            location.reload();
        });
    });

    $(".delete-burger").on("click", function(event) {
        let id = $(this).data("id");

        // Send DELETE request
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(function() {
            console.log("deleted burger with id of", id);

            location.reload();
        });
    });
});