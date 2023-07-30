-- Up
CREATE TABLE advisor
(
    id              text,
    characterId     text,
    courtId         text
);

CREATE TABLE army
(
    id          text,
    name        text,
    dwellingId  text
);

CREATE TABLE character
(
    id              text,
    name            text,
    title           text,
    family          text,
    coatOfArms      text,
    description     text,
    gender          integer,
    marriedTo       text,
    mother          text,
    father          text,
    pregnant        integer,
    pregnantTime    integer,
    job             integer,
    race            integer,
    birthDate       text,
    trait           integer,
    age             integer,
    health          integer,
    maxHealth       integer,
    stamina         integer,
    maxStamina      integer,
    religion        integer,
    personality     integer,
    isAlive         integer,
    diedFrom        text,
    head            text,
    weaponHand      text,
    shieldHand      text,
    body            text,
    str             integer,
    vit             integer,
    agi             integer,
    wis             integer,
    int             integer,
    cha             integer,
    luc             integer
);

CREATE TABLE court
(
    id          text,
    dwellingId  integer,
    rulerId     text
);



CREATE TABLE dwelling 
(
    id              text, 
    x               integer, 
    y               integer,
    name            text,
    description     text,
    type            integer,
    size            integer,
    citizens        integer,
    citizenTaxable  number,
    gold            integer,
    food            integer,
    growth          number,
    taxRate         integer,
    happiness       number,
    happinessModifyer number,
    gate            integer,
    walls           integer,
    moats           integer,
    guards          integer
);

CREATE TABLE dwellingRumor
(
    dwellingId  text,
    rumorId     text
);

CREATE TABLE dwellingLocation
(
    id              text, 
    dwellingId      text,
    name            text,
    type            int,
    status          int
);

CREATE TABLE npc
(
    id                  text,
    dwellingLocationId  text,
    name                text,
    description         text,
    type                int
);

CREATE TABLE storyLog
(
    id              text,
    type            text,
    entry           text,
    worldDate       text,
    createdDate     text
);

CREATE TABLE production
(
    id	        text,
    dwellingId  text,
    type        integer,
    production  integer
);

CREATE TABLE language 
(
    characterId     text,
    language        integer,
    mastery         integer
);

CREATE TABLE relation 
(
    characterId     text,
    id              text,
    points          integer
);

CREATE TABLE room 
(
    id              text, 
    worldId         text,
    x               integer, 
    y               integer,
    magicWind       integer,
    elevation       integer,
    temprature      integer,
    biome           integer,
    dwellingId      text,
    description     text,
    exploreStatus   integer
);

CREATE TABLE skill
(
    id              text, 
    characterId     text,
    name            text,
    statsBase       text,
    luckTest        integer,
    mastery         integer
);

CREATE TABLE story
(
    id              text,
    aboutId         text,
    type            integer,
    subType         integer,
    date            text,
    message     text,
    tag             text,
    created         DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trade
(
    id              text,
    dwellingId      text,
    partnerId       text,
    value           integer
);

CREATE TABLE party
(
    id              text,
    name            text,
    karma           integer,
    path            text,
    state           integer,
    x               integer,
    y               integer,
    questId         text,
    questStatus     integer,
    questGoalX      integer,
    questGoalY      integer,
    crowns          integer,
    food            integer,
    members         text
);

CREATE TABLE partyRumor
(
    partyId     text,
    rumorId     text
);

CREATE TABLE partyMember
(
    id              text,
    partyId         text,
    characterId     text
);

CREATE TABLE rumor
(
    id              text,
    questId         text,
    description     text,
    type            integer,
    positionX       integer,
    positionY       integer,
    targetX         integer,
    targetY         integer
);

CREATE TABLE troop
(
    id          text,
    armyId      text,
    name        text,
    type        integer,
    power       number,
    number      integer
);

CREATE TABLE world
(
    id          text,
    name        text,
    date        text
);

CREATE TABLE quest
(
    id                  text,
    type                integer,
    status              integer,
    x                   integer,
    y                   integer,
    originLocationId    text, 
    originNpcId         text,
    originDwellingLocationId    text
);

CREATE TABLE item
(
    id          text,
    type        integer,
    name        text,
    use         text,
    effect      text,
    min         integer,
    max         integer,
    value       integer,
    skillRequired   text
);

CREATE TABLE god
(
    id          text,
    name        text,
    profile     text,
    symbol      text,
    description text
);

-- Down
DROP TABLE army;
DROP TABLE advisor;
DROP TABLE character;
DROP TABLE court;
DROP TABLE dwelling;
DROP TABLE dwellingLocation;
DROP TABLE production;
DROP TABLE relation;
DROP TABLE troop;
DROP TABLE room;
DROP TABLE language;
DROP TABLE skill;
DROP TABLE storyLog;
DROP TABLE npc;
DROP TABLE trade;
DROP TABLE story;
DROP TABLE quest;
DROP TABLE world;
DROP TABLE party;
DROP TABLE partyMember;
DROP TABLE rumor;
DROP TABLE dwellingRumor;
DROP TABLE partyRumor;
DROP TABLE item;
DROP TABLE god;