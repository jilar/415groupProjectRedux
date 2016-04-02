var Directory = {
  Files: [],
}

//Directory of current files and processes
var Directory0 = {
   filename:["bankBook.csv","ContactManager.csv","securityFile.csv","route.csv","vectorData.csv","statsFile.csv"],
   content:["",                                                                                          //bank, file is created on startup
          "James,Butt,6649 N Blue Gum St,New Orleans,LA,70116,504-621-8927,jbutt@gmail.com\n"                          //contacts
          + "Josephine,Darakjy,4 B Blue Ridge Blvd,Brighton,MI,48116,810-292-9388,josephine_darakjy@darakjy.org\n"
          + "Art,Venere,8 W Cerritos Ave #54,Bridgeport,NJ,8014,856-636-8749,art@venere.org\n"
          + "Lenna,Paprocki,639 Main St,Anchorage,AK,99501,907-385-4412,lpaprocki@hotmail.com\n"
          + "Donette,Foller,34 Center St,Hamilton,OH,45011,513-570-1893,donette.foller@cox.net\n"
          + "Simona,Morasca,3 Mcauley Dr,Ashland,OH,44805,419-503-2484,simona@morasca.com\n"
          + "Mitsue,Tollner,7 Eads St,Chicago,IL,60632,773-573-6914,mitsue_tollner@yahoo.com\n"
          + "Leota,Dilliard,7 W Jackson Blvd,San Jose,CA,95111,408-752-3500,leota@hotmail.com\n"
          + "Sage,Wieser,5 Boston Ave #88,Sioux Falls,SD,57105,605-414-2147,sage_wieser@cox.net\n"
          + "Kris,Marrier,228 Runamuck Pl #2808,Baltimore,MD,21224,410-655-8723,kris@gmail.com\n"
          + "Minna,Amigon,2371 Jerrold Ave,Kulpsville,PA,19443,215-874-1229,minna_amigon@yahoo.com\n"
          + "Abel,Maclead,37275 St  Rt 17m M,Middle Island,NY,11953,631-335-3414,amaclead@gmail.com\n"
          + "Kiley,Caldarera,25 E 75th St #69,Los Angeles,CA,90034,310-498-5651,kiley.caldarera@aol.com\n"
          + "Graciela,Ruta,98 Connecticut Ave Nw,Chagrin Falls,OH,44023,440-780-8425,gruta@cox.net\n"
          + "Cammy,Albares,56 E Morehead St,Laredo,TX,78045,956-537-6195,calbares@gmail.com\n"
          + "Mattie,Poquette,73 State Road 434 E,Phoenix,AZ,85013,602-277-4385,mattie@aol.com\n"
          + "Meaghan,Garufi,69734 E Carrillo St,Mc Minnville,TN,37110,931-313-9635,meaghan@hotmail.com\n"
          + "Gladys,Rim,322 New Horizon Blvd,Milwaukee,WI,53207,414-661-9598,gladys.rim@rim.org\n"
          + "Yuki,Whobrey,1 State Route 27,Taylor,MI,48180,313-288-7937,yuki_whobrey@aol.com\n"
          + "Fletcher,Flosi,394 Manchester Blvd,Rockford,IL,61109,815-828-2147,fletcher.flosi@yahoo.com\n"
          + "Bette,Nicka,6 S 33rd St,Aston,PA,19014,610-545-3615,bette_nicka@cox.net\n"
          + "Veronika,Inouye,6 Greenleaf Ave,San Jose,CA,95111,408-540-1785,vinouye@aol.com\n"
          + "Willard,Kolmetz,618 W Yakima Ave,Irving,TX,75062,972-303-9197,willard@hotmail.com\n"
          + "Maryann,Royster,74 S Westgate St,Albany,NY,12204,518-966-7987,mroyster@royster.com\n"
          + "Alisha,Slusarski,3273 State St,Middlesex,NJ,8846,732-658-3154,alisha@slusarski.com\n"
          + "Allene,Iturbide,1 Central Ave,Stevens Point,WI,54481,715-662-6764,allene_iturbide@cox.net\n"
          + "Chanel,Caudy,86 Nw 66th St #8673,Shawnee,KS,66218,913-388-2079,chanel.caudy@caudy.org\n"
          + "Ezekiel,Chui,2 Cedar Ave #84,Easton,MD,21601,410-669-1642,ezekiel@chui.com\n"
          + "Willow,Kusko,90991 Thorburn Ave,New York,NY,10011,212-582-4976,wkusko@yahoo.com\n"
          + "Bernardo,Figeroa,386 9th Ave N,Conroe,TX,77301,936-336-3951,bfigeroa@aol.com\n"
          + "Ammie,Corrio,74874 Atlantic Ave,Columbus,OH,43215,614-801-9788,ammie@corrio.com\n"
          + "Francine,Vocelka,366 South Dr,Las Cruces,NM,88011,505-977-3911,francine_vocelka@vocelka.com\n"
          + "Ernie,Stenseth,45 E Liberty St,Ridgefield Park,NJ,7660,201-709-6245,ernie_stenseth@aol.com\n"
          + "Albina,Glick,4 Ralph Ct,Dunellen,NJ,8812,732-924-7882,albina@glick.com\n"
          + "Alishia,Sergi,2742 Distribution Way,New York,NY,10025,212-860-1579,asergi@gmail.com\n"
          + "Solange,Shinko,426 Wolf St,Metairie,LA,70002,504-979-9175,solange@shinko.com\n"
          + "Jose,Stockham,128 Bransten Rd,New York,NY,10011,212-675-8570,jose@yahoo.com\n"
          + "Rozella,Ostrosky,17 Morena Blvd,Camarillo,CA,93012,805-832-6163,rozella.ostrosky@ostrosky.com\n"
          + "Valentine,Gillian,775 W 17th St,San Antonio,TX,78204,210-812-9597,valentine_gillian@gmail.com\n"
          + "Kati,Rulapaugh,6980 Dorsett Rd,Abilene,KS,67410,785-463-7829,kati.rulapaugh@hotmail.com\n"
          + "Youlanda,Schemmer,2881 Lewis Rd,Prineville,OR,97754,541-548-8197,youlanda@aol.com\n"
          + "Dyan,Oldroyd,7219 Woodfield Rd,Overland Park,KS,66204,913-413-4604,doldroyd@aol.com\n"
          + "Roxane,Campain,1048 Main St,Fairbanks,AK,99708,907-231-4722,roxane@hotmail.com\n"
          + "Lavera,Perin,678 3rd Ave,Miami,FL,33196,305-606-7291,lperin@perin.org\n"
          + "Erick,Ferencz,20 S Babcock St,Fairbanks,AK,99712,907-741-1044,erick.ferencz@aol.com\n"
          + "Fatima,Saylors,2 Lighthouse Ave,Hopkins,MN,55343,952-768-2416,fsaylors@saylors.org\n"
          + "Jina,Briddick,38938 Park Blvd,Boston,MA,2128,617-399-5124,jina_briddick@briddick.com\n"
          + "Kanisha,Waycott,5 Tomahawk Dr,Los Angeles,CA,90006,323-453-2780,kanisha_waycott@yahoo.com\n"
          + "Emerson,Bowley,762 S Main St,Madison,WI,53711,608-336-7444,emerson.bowley@bowley.org\n"
          + "Blair,Malet,209 Decker Dr,Philadelphia,PA,19132,215-907-9111,bmalet@yahoo.com",
          "alex,password1\n" +                                                                                     //password    
          "alvin,password2\n" +
          "harry,password3\n" +
          "iain,password4\n" +
          "matt,password4\n" +
          "miles,password4",
         "POR,ORL,3031\n" +                                                                                        //routes
         "SFO,CHI,2132\n" +
         "DEN,POR,1243\n" +
         "NYC,SFO,2915\n" +
         "MIA,DEN,2067\n" +
         "HOU,NYC,1630\n" +
         "LAX,MIA,2733\n" +
         "LAS,HOU,3031\n" +
         "CLE,LAX,2132\n" +
         "SEA,LAS,1243\n" +
         "TOR,CLE,2915\n" +
         "IND,SEA,2067\n" +
         "MIN,TOR,1630\n" +
         "MIL,IND,2733\n" +
         "BOS,MIN,3031\n" +
         "PHI,MIL,2132\n" +
         "OAK,BOS,1243\n" +
         "SAC,PHI,2915\n" +
         "DAL,OAK,2067\n" +
         "OKC,SAC,1630\n" +
         "CHA,DAL,2733\n" +
         "PHX,OKC,3031\n" +
         "MEM,CHA,2132\n" +
         "ORL,PHX,1243\n" +
         "CHI,MEM,2915\n" +
         "POR,PHX,2067\n" +
         "SFO,MEM,1630\n" +
         "DEN,ORL,2733\n" +
         "NYC,CHI,3031\n" +
         "MIA,POR,2132\n" +
         "HOU,SFO,1243\n" +
         "LAX,DEN,2915\n" +
         "LAS,NYC,2067\n" +
         "CLE,MIA,1630\n" +
         "SEA,HOU,2733\n" +
         "TOR,LAX,3031\n" +
         "IND,LAS,2132\n" +
         "MIN,CLE,1243\n" +
         "MIL,SEA,2915\n" +
         "BOS,TOR,2067\n" +
         "PHI,IND,1630\n" +
         "OAK,MIN,2733\n" +
         "SAC,MIL,3031\n" +
         "DAL,BOS,2132\n" +
         "OKC,PHI,1243\n" +
         "CHA,OAK,2915\n" +
         "PHX,SAC,2067\n" +
         "MEM,DAL,1630\n" +
         "ORL,OKC,2733\n" +
         "CHI,CHA,3031\n" +
         "POR,OKC,2132\n" +
         "SFO,CHA,1243\n" +
         "DEN,PHX,2915\n" +
         "NYC,MEM,2067\n" +
         "MIA,ORL,1630\n" +
         "HOU,CHI,2733\n" +
         "LAX,POR,3031\n" +
         "LAS,SFO,2132\n" +
         "CLE,DEN,1243\n" +
         "SEA,NYC,2915\n" +
         "TOR,MIA,2067\n" +
         "IND,HOU,1630\n" +
         "MIN,LAX,2733\n" +
         "MIL,LAS,3031\n" +
         "BOS,CLE,2132\n" +
         "PHI,SEA,1243\n" +
         "OAK,TOR,2915\n" +
         "SAC,IND,2067\n" +
         "DAL,MIN,1630\n" +
         "OKC,MIL,2733\n" +
         "CHA,BOS,3031\n" +
         "PHX,PHI,2132\n" +
         "MEM,OAK,1243\n" +
         "ORL,SAC,2915\n" +
         "CHI,DAL,2067\n" +
         "POR,SAC,1630\n" +
         "SFO,DAL,2733\n" +
         "DEN,OKC,3031\n" +
         "NYC,CHA,2132\n" +
         "MIA,PHX,1243\n" +
         "HOU,MEM,2915\n" +
         "LAX,ORL,2067\n" +
         "LAS,CHI,1630\n" +
         "CLE,POR,2733\n" +
         "SEA,SFO,3031\n" +
         "TOR,DEN,2132\n" +
         "IND,NYC,1243\n" +
         "MIN,MIA,2915\n" +
         "MIL,HOU,2067\n" +
         "BOS,LAX,1630\n" +
         "PHI,LAS,2733\n" +
         "OAK,CLE,3031\n" +
         "SAC,SEA,2132\n" +
         "DAL,TOR,1243\n" +
         "OKC,IND,2915\n" +
         "CHA,MIN,2067\n" +
         "PHX,MIL,1630\n" +
         "MEM,BOS,2733\n" +
         "ORL,PHI,3031\n" +
         "CHI,OAK,2132\n",
         "4,2,\n" +                                                                  //route
         "1,7,\n" +
         "-3,2,\n" +
         "6,9,\n" +
         "0,1,\n" +
         "2,5,\n" +
         "1,-9,\n" +
         "2,-2,\n" +
         "5,5,\n" +
         "-8,-10,\n",
         "1.10\n" + "5.09\n" + "0.97\n" + "1.59\n" + "4.60\n" + "0.32\n" +                   //stats
         "0.55\n" + "1.45\n" + "0.14\n" + "4.47\n" + "1.20\n" + "3.50\n" +
         "5.02\n" + "4.67\n" + "5.22\n" + "2.69\n" + "3.98\n" + "3.17\n" +
         "3.03\n" + "2.21\n" + "0.69\n" + "4.47\n" + "3.31\n" + "1.17\n" +
         "0.76\n" + "1.17\n" + "1.57\n" + "2.62\n" + "1.66\n" + "2.05\n"]
};



var ProcessNames= [
    "bankCalculator", "contactManager", "securityUpdate", "shortestRoute", "addVectors", "calculateStats"
];