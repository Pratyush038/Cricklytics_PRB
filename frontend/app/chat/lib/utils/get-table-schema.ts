
const TABLE_SCHEMA = `
create table public.injury_prediction (
  id bigint not null,
  player_id bigint null,
  player_name text null,
  pacer smallint null,
  format text null,
  overs double precision null,
  start_date text null,
  injury smallint null,
  injury_prone bigint null,
  workload_score double precision null,
  constraint injury_prediction_pkey primary key (id)
) TABLESPACE pg_default;

create table public.batting_analysis (
  id bigint not null,
  player text null,
  span text null,
  mat bigint null,
  runs bigint null,
  avg double precision null,
  sr double precision null,
  fours bigint null,
  sixes bigint null,
  start_year bigint null,
  end_year bigint null,
  career_length bigint null,
  "Predicted_Category" text null,
  constraint batting_analysis_pkey primary key (id)
) TABLESPACE pg_default;

create table public.bowling_analysis (
  id bigint not null,
  player text null,
  span text null,
  mat bigint null,
  wickets bigint null,
  econ double precision null,
  sr double precision null,
  start_year bigint null,
  end_year bigint null,
  career_length bigint null,
  "Predicted_Category" text null,
  constraint bowling_analysis_pkey primary key (id)
) TABLESPACE pg_default;
`;

export async function getTableSchema(): Promise<string> {
  return TABLE_SCHEMA;
}
