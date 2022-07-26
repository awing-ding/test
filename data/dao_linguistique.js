//comment ca je copie ton système comme un gros porc ?
const db = require('./sqlite_connection');

var dao_linguistique = function(){

    this.addProposition = async function(args) {
        return new Promise(async function(resolve,reject){
            const query = "INSERT INTO proposition VALUES (?,?,?,?,?,?,?,?,?)"
            db.run(query,[args.id, args.instigateur, args.francais, args.pierrick, args.phonetique, args.commentaire, args.definition, args.etymologie, args.type],(err)=>{
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
                else if(row.id = id) resolve(True);
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
        //le résultat est dans la clé 'COUNT(*)'
        return new Promise(async function(resolve, reject){
            const query = "SELECT COUNT(*) AS count FROM suggestion"
            db.get(query, (err, rows) => {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }

}
const dao = new dao_linguistique();
module.exports = dao;