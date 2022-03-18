-- Up
create table room 
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

create table world
(
    id          text,
    name        text,
    date        text
);

-- Down
DROP TABLE room;
DROP TABLE world;