const db = require('./sqlite_connection_linguistique')


var functions = function(){

    this.soundex = function soundex(input){
        if (input != 'NULL' && isNaN(input)){
            let mot = ""
            mot = mot + input
            mot = mot.toUpperCase();
            mot = mot.trim();
            result = ""
            let regex = {
                AAccent : /Â|Ä|Ā|À/,
                EAccent : /É|È|Ë|Ê/,
                IAccent : /Ï|Î/,
                OAccent : /Ô|Ö|Ō|Ò|Ó/,
                UAccent : /Û|Ü|Ū|Ù|Ú|Y/,
                nullLetters : /A|E|I|O|U|H|W|_\W\s/,
                bilabial : /B|P/,
                velarOcclusive : /C|K|Q/,
                dental : /D|T|Þ|Ð/,
                spirante : /L|Ř/,
                nasale : /M|N/,
                frenchR : /R/,
                paleoAlveolar : /G|J|Š|Ž/,
                alveolar : /X|S|Z/,
                labioDental : /F|V/,
            }
            mot = mot.replace(regex.AAccent, 'A').replace(regex.EAccent, 'E').replace(regex.IAccent, 'I').replace(regex.OAccent, 'O').replace(regex.UAccent, 'U');
            result += mot[0];
            mot = mot.slice(1);
            result += mot.replace(regex.nullLetters, '0').replace(regex.bilabial, '1').replace(regex.velarOcclusive, '2').replace(regex.dental, '3').replace(
                     regex.spirante, '4').replace(regex.nasale, '5').replace(regex.frenchR, '6').replace(regex.paleoAlveolar, '7').replace(regex.alveolar, '8').replace(regex.labioDental, 9);
            for (let i = 1; i < result.length; i++) {
                if (result[i] == result[i+1]){
                    var chars = result.split('');
                    chars.splice(i);
                    result = chars.join('');
                }
            }
            while (result.length < 4) {
                result += '0';
            }
            while (result.length > 4) {
                result = result.slice(0, -1);
            }
            return result;
        }
        return;
    }

    this.initSoundex = function initSoundex() {
        let inputQuery = "SELECT id, francais FROM dictionnaire;";
        let outputQuery = "UPDATE dictionnaire SET soundexfr = ? WHERE id = ?;";
        db.each(inputQuery, (err, row)=>{
            if (err) console.log(err);
            else{
                let soundexed = this.soundex(row.francais);
                db.run(outputQuery, [soundexed, row.id], (err) => {
                    if (err) console.log(err);
                });
            }
        });

        let inputQueryPrk = "SELECT id, pierrick FROM dictionnaire;";
        let outputQueryPrk = "UPDATE dictionnaire SET soundexprk = ? WHERE id = ?;";
        db.each(inputQueryPrk, (err, row)=>{
            if (err) console.log(err);
            else{
                let soundexed = this.soundex(row.pierrick);
                db.run(outputQueryPrk, [soundexed, row.id], (err) => {
                    if (err) console.log(err);
                });
            }
        });
    }

    this.soundexId = function sondexId(id){
        let inputQuery = "SELECT id, francais, pierrick FROM dictionnaire WHERE id = ?; "
        let outputQuery = "UPDATE dictionnaire SET soundexfr = ?, soundexprk = ? WHERE id = ?"
        db.get(inputQuery,[id], (err, row)=>{
            if (err) console.log(err);
            else {
                let francaisSoundexed = this.soundex(row.francais);
                let pierrickSoundexed = this.soundex(row.pierrick);
                db.run(outputQuery, [francaisSoundexed, pierrickSoundexed, row.id], (err)=>{
                    if (err) console.log(err);
                });
            }
        });
    }

    this.searchNoSoundex = async function(offset){
        return new Promise(async function(resolve, reject){
            const query = "SELECT * FROM dictionnaire WHERE soundexprk = NULL and soundexfr = NULL LIMIT 5 OFFSET ?;"
            db.all(query, [offset], (err, rows)=> {
                if(err) reject(err);
                else resolve(rows);
            });
        });
    }
}

const soundexes = new functions();
module.exports = soundexes;