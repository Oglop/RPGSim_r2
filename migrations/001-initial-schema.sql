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
    trait           text,
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
    id          text, 
    x           integer, 
    y           integer,
    name        text,
    type        integer,
    size        integer,
    citizens    integer,
    gold        integer,
    food        integer,
    taxRate     integer,
    happiness   integer,
    gate        integer,
    walls       integer,
    moats       integer,
    guards      integer
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
    id          integer primary key, 
    worldId     text,
    x           integer, 
    y           integer,
    magicWind   integer,
    elevation   integer,
    temprature  integer,
    biome       integer,
    dwelling    text,
    description text,
    exploreStatus integer
);

CREATE TABLE skill
(
    characterId     text,
    name            text,
    statsBase       text,
    luckTest       integer,
    mastery         integer
);

CREATE TABLE troop
(
    id          text,
    armyId      text,
    name        text,
    type        integer,
    [power]       integer

);

CREATE TABLE world
(
    id          text,
    name        text,
    date        text
);

-- Down
DROP TABLE room;
DROP TABLE dwelling;
DROP TABLE army;
DROP TABLE troop;
DROP TABLE court;
DROP TABLE world;
DROP TABLE language;
DROP TABLE skill;