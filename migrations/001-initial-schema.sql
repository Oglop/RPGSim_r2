-- Up
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

CREATE TABLE army
(
    id          text,
    dwellingId  text
);

CREATE TABLE troop
(
    id          text,
    armyId      text,
    name        text,
    type        integer,
    [power]       integer

);

CREATE TABLE court
(
    id          text,
    dwellingId  integer,
    rulerId     text
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
