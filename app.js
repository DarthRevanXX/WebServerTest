const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes");

let command = process.argv[2];

const titleOptions = {
  describe: "Title of note",
  demand: true,
  alias: "t"
};

const bodyOptions = {
  describe: "Body of note",
  demand: true,
  alias: "b"
};

const argv = yargs
  .command("add", "Add a new note", {
    title: titleOptions,
    body: bodyOptions
  })
  .command("list", "List all notes", {})
  .command("remove", "remove noter", {
    title: titleOptions
  })
  .command("read", "Read note", {
    title: titleOptions
  })
  .help().argv;

if (command === "add") {
  let note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log("Note created");
    notes.logNote(note);
  } else {
    console.log("Note title taken");
  }
} else if (command === "list") {
  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach(note => {
    notes.logNote(note);
  });
} else if (command === "read") {
  let noteRead = notes.getNote(argv.title);
  if (noteRead) {
    console.log("Note found");
    notes.logNote(noteRead);
  } else {
    console.log("Note not found");
  }
} else if (command === "remove") {
  let noteRemoved = notes.removeNote(argv.title);
  let message = noteRemoved ? "Note was removed" : "Note not found";
  console.log(message);
} else {
  console.log("Command not recognized");
}
