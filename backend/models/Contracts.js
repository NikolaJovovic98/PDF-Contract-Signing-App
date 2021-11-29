import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contractSchema = new mongoose.Schema({
    // Onaj koji stvara ugovor
    owner_email : {
        type: Schema.Types.ObjectId,
        required: [true, 'Owner Id missing'],
        ref : 'User'
    },
    // Opis ugovora
    description : {
        type : String,
        required: [true, 'Description is missing'],
        maxlength : 70
    },
    // Ko treba da potpise ugovor
    client_name : {
        type : String,
        required: [true, 'Client Name is missing'],
    },
    // Link do ugovora - stvara se u bekend
    link : {
        type : String,
        required: [true, 'Link is missing'],
    },
    // Put do pdf fajla na serveru - stvara se u bekend
    path_to_pdf : {
        type : String,
        required : [true , 'Path to pdf is missing']
    },
    // Na koju stranu ide potpis
    page_num_to_sign : {
        type : Number,
        required: [true, 'Page number to sign is missing'],
    },
    // Koordinate dje se stavlja potpis
    sign_coordinates : [Number],
    // Da li je potpisan - default nije mijenja se posle
    signed : {
        type : Boolean,
        default : false
    }
}, { timestamps: true });

const Contract = mongoose.model('Contract', contractSchema);

export default Contract;