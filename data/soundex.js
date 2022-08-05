const db = require('./sqlite_connection')


var functions = function(){

    this.soundex = function soundex(input){
        if (input != 'NULL' && isNaN(input)){
            let mot = ""
            mot = mot + input
            mot = mot.toUpperCase();
            mot = mot.trim();
            result = ""
            switch (mot[0]) {
                case 'Â':
                case 'Ä':
                case 'À':
                case 'Â':
                case 'Ā':
                    result += 'A';
                    break;
                case 'É':
                case 'È':
                case 'Ë':
                case 'Ê':
                    result += 'E';
                    break;
                case 'Ï':
                case 'Î':
                    result += 'I';
                    break;
                case 'Û':
                case 'Ü':
                case 'Ū':
                case 'Ù':
                case 'Y':
                    result += 'U';
                    break;
                case 'Ō':
                case 'Ó':
                case 'Ô':
                case 'Ò':
                    result += 'O';
                    break;
                default:
                    result += mot[0];
                    break;
            }
            for (let i = 0; i < mot.length; i++) {
                char = mot[i];
                switch (char) {
                    case 'A':
                    case 'E':
                    case 'O':
                    case 'I':
                    case 'O':
                    case 'U':
                    case 'Y':
                    case 'H':
                    case 'W':
                    case 'É':
                    case 'Ë':
                    case 'Ā':
                    case 'Ō':
                    case 'Ò':
                    case 'Ū':
                    case 'Ü':
                    case ' ':
                    case '-':
                    case '–':
                    case '/':
                    case "’":
                    case 'È':
                    case "À":
                    case 'Â':
                    case 'Ê':
                    case 'Î':
                    case 'Ô':
                    case '→':
                    case '[':
                    case ']':
                        result += ''; 
                        break;
                    case 'B':
                    case 'P':
                        result += '1';
                        break;
                    case 'C':
                    case 'K':
                    case 'Q':
                        result += '2';
                        break;
                    case 'D':
                    case 'T':
                    case 'Þ':
                    case 'Ð':
                        result += '3';
                        break;
                    case 'L':
                    case 'Ř':
                        result += '4';
                        break;
                    case 'M':
                    case 'N':
                        result += '5';
                        break;
                    case 'R':
                        result += '6';
                        break;
                    case 'G':
                    case 'J':
                    case 'Š':
                    case 'Ž':
                        result += '7';
                        break;
                    case 'X':
                    case 'S':
                    case 'Z':
                        result += '8';
                        break;
                    case 'F':
                    case 'V':
                        result += '9';
                        break;
                    default:
                        console.log(`no match for ${char}`);
                        break;
                }
            }
            for (let i = 1; i < result.length; i++) {
                if (result[i] == result[i+1]) {
                    result[i+1] = '';
                }
                
            }
            while (result.length < 4) {
                result = result + '0';
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
                let soundexed = soundex(row.francais);
                db.run(outputQuery, [soundexed, row.id], (err) => {
                    if (err) console.log(err);
                })
            }
        });

        let inputQueryPrk = "SELECT id, pierrick FROM dictionnaire;";
        let outputQueryPrk = "UPDATE dictionnaire SET soundexprk = ? WHERE id = ?;";
        db.each(inputQueryPrk, (err, row)=>{
            if (err) console.log(err);
            else{
                let soundexed = soundex(row.pierrick);
                db.run(outputQueryPrk, [soundexed, row.id], (err) => {
                    if (err) console.log(err);
                })
            }
        });
    }
}

const soundexes = new functions();
module.exports = soundexes;