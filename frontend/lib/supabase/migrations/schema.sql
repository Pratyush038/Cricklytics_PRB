CREATE OR REPLACE FUNCTION execute_sql(query text) 
RETURNS jsonb 
LANGUAGE plpgsql
AS $$
DECLARE
  result jsonb;
  clean_query text := rtrim(query, ';');
BEGIN
  EXECUTE 'SELECT jsonb_agg(t) FROM (' || clean_query || ') t' INTO result;
  RETURN result;
END;
$$;

create table if not exists agent_config (
  user_id        uuid primary key references auth.users(id) on delete cascade,
  model          text        not null default 'gpt-4o-mini',
  system_prompt  text        default '',
  enabled_tools  text[]      not null default '{}',
  updated_at     timestamptz not null default now()
);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

create table public.conversations (
  id uuid not null default extensions.uuid_generate_v4 (),
  user_id uuid null,
  title text not null,
  created_at timestamp with time zone null default CURRENT_TIMESTAMP,
  updated_at timestamp with time zone null default CURRENT_TIMESTAMP,
  constraint conversations_pkey primary key (id),
  constraint conversations_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;

create trigger update_conversations_updated_at BEFORE
update on conversations for EACH row
execute FUNCTION update_updated_at ();

create table public.messages (
  id uuid not null default extensions.uuid_generate_v4 (),
  conversation_id uuid null,
  role text not null,
  content text not null,
  tool_invocations jsonb null,
  created_at timestamp with time zone null default CURRENT_TIMESTAMP,
  constraint messages_pkey primary key (id),
  constraint messages_conversation_id_fkey foreign KEY (conversation_id) references conversations (id) on delete CASCADE
) TABLESPACE pg_default;

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