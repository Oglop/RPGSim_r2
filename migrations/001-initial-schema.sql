-- Up
create table room 
(
    id          integer primary key, 
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
    id          integer primary key,
    name        text,
    date        text,
)

-- Down
DROP TABLE room;
DROP TABLE world;