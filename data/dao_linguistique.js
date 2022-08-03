//comment ca je copie ton système comme un gros porc ?
const db = require('./sqlite_connection');

var dao_linguistique = function(){

    this.addProposition = async function(args) {
        return new Promise(async function(resolve,reject){
            const query = "INSERT INTO proposition VALUES (?,?,?,?,?,?,?,?,?,?,?,?)"
            db.run(query,[args.id, args.instigateur, args.francais, args.pierrick, args.phonetique, args.commentaire, args.definition, args.etymologie, args.class, args.type, args.cyrilic, args.hangeul],(err)=>{
                if(err) reject(err);
                resolve();
            });
        });
    }

    this.isPropositionIdTaken = async function(id) {
        return new Promise(async function(resolve,reject){
            const query = "SELECT * FROM proposition WHERE id = ?"
            db.each(query,[id],(err,row)=>{
                if(err) reject(err);
                else if(row.id == id) resolve(true);
            });
        });
    } 

    this.lookToProposition = async function(offset) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM suggestion LIMIT 1 OFFSET ?"
            db.all(query,[offset], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            }); 
        });
    }  

    this.countProposition = async function() {
        //le résultat est dans la clé 'count'
        return new Promise(async function(resolve, reject){
            const query = "SELECT COUNT(*) AS count FROM suggestion"
            db.get(query, (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    this.validateAddition = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "INSERT INTO dictionnaire (francais, pierrick, phonetique, commentaire, definition, étmologie) VALUES (SELECT francais, pierrick, phonetique, commentaire, definition, etymologie FROM suggestion WHERE id = ?)"
            db.run(query, [id], (err) => {
                if (err) reject(err);
                resolve();
            });
        });
    }

    this.purgeProposition = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "DELETE FROM suggestion WHERE id = ?"
            db.run(query, [id], (err) => {
                if (err) reject(err);
                resolve;
            });
        });
    }

    this.rejectProposition = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "DELETE FROM suggestion WHERE id = ?"
            db.run(query, [id], (err) => {
                if (err) reject(err);
                resolve;
            });
        });
    }

    this.getPropositionById = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM suggestion WHERE id = ?"
            db.get(query, [id], (err, rows) =>{
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    this.isIdValidWord = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE id = ?"
            db.get(query, [id], (err, rows) => {
                if(err) reject(err);
                else if (rows.id == id) resolve(true);
            });
        });
    }

    this.isIdValidSuggestion = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM suggestion WHERE id = ?"
            db.get(query, [id], (err, rows) => {
                if(err) reject(err);
                else if (rows.id == id) resolve(true);
            });
        });
    }

    this.editWord = async function(id, values) {
        return new Promise(async function(resolve, reject){
            const query = "UPDATE dictionnaire \
                            SET francais = ?, pierrick = ?, phonétique = ?, classe = ?,\
                            commentaire = ?, définition = ?, étymologie = ?, cyrilic = ?, hangeul = ?\
                            WHERE id = ?"
            db.run(query, [values.francais, values.pierrick, values.phonétique, values.classe, values.commentaire, values.définition, values.étymologie, values.cyrilic, values.hangeul, id], (err) => {
                if(err) reject(err);
                else resolve();
            });
        });
    }

    this.getWord = async function(id) {
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE id = ?"
            db.get(query, [id], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

    this.searchByFrench = async function(mot){
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE soundexprk(francais) = soundexprk(?)";
            db.all(query, [mot], (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }
}
const dao = new dao_linguistique();
module.exports = dao;