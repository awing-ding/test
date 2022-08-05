#include <iostream>
#include <vector>
#include <string>
#include <sqlite3.h>

using namespace std; 

//soundex algorithm
vector<unsigned char> soundexprk(vector<unsigned char> text){
    for(long unsigned 
    int i = 0; i < text.size(); i++) {
        text[i] = toupper(text[i]);
        unsigned char *chara = &text[i];
        if (*chara == 'A' or *chara == 'E' or *chara == 'I' or *chara == 'O' or *chara == 'U' or *chara == 'Y' or *chara == 'H'
            or *chara == 'W' or *chara == ' ' or *chara == '-'){
            text.erase(text.begin() + i);
        }
        else if (*chara == 'B' or *chara == 'P' or *chara == 'F' or *chara == 'V')
        {
            *chara = 1;
        }
        else if (*chara == 'C' or *chara == 'S' or *chara == 'Z' or *chara == 'J' or *chara == 'X')
        {
            *chara = 2;
        }
        else if (*chara == 'D' or *chara == 'T')
        {
            *chara = 3;
        }
        else if (*chara == 'L')
        {
            *chara = 4;
        }
        else if (*chara == 'M' or *chara == 'N')
        {
            *chara = 5;
        }
        else if (*chara == 'R')
        {
            *chara = 6;
        }
        else if (*chara == 'K' or *chara == 'G')
        {
            *chara = 7;
        }    
        if (text.size() > 4) 
        {
            while (text.size() > 4)
            {
                text.pop_back();
            }
        }
        if (text.size() < 4)
        {
            while (text.size() < 4)
            {
                text.push_back('0');
            }
            
        }
        
    }
    return text;

}

//parse the sqlite input and prepare it for the soundex algorithm 
void soundexout(sqlite3_context *context, int argc, sqlite3_value **argv){
    if (argc == 1)
    {
        const unsigned char *characttext = sqlite3_value_text(*argv); 
        vector<unsigned char> text;
        int lenghtOfText = sizeof(*characttext) / sizeof(const unsigned char);
        for (int i = 0; i < lenghtOfText; i++)
        {
            text.push_back(characttext[i]);
        }
        const unsigned char* result = soundexprk(text).data();
        sqlite3_result_text16(context, result, 1, SQLITE_TRANSIENT);
        return;
    }
    sqlite3_result_null(context);
    
}

//short callback to show into the console the sql output
static int callback(void *NotUsed,int argc, char** argv, char ** azColName){
  int i;
  for(i=0;i<argc;i++){
    cout << azColName[i] << '=' << argv[i] << endl;
  }
  return 0;
}

//Open db to create the function, then close it
int main(int argc, char const *argv[])
{
    char *errora = NULL;
    char **error = &errora;
    sqlite3* DB;
    sqlite3_open("../data/database.db", &DB);
    //sqlite3_exec(DB,"SELECT * FROM dictionnaire WHERE id = 6", callback,0, 0);
    sqlite3_create_function16(DB, "soundexprk", 1, SQLITE_UTF16, 0, &soundexout, 0, 0);
    sqlite3_exec(DB, "SELECT soundexprk(francais) FROM dictionnaire WHERE id = 6", callback, 0, error); //test to see if the function is implemented into sqlite
    cout << *error << endl; //gimme the error dude 
    //cout << "function created" ;
    sqlite3_close(DB);
    return 0;
}
