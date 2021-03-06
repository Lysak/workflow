import mongoose from "mongoose";

import config from '../../etc/config.json';

import '../models/Note';

const Note = mongoose.model('Note');

mongoose.Promise = global.Promise; // about promice: panding fullfill rejected

export function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`, {useMongoClient: true});
}

export function listNotes(id) {
    return Note.find(); // all notes
}

export function createNote(data) {
    const note = new Note({
        title: data.title,
        text: data.text,
        color: data.color,
        createdAt: new Date()
    });

    return note.save();
}

export function updateNote(id, data) {
    let _id = data._id ? data._id : id; 
    return Note.findById(_id, function(err, updateData){
        if (err) {
            return null;
        } else {
            let oldText = data.text;
            updateData.text = data.text;
            return  new Note(updateData).save();
        };
    });
}

export function deleteNote(id) {
    return Note.findById(id).remove();
}
