var db = require('./database.js');

// Run create db queries

// Users table
db.query('create table users(' +
  'user_id serial unique primary key,' +
  'name VARCHAR(60) not null,' +
  'created timestamp with time zone default now())'
)

// Groups table
db.query('create table groups(' +
  'group_id serial unique primary key,' +  
  'user_id integer references users on delete cascade,' + 
  'title varchar(110) not null,' + 
  'description text,' +
  'deadline timestamp with time zone default now() + interval \'24 hours\',' +
  'created timestamp with time zone default now())'
)

// User Groups table
db.query('create table user_groups(' +
  'user_id integer references users on delete cascade,' + 
  'group_id integer references groups on delete cascade,' +
  'primary key (user_id, group_id))'
);

// Rallies table
db.query('create table rallies(' +
  'rally_id serial unique primary key,' + 
  'group_id integer references groups on delete cascade,' +
  'body varchar(110) not null,' +
  'created timestamp with time zone default now())'
);

// Votes table
db.query('create table votes(' +
  'vote_id serial unique primary key,' + 
  'user_id integer references users on delete cascade,' + 
  'rally_id integer references rallies on delete cascade,' +
  'vote boolean not null,' +
  'created timestamp with time zone default now())'
);

// Comments table
db.query('create table comments(' +
  'comment_id serial unique primary key,' + 
  'user_id integer references users on delete cascade,' + 
  'rally_id integer references rallies on delete cascade,' +
  'body text not null,' +
  'created timestamp with time zone default now())'
);

// close db pool
db.end();