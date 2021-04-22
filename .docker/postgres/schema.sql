CREATE TABLE IF NOT EXISTS schedule_flight  (
    id INT  NOT NULL PRIMARY KEY,
    end_point_url VARCHAR (100),
    distance INTEGER,
    min_value FLOAT,
    aircraft_model VARCHAR (50)
)
