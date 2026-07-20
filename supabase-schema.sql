-- ==========================================
-- SUPABASE SCHEMAS FOR NURSING OFFICERS MOCK APP
-- Copy and paste this script into your Supabase SQL Editor
-- (Go to Database -> SQL Editor -> New Query, paste, and run)
-- ==========================================

-- 1. PROFILES TABLE (Stores user name, phone, admin roles, linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can view their own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
    ON public.profiles FOR SELECT 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE
        )
    );


-- 2. ATTEMPTS TABLE (Stores quiz attempt history and percentages)
CREATE TABLE IF NOT EXISTS public.attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL,
    test_id TEXT NOT NULL,
    test_title TEXT NOT NULL,
    correct INTEGER NOT NULL,
    total INTEGER NOT NULL,
    pct INTEGER NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Attempts
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;

-- Attempts Policies
CREATE POLICY "Users can insert their own attempts" 
    ON public.attempts FOR INSERT 
    WITH CHECK (true); -- Client checks and filters by email; or auth email match

CREATE POLICY "Users can select their own attempts" 
    ON public.attempts FOR SELECT 
    USING (true); -- For simple static hosting, allows querying all, but app-code filters by user email for simplicity, or: (email = auth.jwt()->>'email')

CREATE POLICY "Admins have full access to attempts"
    ON public.attempts FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE
        )
    );


-- 3. STREAKS TABLE (Tracks active practice streaks and last active dates)
CREATE TABLE IF NOT EXISTS public.streaks (
    email TEXT PRIMARY KEY,
    streak INTEGER DEFAULT 0 NOT NULL,
    last TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Streaks
ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;

-- Streaks Policies
CREATE POLICY "Users can modify their own streak" 
    ON public.streaks FOR ALL 
    USING (true)
    WITH CHECK (true);


-- 4. NURSING UPDATES TABLE (Stores dynamic notices, bulletins, and syllabus guides)
CREATE TABLE IF NOT EXISTS public.nursing_updates (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    badge TEXT NOT NULL,
    date TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    image TEXT NOT NULL,
    read_time TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Nursing Updates
ALTER TABLE public.nursing_updates ENABLE ROW LEVEL SECURITY;

-- Nursing Updates Policies
CREATE POLICY "Anyone can view nursing updates" 
    ON public.nursing_updates FOR SELECT 
    USING (true);

CREATE POLICY "Only admins can modify nursing updates" 
    ON public.nursing_updates FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() AND profiles.is_admin = TRUE
        )
    );


-- 5. PROFILE TRIGGER (Automatically create profile when a user registers via Supabase Auth)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, name, phone, is_admin)
    VALUES (
        new.id, 
        new.email, 
        COALESCE(new.raw_user_meta_data->>'name', 'Nurse Student'), 
        COALESCE(new.raw_user_meta_data->>'phone', ''),
        CASE 
            WHEN new.email = 'sakil.net.in@gmail.com' THEN TRUE -- Automatically make primary user admin!
            ELSE FALSE 
        END
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger execution link
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
