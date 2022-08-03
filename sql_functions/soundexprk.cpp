#include <iostream>
#include <vector>
#include <string>
#include <sqlite3.h>

using namespace std; 

vector<unsigned char> soundexprk(vector<unsigned char> text){
    for(int i = 0; i < text.size(); i++) {
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

int main(int argc, char const *argv[])
{
    //string func = &soundexprk;
    sqlite3* DB;
    sqlite3_open("../data/database.db", &DB);
    sqlite3_create_function(DB, "soundexprk", 1, SQLITE_ANY, 0, &soundexout, 0, 0);

    return 0;
}