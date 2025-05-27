# Team L

**Udvikler:** Patient Assist  
**Primære fokus:** User Story 5.1 & 11  

---

### Teammedlemmer

#### **Felicia**
- Email: [cph-ff62@cphbusiness.dk](mailto:cph-ff62@cphbusiness.dk)  
- GitHub: [https://github.com/FeliciaFavrholdt](https://github.com/FeliciaFavrholdt)  
- Roller: Scrum Master (Sprint 1), Developer (Sprint 2 + 3)

#### **Alberte**
- Email: [cph@av169@cphbusiness.dk](mailto:cph@av169@cphbusiness.dk)
- GitHub: [https://github.com/AlberteVallentin](https://github.com/AlberteVallentin)
- Roller: Frontend Developer (Sprint 1), Scrum Master (Sprint 2 + 3)

#### **Mads**
- Email: _[cph-mr632@cphbusiness.dk](mailto:cph-mr632@cphbusiness.dk)
- GitHub: [https://github.com/ScriptCodes](https://github.com/ScriptCodes)
- Roller: Developer

#### **Marcus**
- Email: [cph-me313@cphbusiness.dk](mailto:cph-me313@cphbusiness.dk) 
- GitHub: [https://github.com/Marcus-Ekeroth](https://github.com/Marcus-Ekeroth)
- Roller: Developer, Tech

---

## Roller
For at sikre en struktureret og effektiv arbejdsproces er der defineret specifikke roller med klare ansvarsområder. Hver rolle spiller en vigtig funktion i samarbejdet og bidrager til projektets succes.
Scrum Master (SCM):
Scrum Master er en central rolle i hver gruppe og fungerer som facilitator for teamets agile arbejdsproces. Personen sikrer, at Scrum-metoder og principper overholdes, fjerner forhindringer og understøtter teamets udvikling. Derudover er Scrum Master kontaktperson ved afleveringer og varetager formel kommunikation via e-mail.


**Product Owner (PO):**
Product Owner har ansvaret for produktets vision, backlog-prioritering og for at sikre, at teamet arbejder på de rigtige opgaver, der skaber mest værdi.


**Developer (D/DF):**
Udviklerne spiller en essentiel rolle i udviklingsprocessen og bidrager med deres tekniske ekspertise. De arbejder med både backend- og full-stack-løsninger og er ansvarlige for at skrive, teste og optimere kode, samt sikre høj kvalitet og funktionalitet i de udviklede løsninger.


**Tech Coordinator/Lead (T/TL):**
Tech Coordinator og Tech Lead har ansvar for at definere og vedligeholde tekniske standarder i teamet. Tech Coordinator fastlægger retningslinjer for commit, pull, push og branch-strategier, mens Tech Lead sikrer, at kode merges korrekt og overholder aftalte standarder. Tech Leads fra alle grupper mødes regelmæssigt for at drøfte infrastruktur og sikre en ensartet teknisk implementering på tværs af teams.


---

## Udfordringer i forløbet

- Projektet blev ramt af sygdom, hvilket påvirkede fremdriften.
- Et reduceret team (fra 6 til 4 medlemmer) skabte ekstra arbejdspres.
- Tekniske problemer med GitHub-adgang og loginfunktioner forsinkede integrationen.
- Udfordringer i forhold til mangel på kommunikation blandt teams - herunder mangel på fælles database og deployment. 
- På trods af dette blev der opretholdt godt samarbejde og dokumentation gennem Pair Programming og løbende opfølgning.


_Nedenstående er en kort opsummering af hver teammedlems bidrag per sprint – det fulde overblik med opgaver, deadlines og visuelle noter findes i Team L’s FigJam Board._

## Sprint 1 – Opstart og grundstruktur

Sprint 1 bestod af to uger, hvor vi i den første uge etablerede fundamentet for projektet både på team- og gruppe niveau. Det første vi gjorde var at holde et supervised sprint planning i plenum, faciliteret af Kim (underviser). Her fik hver team tildelt en user story, som product owner havde gjort klar. Vi, Team L, fik tildelt user story 5.1. Inden sprint planning havde vi på forhånd aftalt hvilke roller vi hver især havde i teamet, så da sprint planning var overstået, tog Felicia (scrum master) til møde med de andre scrum masters i gruppen for at lægge en plan for det første sprint. I teamet brugte vi vores tid på at behovsafstemme vores forvetninger til projektet, lave Boehm Turner model samt lave team-kontrakt og opsætte server på Discord (primære kommunikationskanal). Scrum master, Felicia, fik opsat Taiga og FigJam og brugte resten af sprinten på at være facilitator for teamet og deltage i diverse møder. Alberte (frontend developer) brugte sprintet på at lave mockup og kommunikere frem og tilbage med PO i forhold til UI. Efter dette var blevet godkendt, fik hun udviklet hele UI til frontend-delen med brug af mockdata, så den var til at blive implementeret og testet. Mads og Marcus (developers) stødte ind i nogle roadblocks i forhold til at påbegynde backend, idet at alle teams ikke kunne blive enige omkring opsætningen af en fælles database. Sprint 1 blev afsluttet med et sprint retrospective på teamet og et sprint review for gruppen. 


## Sprint 2 – Funktionalitet, struktur og samarbejde

I sprint 2 skiftede Felicia og Alberte roller, så Felicia blev developer og sekundær scrum master, mens Alberte blev scrum master. Vi afholdte sprint planning på scrum master niveau. Gruppen har valgt at hver scrum master er repræsentat for dets team. Til sprint planning fik vi tildelt endnu en user story, nr. 11. Sprintet blev brugt på at videreudvikle funktionalitet og forbedre projektets struktur. Backend blev udvidet med implementering og test af CRUD-operationer, fejlhåndtering, samt DAO/DTO-lag. Der blev fokuseret på testdækning gennem BDD og TDD-principper, og integration med eksisterende kodebaser blev etableret.

Frontend blev løbende koordineret og dokumenteret via opdateringer i FigJam og Taiga, hvor Alberte havde ansvar for opgavestruktur og overførsel mellem sprints. Teamet samarbejdede tværfagligt med andre teams og gennemførte regelmæssige møder også med Product Owner.

Samtidig blev der i backend arbejdet med udformning af EER-diagrammer, opstart af databasearkitektur (PostgreSQL), samt påbegyndelse af login- og sikkerhedsfunktioner. Der blev foretaget pair programming og vidensdeling mellem udviklerne, og de første branches blev etableret. Teamet håndterede også tekniske opstartsudfordringer som adgangsproblemer til GitHub. Sprintet blev endnu en gang afsluttet med et retrospective.



## Sprint 3 – Levering, justering og afrunding
I sprint 3 var fokus rettet mod færdiggørelse og kvalitetssikring af løsningen. Backend og frontend blev integreret, og eksisterende funktioner blev gennemgået og tilpasset baseret på feedback. Der blev arbejdet med datapersistering, layoutforbedringer og sikkerhed (authentication), samt udarbejdelse af brugerdokumentation og README-filer.

Derudover blev US 15 forsøgt initieret, men af ressourcemæssige og tekniske årsager blev arbejdet herpå sat på pause. I stedet blev indsatsen fokuseret på at optimere og levere på US 5.1 og 11. Teamet udviste stor fleksibilitet trods reduceret bemanding og sygdom, og afsluttede sprinten med en klar plan for præsentation og videregivelse.

---

## Team L Links

**Figjam:**  
https://www.figma.com/board/XzK4bgXZU3vXF2COoGB6ZU/TEAM-L---FIGJAM-BOARD?node-id=0-1&t=P2X5l4uWS8YxfseD-1  

**Taiga:**  
https://tree.taiga.io/project/feliciafavrholdt-lokaloverblik_scrum/backlog  

**Team L Contract:**  
https://docs.google.com/document/d/1yCr0o1HL6ti33yc3V40zks__FczOdwgO-HlnK8J2yoc/edit?usp=sharing  

**Github Repos:**  
_Backend:_ [Team-L-Dev](https://github.com/SYSDAT-PATIENT-ASSIST/BackEnd/tree/Team-L-Dev)  
_Frontend:_ [Team-L-Dev-Frontend](https://github.com/SYSDAT-PATIENT-ASSIST/FrontEnd/tree/Team-L-Dev_Frontend)  


---

# Patient Assist group links

**Github Repo**  
_Backend:_ https://github.com/SYSDAT-PATIENT-ASSIST/BackEnd  
_Frontend:_ https://github.com/SYSDAT-PATIENT-ASSIST/FrontEnd/tree/Dev  

**Taiga**  
https://tree.taiga.io/project/cphkev-patientassist/timeline  

**Group Contract (v3)**  
https://docs.google.com/document/d/1MA_NnDUbONnq6UdoAW9kG4NC4OVP3xqPJ35JjqX_3aI/edit?tab=t.g7zkn5nkf0rg  

**Coding Standards**  
https://docs.google.com/document/d/1rrNmIAPk9XwUih-2_Fa2bioXGrGzXFPR/edit?usp=sharing&ouid=108784431114141562409&rtpof=true&sd=true  

**Discord**  
https://discord.gg/tEUDTE77


---

# Sprintlog 1
<img width="1872" alt="TEAM L - FIGJAM BOARD" src="https://github.com/user-attachments/assets/4e1e1ad7-cf91-44b5-8801-14501bb0808f" />

# Sprintlog 2
<img width="1872" alt="TEAM L - FIGJAM BOARD (1)" src="https://github.com/user-attachments/assets/cf2798d8-da54-4f5c-86b6-903b9a9d01d2" />

# Sprintlog 3
<img width="1872" alt="TEAM L - FIGJAM BOARD (2)" src="https://github.com/user-attachments/assets/87a6d77e-29a0-406c-bad1-13c8087a5c66" />

