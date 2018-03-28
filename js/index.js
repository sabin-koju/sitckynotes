if (JSON.parse(localStorage.getItem("noteList"))) {
    var noteList = JSON.parse(localStorage.getItem("noteList"));
} else {
    var noteList = [];
}

var Note = function (title, details){
    this.title = title;
    this.details = details;
};

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
                        
            // user input
            inputTitle = document.getElementById('note-title').value;
            inputDetails = document.getElementById('note-details').value;
            
            // creating new object
            var note1 = new Note(inputTitle,inputDetails);

            // notelist array push new note object
            noteList.push(note1);

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
        let latestNoteList = JSON.parse(localStorage.getItem("noteList"));

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
        clickOutsideModal();  //listner for click outside

        document.getElementById('cancel-button').addEventListener('click', function () {
            document.getElementById('modal-container').innerHTML = "";
        });
        document.getElementById('update-button').addEventListener('click', function () {
            //get old data
            console.log("this is selected id = ", id);

            //get user input
            title = document.getElementById('note-title').value;
            details = document.getElementById('note-details').value;
            document.getElementById('modal-container').innerHTML = "";

            // creating new object
            var note1 = new Note(title, details);

            //save to local storage
            latestNoteList[id].title = title;
            latestNoteList[id].details = details;
            localStorage.setItem('noteList', JSON.stringify(latestNoteList));

            //update to html           
            let selectedh2 = "#a" + id + " h2";
            let selectedP = "#a" + id + " p";
            document.querySelector(selectedh2).innerHTML = title;
            document.querySelector(selectedP).innerHTML = details;
        });
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

    //edit notes and menu logics
    function addListnerNotes() {
        document.querySelectorAll(".note-block").forEach(function (el) {
            // even listner for notes for editing
            el.addEventListener('click', function (e) {
                e.preventDefault();
                onUpdateNoteClick(this.id);
            }, false);
            //event listner for notes for context menu
            el.addEventListener('contextmenu', function (e) {
                let selectedNoteId = this.id;
                e.preventDefault();
                appendMenu();

                document.getElementById('updateMenu').addEventListener('click', function (e) {
                    e.preventDefault();
                    onUpdateNoteClick(selectedNoteId);
                    document.getElementById('menuContainer').innerHTML = "";
                });
                document.getElementById('deleteMenu').addEventListener('click', function (e) {
                    e.preventDefault();
                    onDeleteNoteClick(selectedNoteId);
                    document.getElementById('menuContainer').innerHTML = "";
                });
                document.querySelector('.menu').style.left = e.pageX + 'px';
                document.querySelector('.menu').style.top = e.pageY + 'px';
                clickOutsideMenu();
            });

            window.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            })
        });
    }

    //menu
    function onDeleteNoteClick(id) {
        let newid = id.charAt(1);
        let latestNoteList = JSON.parse(localStorage.getItem("noteList"));
        //delete selected id
        latestNoteList.splice(newid, 1);
        localStorage.setItem('noteList', JSON.stringify(latestNoteList));
        location.reload();
    }

    //append menu to notes
    function appendMenu() {
        document.getElementById('menuContainer').innerHTML = "";
        var html = "<div class=\"menu\">\n" +
            "        <div class=\"menu-option\" id=\"updateMenu\">Update</div>\n" +
            "        <div class=\"menu-option\" id=\"deleteMenu\">Delete</div>\n" +
            "</div>\n";
        var menuBase = document.createElement('div');
        menuBase.innerHTML = html;
        document.getElementById('menuContainer').appendChild(menuBase);
    }

    //menu clickoutside
    function clickOutsideMenu() {
        //menu event
        document.querySelector('body').addEventListener('click', function () {
            document.getElementById('menuContainer').innerHTML = "";

        });
        document.querySelector('.menu').addEventListener('click', function (e) {
            e.stopPropagation();
        });
    }

    // check if local notes exist on sotrage
    function checkNotesLocal() {
        localNotes = JSON.parse(localStorage.getItem("noteList"));
        if (localNotes) {
            for (i = 0; i < localNotes.length; i++) {
                // console.log(localNotes[i]);
            }
        }
    }

    //append notes to html logics
    function notesCreate(data) {
        const NOTE_UL = document.getElementById('note-ul');
        //appending notes element to html
        for (i = 0; i < data.length; i++) {
            var new_li = document.createElement("li");
            var new_a = document.createElement("a");
            var new_h2 = document.createElement("h2");
            var new_p = document.createElement("p");

            new_li.setAttribute("id", "a" + i);
            new_li.setAttribute("draggable", "true");
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

    //drag and drop notes
    var dragSrcEl = null;
    function handleDragStart(e) {
        // Target (this) element is the source node.
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);
        this.classList.add('dragElem');
    }
    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // Necessary. Allows us to drop.
        }
        this.classList.add('over');
        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
        return false;
    }
    function handleDragEnter(e) {
        // this / e.target is the current hover target.
    }
    function handleDragLeave(e) {
        this.classList.remove('over');  // this / e.target is previous target element.
    }
    function handleDrop(e) {
        // this/e.target is current target element.
        if (e.stopPropagation) {
            e.stopPropagation(); // Stops some browsers from redirecting.
        }
        // Don't do anything if dropping the same column we're dragging.
        if (dragSrcEl != this) {
            this.parentNode.removeChild(dragSrcEl);
            var dropHTML = e.dataTransfer.getData('text/html');
            this.insertAdjacentHTML('beforebegin', dropHTML);
            var dropElem = this.previousSibling;
            addDnDHandlers(dropElem);
        }
        this.classList.remove('over');

        //save to local storage after drop
        let localStorageNoteList = JSON.parse(localStorage.getItem("noteList"));
        let domNoteList = [];
        var x = document.querySelectorAll('.note-block');
        for (let i = 0; i < localStorageNoteList.length; i++) {
            let newtitle = x[i].querySelector('h2').innerHTML;
            let newdetail = x[i].querySelector('p').innerHTML;
            // save to local storage
            let note1 = new Note(newtitle, newdetail);
            domNoteList.push(note1);
        }
        localStorage.setItem('noteList', JSON.stringify(domNoteList));
        location.reload();
        return false;
    }
    function handleDragEnd(e) {
        // this/e.target is the source node.
        this.classList.remove('over');
    }
    function addDnDHandlers(elem) {
        elem.addEventListener('dragstart', handleDragStart, false);
        elem.addEventListener('dragenter', handleDragEnter, false)
        elem.addEventListener('dragover', handleDragOver, false);
        elem.addEventListener('dragleave', handleDragLeave, false);
        elem.addEventListener('drop', handleDrop, false);
        elem.addEventListener('dragend', handleDragEnd, false);
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
        var cols = document.querySelectorAll('#note-ul .note-block');
        [].forEach.call(cols, addDnDHandlers);
    }
    main();
})();