if (JSON.parse(localStorage.getItem("noteList"))) {
    var noteList = JSON.parse(localStorage.getItem("noteList"));

} else {
    var noteList = [];
}

(function () {
    // create note
    function onCreateNoteClick() {
        var html = "<div class=\"modal-container\">\n" +
            "    <section class=\"create-modal\">\n" +
            "        <div class=\"form-group title\">\n" +
            "            <label class=\"sr-only\">Title</label>\n" +
            "            <input type=\"text\" placeholder=\"Title...\" class=\"form-control\" id='note-title'>\n" +
            "        </div>\n" +
            "        <div class=\"form-group\">\n" +
            "            <label class=\"sr-only\">Content</label>\n" +
            "            <textarea type=\"text\" placeholder=\"Content...\" class=\"form-control\" id='note-details' rows='5'></textarea>\n" +
            "        </div>\n" +
            "        <div class=\"form-group action-btn\">\n" +
            "            <button class=\"btn btn-primary \" id='cancel-button'>Cancel</button>\n" +
            "            <button class=\"btn btn-primary\" id='save-button'>Save</button>\n" +
            "        </div>\n" +
            "    </section>\n" +
            "</div>";

        document.getElementById('modal-container').innerHTML = html;
        clickOutsideModal();

        document.getElementById('cancel-button').addEventListener('click', function () {
            document.getElementById('modal-container').innerHTML = "";
        });
        document.getElementById('save-button').addEventListener('click', function () {
            // creating new object
            var notes = new Object();

            notes.title = document.getElementById('note-title').value;
            notes.details = document.getElementById('note-details').value;

            // notelist array push new note object
            noteList.push(notes);

            //close modal
            // document.getElementById('modal-container').innerHTML = "";
            location.reload();

            //save to local storage
            localStorage.setItem('noteList', JSON.stringify(noteList));
        });
    }

    //update note
    function onUpdateNoteClick(id) {
        id = id.charAt(1);
        var latestNoteList = JSON.parse(localStorage.getItem("noteList"));

        var html = "<div class=\"modal-container\">\n" +
            "    <section class=\"create-modal\">\n" +
            "        <div class=\"form-group title\">\n" +
            "            <label class=\"sr-only\">Title</label>\n" +
            "            <input type=\"text\" placeholder=\"Title...\" class=\"form-control\" id='note-title' value=" + latestNoteList[id].title + ">\n" +
            "        </div>\n" +
            "        <div class=\"form-group\">\n" +
            "            <label class=\"sr-only\">Content</label>\n" +
            "            <textarea type=\"text\" placeholder=\"Content...\" class=\"form-control\" id='note-details' rows='5'>" + latestNoteList[id].details + "</textarea>\n" +
            "        </div>\n" +
            "        <div class=\"form-group action-btn\">\n" +
            "            <button class=\"btn btn-primary \" id='cancel-button'>Cancel</button>\n" +
            "            <button class=\"btn btn-primary\" id='update-button'>Update</button>\n" +
            "        </div>\n" +
            "    </section>\n" +
            "</div>";

        document.getElementById('modal-container').innerHTML = html;
        clickOutsideModal();

        document.getElementById('cancel-button').addEventListener('click', function () {
            document.getElementById('modal-container').innerHTML = "";
        });
        document.getElementById('update-button').addEventListener('click', function () {
            //get old data
            console.log("this is selected id = ", id);

            // creating new object
            var notes = new Object();

            //get user input
            notes.title = document.getElementById('note-title').value;
            notes.details = document.getElementById('note-details').value;
            document.getElementById('modal-container').innerHTML = "";

            //save to local storage
            latestNoteList[id].title = notes.title;
            latestNoteList[id].details = notes.details;
            localStorage.setItem('noteList', JSON.stringify(latestNoteList));

            //update to html           
            let selectedh2 = "#a" + id + " h2";
            let selectedP = "#a" + id + " p";
            document.querySelector(selectedh2).innerHTML = notes.title;
            document.querySelector(selectedP).innerHTML = notes.details;
        });
    }

    //menu
    function openMenu(id) {
        id = id.charAt(1);
        var latestNoteList = JSON.parse(localStorage.getItem("noteList"));

        // var html =
        //     "    <div class=\"menu\">\n" +
        //     "        <span class=\"menu-option\" id=\"updateOption\">\n" +
        //     "        Update </span>\n" +
        //     "        <span class=\"menu-option\" id=\"deleteOption\">\n" + 
        //     "        Delete</span>\n" +
        //     "    </div>";
        // console.log(html);
        // document.getElementById('menu-container').innerHTML = html;
    }

    //append nodes to html logics
    function notesCreate(data) {
        const NOTE_UL = document.getElementById('note-li');
        //appending notes element to html
        for (i = 0; i < data.length; i++) {
            var new_li = document.createElement("li");
            var new_a = document.createElement("a");
            var new_h2 = document.createElement("h2");
            var new_p = document.createElement("p");

            new_li.setAttribute("id", "a" + i);
            let h2_text = document.createTextNode(data[i].title);
            let p_text = document.createTextNode(data[i].details);
            new_p.appendChild(p_text);
            new_h2.appendChild(h2_text);
            new_a.appendChild(new_h2);
            new_a.appendChild(new_p);
            new_li.appendChild(new_a);
            new_li.setAttribute("class", 'note-block');
            var text = NOTE_UL.appendChild(new_li);
        }
    }

    //edit notes logics
    function addListnerNotes() {
        document.querySelectorAll(".note-block").forEach(function (el) {
            // even listner for notes for editing
            el.addEventListener('click', function (e) {
                e.preventDefault();
                onUpdateNoteClick(this.id);
            }, false);
            //event listner for notes for context menu
            el.addEventListener('contextmenu', function (e) {
                e.preventDefault();
                openMenu(this.id);
                document.querySelector('.menu').style.display = 'flex';
                document.querySelector('.menu').style.left = e.pageX + 'px';
                document.querySelector('.menu').style.top = e.pageY + 'px';
                clickOutsideMenu();
            });
        });
    }

    // check if local notes exist on sotrage
    function checkNotesLocal() {
        localNotes = JSON.parse(localStorage.getItem("noteList"));
        if (localNotes) {
            for (i = 0; i < localNotes.length; i++) {
                console.log(localNotes[i]);
            }
        }
    }

    //modal events - close
    function clickOutsideModal() {
        //modal event
        document.querySelector('.modal-container').addEventListener('click', function () {
            document.querySelector('#modal-container').innerHTML = "";
        });
        document.querySelector('.create-modal').addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }
    function clickOutsideMenu(){
        //menu event
        document.querySelector('body').addEventListener('click', function () {
            document.querySelector('.menu').style.display = "none";
        });
        document.querySelector('.menu').addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    //main function
    function main() {
        document.getElementById('add-note').addEventListener('click', onCreateNoteClick);
        checkNotesLocal();
        //create notes and append to html
        if (localNotes) {
            notesCreate(localNotes);
        }
        addListnerNotes();
    }
    main();

})();