SET check_function_bodies = false;
CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE FUNCTION public.update_engagement_score_for_note() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  likes int;
  views int;
  bookmarks int;
  score numeric;
BEGIN
  likes:= (SELECT COUNT(*) FROM note_likes WHERE note_id = NEW.note_id);
  bookmarks:= (SELECT COUNT(*) FROM note_bookmarks WHERE note_id = NEW.note_id);
  views:= (SELECT COUNT(*) FROM note_views WHERE note_id = NEW.note_id);
  score := ((likes+bookmarks)*100)/views;
  UPDATE notes SET engagement_score = score  WHERE id = NEW.note_id;
  RETURN NEW;
END;
$$;
CREATE TABLE public.note_bookmarks (
    username text NOT NULL,
    note_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.note_likes (
    username text NOT NULL,
    note_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.note_reports (
    username text NOT NULL,
    note_id uuid NOT NULL,
    type text NOT NULL,
    description text NOT NULL,
    accepted boolean DEFAULT false NOT NULL,
    rejected boolean DEFAULT false NOT NULL,
    last_updated_by text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.note_views (
    username text NOT NULL,
    note_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.notes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    content text NOT NULL,
    topic_id uuid NOT NULL,
    created_by text NOT NULL,
    published boolean DEFAULT false NOT NULL,
    engagement_score integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    deleted_at timestamp with time zone
);
CREATE TABLE public.notifications (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    subject text NOT NULL,
    body text NOT NULL,
    "to" text NOT NULL,
    seen boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.schools (
    name text NOT NULL,
    picture text,
    location point,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);
CREATE TABLE public.textbooks (
    name text NOT NULL,
    subject text NOT NULL,
    grade integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.topics (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    textbook_name text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.user_subjects (
    username text NOT NULL,
    subject text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.users (
    id text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    bio text,
    school text,
    grade integer,
    fullname text,
    profile_picture text,
    role text DEFAULT 'STUDENT'::text NOT NULL,
    blocked boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);
ALTER TABLE ONLY public.note_bookmarks
    ADD CONSTRAINT note_bookmarks_pkey PRIMARY KEY (username, note_id);
ALTER TABLE ONLY public.note_likes
    ADD CONSTRAINT note_likes_pkey PRIMARY KEY (username, note_id);
ALTER TABLE ONLY public.note_reports
    ADD CONSTRAINT note_reports_pkey PRIMARY KEY (username, note_id);
ALTER TABLE ONLY public.note_views
    ADD CONSTRAINT note_views_pkey PRIMARY KEY (username, note_id);
ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.schools
    ADD CONSTRAINT schools_pkey PRIMARY KEY (name);
ALTER TABLE ONLY public.textbooks
    ADD CONSTRAINT textbooks_pkey PRIMARY KEY (name);
ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_subjects
    ADD CONSTRAINT user_subjects_pkey PRIMARY KEY (username, subject);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
CREATE TRIGGER set_public_note_bookmarks_updated_at BEFORE UPDATE ON public.note_bookmarks FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_note_bookmarks_updated_at ON public.note_bookmarks IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_note_likes_updated_at BEFORE UPDATE ON public.note_likes FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_note_likes_updated_at ON public.note_likes IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_note_reports_updated_at BEFORE UPDATE ON public.note_reports FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_note_reports_updated_at ON public.note_reports IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_note_views_updated_at BEFORE UPDATE ON public.note_views FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_note_views_updated_at ON public.note_views IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_notes_updated_at BEFORE UPDATE ON public.notes FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_notes_updated_at ON public.notes IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_notifications_updated_at BEFORE UPDATE ON public.notifications FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_notifications_updated_at ON public.notifications IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_schools_updated_at BEFORE UPDATE ON public.schools FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_schools_updated_at ON public.schools IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_textbooks_updated_at BEFORE UPDATE ON public.textbooks FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_textbooks_updated_at ON public.textbooks IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_topics_updated_at BEFORE UPDATE ON public.topics FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_topics_updated_at ON public.topics IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_user_subjects_updated_at BEFORE UPDATE ON public.user_subjects FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_user_subjects_updated_at ON public.user_subjects IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_users_updated_at ON public.users IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER trigger_update_engagment_score_on_bookmark AFTER INSERT ON public.note_bookmarks FOR EACH ROW EXECUTE FUNCTION public.update_engagement_score_for_note();
CREATE TRIGGER trigger_update_engagment_score_on_like AFTER INSERT ON public.note_likes FOR EACH ROW EXECUTE FUNCTION public.update_engagement_score_for_note();
CREATE TRIGGER trigger_update_engagment_score_on_view AFTER INSERT ON public.note_views FOR EACH ROW EXECUTE FUNCTION public.update_engagement_score_for_note();
ALTER TABLE ONLY public.note_bookmarks
    ADD CONSTRAINT note_bookmarks_note_id_fkey FOREIGN KEY (note_id) REFERENCES public.notes(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.note_bookmarks
    ADD CONSTRAINT note_bookmarks_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.note_likes
    ADD CONSTRAINT note_likes_note_id_fkey FOREIGN KEY (note_id) REFERENCES public.notes(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.note_likes
    ADD CONSTRAINT note_likes_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.note_reports
    ADD CONSTRAINT note_reports_last_updated_by_fkey FOREIGN KEY (last_updated_by) REFERENCES public.users(username) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.note_reports
    ADD CONSTRAINT note_reports_note_id_fkey FOREIGN KEY (note_id) REFERENCES public.notes(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.note_reports
    ADD CONSTRAINT note_reports_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.note_views
    ADD CONSTRAINT note_views_note_id_fkey FOREIGN KEY (note_id) REFERENCES public.notes(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.note_views
    ADD CONSTRAINT note_views_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(username) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_to_fkey FOREIGN KEY ("to") REFERENCES public.users(username) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_textbook_name_fkey FOREIGN KEY (textbook_name) REFERENCES public.textbooks(name) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.user_subjects
    ADD CONSTRAINT user_subjects_username_fkey FOREIGN KEY (username) REFERENCES public.users(username) ON UPDATE CASCADE ON DELETE CASCADE;
